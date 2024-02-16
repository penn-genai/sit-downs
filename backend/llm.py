from openai import OpenAI
import os

# Replace the empty string with your model id below
model_id = "6wglroj3"

print(os.environ["BASE_TEN_API_KEY"])

# client = OpenAI(
#    api_key="5B4ADGY0.kheOS4oGtjvewwF5FQIHubKhx2MzlXMt",
#    base_url=f"https://bridge.baseten.co/{model_id}/v1"
# )

# res = client.chat.completions.create(
#  model="mistral-7b",
#  messages=[
#    {"role": "user", "content": "What is a mistral?"},
#    {"role": "assistant", "content": "A mistral is a type of cold, dry wind that blows across the southern slopes of the Alps from the Valais region of Switzerland into the Ligurian Sea near Genoa. It is known for its strong and steady gusts, sometimes reaching up to 60 miles per hour."},
#    {"role": "user", "content": "How does the mistral wind form?"}
#  ],
#  temperature=0.9,
#  max_tokens=512,
# )

# print(res.choices[0].message.content)