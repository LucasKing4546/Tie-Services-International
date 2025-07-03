from models.hf_model import SQL_Model

model = SQL_Model()
prompt = """Translate the following question into a SQL query:
Available tables:
- workers(id, name, salary, role)
Question: What is the average salary of engineers?
SQL:"""

sql = model.generate_sql(prompt, use_sampling=True)
print(sql)