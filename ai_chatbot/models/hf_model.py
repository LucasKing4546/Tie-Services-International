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
        inputs = self.tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=2048)

        with torch.no_grad():
            outputs = self.model.generate(
                inputs.input_ids.to(self.model.device),
                attention_mask=inputs.attention_mask.to(self.model.device),
                max_new_tokens=256,  # Generate up to 256 new tokens
                temperature=0.7 if use_sampling else 1.0,
                do_sample=use_sampling,
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id,
                repetition_penalty=1.1,
                num_beams=1 if use_sampling else 4
            )

        # Decode the full response
        full_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        # For SQLCoder, we need to extract only the SQL after the prompt
        # The model should generate after "### SQL\n"
        if "### SQL" in full_response:
            sql_part = full_response.split("### SQL")[-1].strip()
        else:
            # Fallback: remove the original prompt
            sql_part = full_response[len(prompt):].strip()

        # Clean up the SQL response
        sql_part = sql_part.strip()
        if sql_part.startswith('\n'):
            sql_part = sql_part[1:]

        return sql_part