console.log("ciao!")

seasonality_url = "http://127.0.0.1:8000/get-seasonality/"

async function seasonality(ticker){
    url = seasonality_url + ticker;
    const data_seasonality = await fetch(url).then((response) =>
        response.json()
    );

    console.log(data_seasonality[0])
}

window.onload = function load() {
    seasonality(ticker)
};