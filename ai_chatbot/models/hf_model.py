from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch


class SQL_Model:
    def __init__(self, m_model, cache_dir=None):
        if m_model is None:
            model_name = "defog/sqlcoder-7b-2"
        else:
            model_name = m_model

        # Configure quantization
        quantization_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.float16,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4"
        )

        self.tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir=cache_dir)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=quantization_config,
            device_map="auto",
            torch_dtype=torch.float16,
            low_cpu_mem_usage=True,
            cache_dir=cache_dir
        )

        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token

    def generate_sql(self, prompt, use_sampling=True):
        # Tokenize to check length
        inputs = self.tokenizer(prompt, return_tensors="pt", padding=True, truncation=False)
        input_length = inputs.input_ids.shape[1]

        print(f"DEBUG - Input token length: {input_length}")

        # If prompt is too long, truncate it intelligently
        max_input_length = 1800  # Leave room for generation
        if input_length > max_input_length:
            print(f"WARNING: Prompt too long ({input_length} tokens), truncating...")
            inputs = self.tokenizer(
                prompt,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=max_input_length
            )
            input_length = inputs.input_ids.shape[1]

        with torch.no_grad():
            outputs = self.model.generate(
                inputs.input_ids.to(self.model.device),
                attention_mask=inputs.attention_mask.to(self.model.device),
                max_new_tokens=200,
                do_sample=False,  # As recommended
                num_beams=4,  # As recommended
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id,
                repetition_penalty=1.1,
                temperature = 0.7 if use_sampling else 1.0
            )

        # Decode only the new tokens (skip the input)
        new_tokens = outputs[0][input_length:]
        sql_response = self.tokenizer.decode(new_tokens, skip_special_tokens=True)

        print(f"DEBUG - Raw generated tokens: {repr(sql_response)}")

        # Clean up the response
        sql_response = sql_response.strip()

        # Remove common prefixes/suffixes
        if sql_response.startswith("```sql"):
            sql_response = sql_response[6:].strip()
        if sql_response.endswith("```"):
            sql_response = sql_response[:-3].strip()

        # Remove any leading/trailing whitespace and newlines
        sql_response = sql_response.strip()

        print(f"DEBUG - Final SQL: {repr(sql_response)}")
        return sql_response