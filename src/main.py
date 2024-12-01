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
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(GZipMiddleware)
templates = Jinja2Templates(directory="templates")


default_start = 2022
default_end = 2024

@app.get("/educational")
async def landing(request: Request):
    """
    Renders the landing page, redirecting you to landing.html.
    """
    context = {}
    return templates.TemplateResponse(name="educational.html", request=request, context=context)


@app.get("/")
async def landing(request: Request):
    """
    Renders the landing page, redirecting you to landing.html.
    """
    context = {}
    return templates.TemplateResponse(name="landing.html", request=request, context=context)

@app.get("/{ticker}")
async def index(request: Request, ticker: str, start: int=default_start, end: int=default_end):
    """
    Renders the page base.html showing the charts for of that ticker.
    Args:
    ticker (str): The ticker symbol.
    start (int, optional): The start year. Defaults to 2012.
    end (int, optional): The end year. Defaults to 2022.
    """
    context = {
        "ticker": ticker,
        "start": start,
        "end": end,
    }
    return templates.TemplateResponse(name="base.html", request=request, context=context)


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


@app.get('/volume/{ticker}/')
async def get_monthly_returns(ticker: str, start: int=default_start, end: int=default_end):
    """
    AVERAGE OF WEEKLY VOLUMES for a given ticker.

    Args:
    ticker (str): The ticker symbol.
    start (int, optional): The start year. Defaults to 2012.
    end (int, optional): The end year. Defaults to 2022.

    Returns:
    dict: The monthly standard deviation data.
    """
    start = dt.datetime(start,1,1)
    end = dt.datetime(end, 1,1)
    
    data = volume_seasonality(start, end, ticker)
    return {data.to_json()}

