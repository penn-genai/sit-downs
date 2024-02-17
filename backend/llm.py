from openai import OpenAI
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer

load_dotenv()

class llm:
    def __init__(self):
        model_id = os.environ["BASE_TEN_MODEL_ID"]
        self.client = OpenAI(
            api_key=os.environ["BASE_TEN_API_KEY"],
            base_url=f"https://bridge.baseten.co/{model_id}/v1"
        )

    def cut(self, webSequence):
        tokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-v0.1")
        tokenized = tokenizer(webSequence, return_tensors="pt")
        if (len(tokenized.input_ids[0]) < 4096):
            return webSequence
        return tokenizer.decode(tokenized.input_ids[0][:4096])

    def summarize_webpage(self, webSequence):
        webSequence = self.cut(webSequence)
        res = self.client.chat.completions.create(
        model="mistral-7b",
        messages=[
            {"role": "system", "content": "Summarize what the following web page created by this DOM does in a short, concise paragraph of LESS THAN 100 WORDS:"},
            {"role": "user", "content": webSequence}
            ],
            temperature=0.6,
            max_tokens=512,
        )
        arr = res.choices[0].message.content.split("[/INST]")
        if (len(arr) < 1):
            raise ValueError("No output")
        return arr[1]
    
    def summarize_day(self, summaries):
        allSummaries = "`".join(summaries)
        res = self.client.chat.completions.create(
        model="mistral-7b",
        messages=[
            {"role": "system", "content": "Summarize the following summaries into an overarching summary of the websites visited. Each summary is separated by a `"},
            {"role": "user", "content": allSummaries}
            ],
            temperature=0.6,
            max_tokens=512,
        )
        arr = res.choices[0].message.content.split("[/INST]")
        if (len(arr) < 1):
            raise ValueError("No output")
        return arr[1]

