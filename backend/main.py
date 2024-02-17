import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from supabase import create_client, Client
from datetime import datetime, timezone
from llm import llm


l = llm()

class Page(BaseModel):
    url: str
    title: str
    body: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY")
)


@app.post("/page/{uid}")
def process_page(uid: str, page: Page):
    today_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    current_timestamp = datetime.now(timezone.utc).timestamp()

    # Call Mistral to summarize new page
    page_summary = l.summarize_webpage(page.title, page.url, page.body)

    # Call Mistral to summarize day
    response = (
        supabase.table("days")
        .select("*")
        .eq("date", today_date)
        .eq("uid", uid)
        .execute()
    )

    # Save day summary to Supabase
    page_json = {
        "time": current_timestamp,
        "url": page.url,
        "title": page.title,
        "summary": page_summary,
    }

    pages = response.data[0]["pages"] if response.data else []
    pages.append(page_json)

    day_summary = l.summarize_day([page["summary"] for page in pages])

    if response.data:
        supabase.table("days").update(
            {
                "summary": day_summary,
                "pages": pages,
            }
        ).eq("id", response.data[0]["id"]).execute()
    else:
        print({
                "date": today_date,
                "uid": uid,
                "summary": day_summary,
                "pages": pages,
            })
        supabase.table("days").insert(
            {
                "date": today_date,
                "uid": uid,
                "summary": day_summary,
                "pages": pages,
            }
        ).execute()

    # Call Mistral to find similar teammates
    # Save similarities to Supabase
    return page
