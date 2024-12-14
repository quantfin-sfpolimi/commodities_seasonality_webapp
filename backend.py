""""
line charts:
- una per la seasonality
- 5 per i 5 anni più recenti

bar charts
- un grafico per i volumi mensili
"""

from fastapi import FastAPI, Path, Request

from pydantic import BaseModel
from typing import Optional
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware
from helpers_seasonality import *
import datetime as dt
import json



app = FastAPI()
app.add_middleware(GZipMiddleware)


default_start = 2020
default_end = 2021

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

    #now it returns just pandas dataframe, to be fixed!!!
    print(type(start), end)
    
    start = str(start)+"01-01"
    end = str(end)+"01-01"
    print(start, end, type(start), type(end))
    
    data = calculate_seasonality_mean(start, end, ticker)    
    
    return data


@app.get("/")
async def landing(request: Request):
    """
    Renders the landing page, redirecting you to landing.html.
    """
    return "hello"

