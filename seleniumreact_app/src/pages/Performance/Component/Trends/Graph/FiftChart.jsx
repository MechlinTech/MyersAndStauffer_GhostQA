import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function FiftChart({height, fontSize}) {
  const series = [
    {
      name: "Loreum",
      data: [0, 100, 300, 200, 500, 300],
    },
    {
      name: "Loreum",
      data: [100, 200, 200, 300, 300],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "Fifth Level",
      align: "center",
      style: {
        fontFamily: "Lexend Deca",
        fontSize: fontSize,
        fontWeight: "bold",
      },
    },
    stroke: {
      curve: "smooth",
      width: [1, 1],
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7],
      title: {
        text: "X-Axis Label",
        style: {
          fontFamily: "Lexend Deca",
          fontSize: fontSize,
        },
      },
    },
    yaxis: {
      title: {
        text: "Y-Axis Label",
        style: {
          fontFamily: "Lexend Deca",
          fontSize: fontSize,
        },
      },
    },
    colors: ["#ff0000", "#654DF7"],
    legend: {
      show: false,
    },
  };

  return (
    <div  className="line-container">
      <Chart options={options} series={series} type="line" height={height} />
    </div>
  );
}
