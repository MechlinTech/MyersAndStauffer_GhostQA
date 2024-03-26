import React, { useState } from 'react'
import Chart from "react-apexcharts";
export default function Trends() {
    const series = [
        {
          name: "Loreum",
          data: [0,100,300,200,500,300],
        },
        {
          name: "Loreum",
          data: [100,200,200,300,300],
        },
      ];
    
      const options = {
        chart: {
          type: "line",
          height: 350,
          toolbar: {
            show: false // Set to false to hide the toolbar
          },
          zoom: {
            enabled: false // Disable zooming
          }
        },
        title: {
            text: "Average Response Time", // Add your title text here
            align: "center",
            style: {
                fontFamily: "Lexend Deca",
              fontSize: '18px', // Adjust font size as needed
              fontWeight: 'bold', // Adjust font weight as needed
            }
          },
        stroke: {
            curve: 'smooth',
            width:[1,1]
          },
        xaxis: {
          categories: [1,2,3,4,5,6,7],
          title: {
            text:  'X-Axis Label', 
          },
        },
        yaxis: {
            title: {
              text:  'Y-Axis Label', // Default label for y-axis
            },
          },
        colors: ["#ff0000", "#654DF7"], 
        legend: {
          show:false
        },
      };
    
  return (
    <div>
         <Chart options={options} series={series} type="line" height={350} />
    </div>
  )
}
