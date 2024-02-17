from nomic.atlas import AtlasDataset
import numpy as np
from pydantic import BaseModel

dataset = AtlasDataset(
    "sit-downs-pages",
    unique_id_field="id",
)

class DatasetPage(BaseModel):
    id: int
    title: str
    url: str
    body: str
    summary: str
    date: str
    user_name: str


def add_page(page: DatasetPage):
    page_json = {
        "id": page.id,
        "title": page.title,
        "url": page.url,
        "body": page.body,
        "summary": page.summary,
        "date": page.date,
        "user_name": page.user_name
    }
    dataset.add_data(
        data=[page_json]
    )


def generate_map():
    map = dataset.create_index(
        indexed_field="summary",
        topic_model=True,
        duplicate_detection=True,
        projection=None,
        embedding_model="NomicEmbed"
    )
    return map


def get_projection():
    return dataset.maps[0].embeddings.projected