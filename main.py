from dash import Dash, html, dcc, callback, Output, Input, dash_table
import plotly.express as px
import pandas as pd
from asset_list import asset_list
from helpers_seasonality import *

import datetime as dt
from datetime import date
import yfinance as yf

app = Dash()
server = app.server




title = html.H1(children='SEASONALITY', style={'textAlign':'center'})
subtitle = html.H4(children = "Explore the seasonality of your favourite assets")
asset_dropdown =  dcc.Dropdown(options=[{'label': asset.get("name"), 'value': asset.get("ticker")} for asset in asset_list], id="ticker", className="ticker", value = "TSLA")

date_range_picker = dcc.DatePickerRange(
        id='date-range',
        className = "date-range",
        min_date_allowed=date(1995, 8, 5),
        max_date_allowed= dt.datetime.today(),
        start_date=date(2020, 8, 5),
        end_date=dt.date.today(),
    )


input_div = html.Div(id = "input-div", children = [asset_dropdown,    date_range_picker,
 ])


mention_footer = html.A("Quantitative Finance Polimi", href='https://www.instagram.com/sfclubpolimi/', target="_blank")
footer = html.Div(id = "footer", children=mention_footer)


app.layout = [
    
    #HEADER
    html.Header([title, subtitle
            ],
             className = "header"),
    
    
    html.Div(className="content", children = [
        
    input_div,
        
    html.Div(
        className = "content-graph",
        children = [dcc.Graph(id ="graph", figure=False)]),],
    
    
            ),
    footer
]


@callback(
    Output('graph', 'figure'),
    Input("ticker", "value"),
    Input("date-range",  "start_date"),
    Input("date-range", "end_date"),
)
def update_graph(ticker, start_date, end_date):
    print("ciao!")

    start_date = start_date[0:4] + "-01-01"
    end_date = end_date[0:4] + "-12-31"
    
        
    
    
    data = calculate_seasonality(start_date, end_date, ticker)
    years = data.columns.to_list()
    
    print(years)
    print(data.index)

    #print(data)
    figure = px.line(data, y = years)

    figure.update_xaxes(
    ticktext=["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    tickvals=["01-January", "01-February","01-March","01-April","01-May","01-June","01-July","01-August","01-September","01-October","01-November","01-December"]
)
    
    return figure
if __name__ == '__main__':
    app.run(debug=False)