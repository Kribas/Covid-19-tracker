import React, { useEffect, useState } from 'react'

function LineGraph() {
    const [data,setData] = useState({});

    const buildChartData = (data, casesType="cases") => {
        let chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if(lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
            const chartData = buildChartData(data);
            setData(chartData);
        })
    },[])

    
    return (
        <div>
            <h2>I am a graph</h2>
        </div>
    )
}

export default LineGraph
