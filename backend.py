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


default_start = 2022
default_end = 2024

@app.get('/get-seasonality/{ticker}/')
async def get_seasonality(ticker: str, start: int=default_start, end: int=default_end):
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
    
    start = dt.datetime(start,1,1)
    end = dt.datetime(end, 1,1)
    
    #print(start, end)
    
   
    
    data = calculate_seasonality_mean(start, end, ticker)
    
    
    return data


@app.get("/")
async def landing(request: Request):
    """
    Renders the landing page, redirecting you to landing.html.
    """
    return "hello"