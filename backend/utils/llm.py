from openai import OpenAI
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer
from utils.prompts import find_others_system_prompt, find_others_user_prompt

load_dotenv()

def init_llm():
    model_id = os.environ["BASE_TEN_MODEL_ID"]
    return OpenAI(
        api_key=os.environ["BASE_TEN_API_KEY"],
        base_url=f"https://bridge.baseten.co/{model_id}/v1"
    )

def cut(webSequence):
    tokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-v0.1")
    tokenized = tokenizer(webSequence, return_tensors="pt")
    if (len(tokenized.input_ids[0]) < 4000):
        return webSequence
    return tokenizer.decode(tokenized.input_ids[0][:4000])

def summarize_webpage(llm: OpenAI, title, url, body):
    webSequence = f"TITLE:{title},URL:{url},BODY:{body}"
    webSequence = cut(webSequence)
    res = llm.chat.completions.create(
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
    
def summarize_date(llm: OpenAI, name: str, summaries: list[str]):
    allSummaries = "`".join(summaries)[:4000]
    res = llm.chat.completions.create(
    model="mistral-7b",
    messages=[
        {"role": "system", "content": f"From the following summaries of web pages a user '{name}' has been browsing, infer what they have been working on. Do not give an introduction. Do not use pronouns or an explicit subject. Be in present-continuous tense. Start Each summary is separated by a `"},
        {"role": "user", "content": allSummaries}
        ],
        temperature=0.6,
        max_tokens=512,
    )
    arr = res.choices[0].message.content.split("[/INST]")
    if (len(arr) < 1):
        raise ValueError("No output")
    return arr[1]

def summarize_summary(llm: OpenAI, summary):
    res = llm.chat.completions.create(
    model="mistral-7b",
    messages=[
        {"role": "system", "content": "Summarize the following paragraph into one concise sentence with less than 10 words."},
        {"role": "user", "content": summary}
        ],
        temperature=0.6,
        max_tokens=512,
    )
    arr = res.choices[0].message.content.split("[/INST]")
    if (len(arr) < 1):
        raise ValueError("No output")
    return arr[1]

    
def other_k_people(llm: OpenAI, target, neighbors):
    res = llm.chat.completions.create(
    model="mistral-7b",
    messages=[
        {"role": "system", "content": find_others_system_prompt()},
        {"role": "user", "content": find_others_user_prompt(target, cut(neighbors))}
        ],
        temperature=0.6,
        max_tokens=512,
    )
    arr = res.choices[0].message.content.split("[/INST]")
    if (len(arr) < 1):
        raise ValueError("No output")
    
    return arr[1]

def short_display(llm: OpenAI, target):
    res = llm.chat.completions.create(
    model="mistral-7b",
    messages=[
        {"role": "system", "content": "You will be given a summary of a person's workday. Summarize it into one very short sentence."},
        {"role": "user", "content": target}
        ],
        temperature=0.6,
        max_tokens=512,
    )
    arr = res.choices[0].message.content.split("[/INST]")
    if (len(arr) < 1):
        raise ValueError("No output")
    return arr[1]
    
    

    # neighbors = [{uid: 1, content: stuff}, {uid: 2, content: other stuff}]