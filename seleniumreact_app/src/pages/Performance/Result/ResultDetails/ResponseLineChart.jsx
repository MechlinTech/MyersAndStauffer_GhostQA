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
        text: "Response Time (ms)",
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
      name: "Response Time (ms)",
      type: "line",
      data: yData || [],
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center" }}>Response time</div>
      <div style={{ height: "calc(45vh - 20px)", marginBottom: "10px" }} className="line-container">
        <Chart options={options} series={series} type="line" height={height} />
      </div>
    </div>
  );
};

export default LineChart;
