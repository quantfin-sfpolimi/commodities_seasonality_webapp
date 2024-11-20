from fastapi import FastAPI, Path

app = FastAPI()

@app.get('/')
async def hello_world():
    return {"Msg": "Hello World!"}