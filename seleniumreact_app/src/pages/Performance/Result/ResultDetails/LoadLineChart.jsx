import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ height }) => {
  const options = {
    chart: {
      id: "smooth-line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#0000ff", "#ff0000"],
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      title: {
        text: "Virtual Users",
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      title: {
        text: "Time (ms)",
      },
      labels: {
        formatter: function (value) {
          return value;
        },
        // Custom Y-axis values
        yaxis: [0, 100, 200, 300, 400, 500],
      },
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      markers: {
        width: 30,
        height: 5,
        radius: 0,
      },
    },
    height: 280,
  };

  const series = [
    {
      name: "Hit’s",
      type: "line",
      data: [0, 120, 100, 50, 300, 130, 200, 311, 400],
    },
    {
      name: "Error",
      type: "line",
      data: [30, 80, 200, 235, 250, 285, 300, 355, 360],
    },
  ];

  return (
    <div>
       <div style={{ textAlign: "center"}}>Load</div>
      <div style={{ height: "calc(45vh - 20px)", marginBottom:'10px' }} className="line-container">
        <Chart options={options} series={series} type="line" height={height} />
      </div>
    </div>
  );
};

export default LineChart;
