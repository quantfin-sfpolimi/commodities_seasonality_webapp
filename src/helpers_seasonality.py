import yfinance as yf
import pandas as pd
import numpy
import datetime as dt
import pandas_datareader.data as pdr
import seaborn as sns
import matplotlib.pyplot as plt
import json

def prova():
  return "helllo world!!!"

ticker = "AAPL"

start = dt.datetime(2020,1,1)
end = dt.datetime.now()

def download_data(start, end, ticker):
  date_range = pd.date_range(start=start, end=end, freq="D")

  data = pd.DataFrame(index=date_range)
  data.index = data.index.strftime("%Y-%m-%d")

  df_stock = pd.DataFrame()
  historical = yf.download(ticker, start, end)
  df_stock["Adj Close"] = historical["Adj Close"]
  df_stock["Volume"] = historical["Volume"]
  df_stock["Year"] = df_stock.index.year
  df_stock.index = df_stock.index.strftime("%Y-%m-%d")



  data["Adj Close"] = df_stock["Adj Close"]
  data["Volume"] = df_stock["Volume"]
  data.bfill(inplace=True)
  data.index = pd.to_datetime(data.index)
  data["Year"] = data.index.year

  return data

def calculate_seasonality_mean(start, end, ticker):
  data = download_data(start, end, ticker)

  #anno bisestile
  first_day = dt.datetime(2016,1,1)
  last_day = dt.datetime(2016,12,31)

  one_year_series = pd.date_range(start=first_day, end=last_day, freq="D")

  years = data["Year"].unique()
  df_seasonality = pd.DataFrame(index = one_year_series, columns=years)
  df_seasonality.index = df_seasonality.index.strftime("%m-%d")

  for year in years:
    data_year = data[data["Year"] == year]

    data_year.index = data_year.index.strftime("%m-%d")

    initial_year_price = data_year.at["01-01", "Adj Close"]
    data_year["Adj Close"] = ((data_year["Adj Close"] - initial_year_price)/ initial_year_price) * 100
    df_seasonality[year] = data_year["Adj Close"]

  df_seasonality.bfill(inplace = True)
  df_seasonality["mean"] = df_seasonality.mean(axis = 1)
  
  df_seasonality_mean = pd.DataFrame(index = df_seasonality.index)
  df_seasonality_mean["mean"] = df_seasonality["mean"]
  
  data = []
  for index, row in df_seasonality_mean.iterrows():
    data.append({"date" : index, "index": row["mean"]  })
    
  data_json = json.dumps(data)
  print(type(data_json))
  return data_json

def calculate_seasonality(start, end, ticker):
  data = download_data(start, end, ticker)

  #anno bisestile
  first_day = dt.datetime(2016,1,1)
  last_day = dt.datetime(2016,12,31)

  one_year_series = pd.date_range(start=first_day, end=last_day, freq="D")

  years = data["Year"].unique()
  df_seasonality = pd.DataFrame(index = one_year_series, columns=years)
  df_seasonality.index = df_seasonality.index.strftime("%m-%d")

  for year in years:
    data_year = data[data["Year"] == year]

    data_year.index = data_year.index.strftime("%m-%d")

    initial_year_price = data_year.at["01-01", "Adj Close"]
    data_year["Adj Close"] = ((data_year["Adj Close"] - initial_year_price)/ initial_year_price) * 100
    df_seasonality[year] = data_year["Adj Close"]

  df_seasonality.bfill(inplace = True)
  
  
  return df_seasonality



def volume_seasonality(start, end, ticker):
  data = download_data(start, end, ticker)

  years = data["Year"].unique()


  month_range = numpy.arange(1,13,1)

  volume_df = pd.DataFrame(index=month_range, columns=years)

  for year in years:
    data_year = data[data["Year"] == year]
    volume_df[year] = data_year["Volume"].groupby(data_year.index.month).sum()

  return volume_df


calculate_seasonality_mean(start, end, "AAPL")