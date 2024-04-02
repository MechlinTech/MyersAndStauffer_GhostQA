import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ height, Yaxis, Xaxis }) => {

  const xCategories = Xaxis && Xaxis.filter(item => item !== null).map(item => (item ? item.toString() : ""));
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
        text: "Time (ms)",
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
        yaxis: yData || [],
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
      name: "Time (ms)",
      type: "line",
      data: Xaxis ? Xaxis.filter(item => item !== null) : [],
    },
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

export default LineChart;
