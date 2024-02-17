from openai import OpenAI
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer
from prompts import find_others_system_prompt, find_others_user_prompt

load_dotenv()

def cut(self, webSequence):
    tokenized = self.tokenizer(webSequence, return_tensors="pt")
    if (len(tokenized.input_ids[0]) < 4000):
        return webSequence
    return self.tokenizer.decode(tokenized.input_ids[0][:4000])

class llm:
    def __init__(self):
        model_id = os.environ["BASE_TEN_MODEL_ID"]
        self.client = OpenAI(
            api_key=os.environ["BASE_TEN_API_KEY"],
            base_url=f"https://bridge.baseten.co/{model_id}/v1"
        )
        self.tokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-v0.1")

    def summarize_webpage(self, title, url, body):
        webSequence = f"TITLE:{title},URL:{url},BODY:{body}"
        webSequence = cut(webSequence)
        res = self.client.chat.completions.create(
        model="mistral-7b",
        messages=[
            {"role": "system", "content": "Summarize what the following web page created by this title, URL and DOM does in a short, concise paragraph of LESS THAN 100 WORDS:"},
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
        allSummaries = "`".join(summaries)[:4000]
        res = self.client.chat.completions.create(
        model="mistral-7b",
        messages=[
            {"role": "system", "content": "From the following summaries of web pages a user has been browsing, infer what they have been working on. Do not give an introduction and write in third-person without using pronouns. Each summary is separated by a `"},
            {"role": "user", "content": allSummaries}
            ],
            temperature=0.6,
            max_tokens=512,
        )
        arr = res.choices[0].message.content.split("[/INST]")
        if (len(arr) < 1):
            raise ValueError("No output")
        return arr[1]
    
    def other_k_people(self, master, slaves, k):
        res = self.client.chat.completions.create(
        model="mistral-7b",
        messages=[
            {"role": "system", "content": find_others_system_prompt(k)},
            {"role": "user", "content": find_others_user_prompt(master, cut(self, slaves), k)}
            ],
            temperature=0.6,
            max_tokens=512,
        )
        arr = res.choices[0].message.content.split("[/INST]")
        if (len(arr) < 1):
            raise ValueError("No output")
        return arr[1]
    


# master_json="""
# The user has been working on a project related to web development, specifically using CSS to fill an entire screen with a div. They have also been searching for general information on various topics, including "hello" and "hacker news."
# Additionally, the user has been engaging with a variety of YouTube content related to survival and camping in extreme winter conditions. They have been accessing this content through a login page for ChatGPT, a conversational AI model, and a YouTube page with a miniplayer. The user has been interacting with the videos, such as playing, pausing, and adjusting playback speed and volume. They have also been using features such as sharing, liking, and adding videos to playlists. The user has been accessing this content both on a webpage and through a dynamic, interactive miniplayer.
# """


# slave_json = """
#     7: { summary: The user has been working on a project related to Stable Diffusion, a feature of Hugging Face's Diffusers library. They have been consulting the official documentation page for Stable Diffusion, which provides a quick tour, installation instructions, and guides for loading and using pipelines, models, schedulers, and configuring them. They have also been following a tutorial in a Google Colab notebook, which is designed for running machine learning experiments using the Hugging Face library for diffusion models 
# Additionally, the user has been exploring resources from Stability AI, a company that specializes in AI models. They have visited the news release page about the public release of the Stable Diffusion model, as well as the page for Stability AI Image Models, which provides information about the company's image models with a focus on the Stable Diffusion model. The user has also looked at the Stability AI website, which includes a navigation menu with links to sections like Models, Membership, API, and Company. }
#     """