from fastapi import FastAPI, Path, Request
from pydantic import BaseModel
from typing import Optional
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware
from helpers_seasonality import *
import datetime as dt
import json

import os
from dotenv import load_dotenv

load_dotenv()

MY_API_TOKEN = os.getenv("API_KEY")
EXCHANGE_CODE = 'US'
print("ciao")
print(MY_API_TOKEN)

app = FastAPI()
app.add_middleware(GZipMiddleware)


default_start = 2018
default_end = 2022

@app.get('/get-seasonality/{ticker}/')
async def get_seasonality(ticker: str, start=default_start, end=default_end):
    """
    This page is fetched when clicking Submit, and returns returns SEASONALITY
    (MEAN OF RETURNS).

    Args:
    ticker (str): The ticker symbol.
    start (int, optional): The start year. Defaults to 2012.
    end (int, optional): The end year. Defaults to 2022.

    Returns:
    dict: The seasonality data in JSON format.
    """
    print(type(start), end)
    
    start = str(start)+"-01-01"
    end = str(end)+"-01-01"
    print(start, end, type(start), type(end))
    
    data = prova(start, end, ticker)    
    print(type(data))
    return data

@app.get('/volume/{ticker}/')
async def get_seasonality(ticker: str, start=default_start, end=default_end):
    
    print(type(start), end)
    
    start = str(start)+"-01-01"
    end = str(end)+"-01-01"
    print(start, end, type(start), type(end))
    
    data = volume_seasonality(start, end, ticker)    
    
    
    return data


@app.get("/")
async def landing(request: Request):
    """
    Renders the landing page, redirecting you to landing.html.
    """
    return "hello"

@app.get("/ticker-list")
async def get_ticker_list():
    
    url = f'https://eodhd.com/api/exchange-symbol-list/NASDAQ?api_token={MY_API_TOKEN}&fmt=json&type=preferred_stock'
    data = requests.get(url).json()
    get_ticker_list = []
    for ticker in data: 
        print(ticker)
        temp = dict()
        temp['value'] = ticker['Code']
        temp['label'] = ticker['Name']
        get_ticker_list.append(temp)
    return get_ticker_list

print(prova("2023-01-01", "2024-01-01", "AAPL"))