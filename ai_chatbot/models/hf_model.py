from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch

class SQL_Model:
    def __init__(self, model_name="mistralai/Mistral-7B-Instruct-v0.2", max_tokens=512, device=None):
        self.model_name = model_name
        self.max_tokens = max_tokens
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")

        print(f"[INFO] Loading model from {model_name} on {self.device}")

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name, torch_dtype=torch.float16 if self.device == "cuda" else torch.float32)
        self.model.to(self.device)

        #  Inference pipeline: makes usage simple

        self.generator = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            device=0 if self.device == "cuda" else -1,
        )

    def generate_sql(self, prompt, use_sampling=False):
        print(f"[DEBUG] Prompt sent to model:\n{prompt}\n")

        generator_args = {
            "max_new_tokens": self.max_tokens,
            "pad_token_id": self.tokenizer.eos_token_id
        }

        if use_sampling:
            generator_args["do_sample"] = True
            generator_args["temperature"] = 0.7
            generator_args["top_p"] = 0.9
        else:
            generator_args["do_sample"] = False  # Greedy decoding
            # Don't include temperature

        response = self.generator(prompt, **generator_args)

        output = response[0]["generated_text"]
        sql_output = output[len(prompt):].strip()
        return sql_output

