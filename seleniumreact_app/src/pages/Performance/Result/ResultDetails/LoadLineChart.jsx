import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ height, Yaxis, Xaxis }) => {

  const xCategories = Xaxis && Xaxis.filter(item => item !== null).map(item => (item ? formatTimestamp(item) : ""));
  const yData = Yaxis && Yaxis.filter(item => item !== null);

  const options = {
    chart: {
      id: "smooth-line",
      toolbar: {
        show: false,
      },
    },
    colors: ["#0000ff", "#ff0000"],
    xaxis: {
      categories: xCategories || [],
      title: {
        text: "Time (hh:mm:ss)",
      },
    },
    yaxis: {
      min: 0,
      max: yData ? Math.max(...yData) : 0,
      title: {
        text: "Virtual Users",
      },
      labels: {
        formatter: function (value) {
          return value;
        },
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
      name: "Virtual Users",
      type: "line",
      data: yData || [],
    },
  ];

  const shouldRenderChart = (Yaxis && Yaxis.length > 0 && yData && yData.length > 0) || (xCategories && xCategories.length > 0);

  return (
    <div>
      <div style={{ textAlign: "center" }}>Load</div>
      <div style={{ height: "calc(45vh - 20px)", marginBottom: "10px" }} className="line-container">
        {shouldRenderChart && (
          <Chart options={options} series={series} type="line" height={height} />
        )}
        {!shouldRenderChart ? (
          <div>No data available</div>
        ) : null}
      </div>
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default LineChart;
