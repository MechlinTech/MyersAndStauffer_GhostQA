import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ height }) => {
  const options = {
    chart: {
      id: 'smooth-line'
    },
    colors: ["#0000ff", "#ff0000"],
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    yaxis: {
      min: 0,
      max: 500,
      // tickAmount: 6,
      labels: {
        formatter: function (value) {
          return value;
        },
        // Custom Y-axis values
        yaxis: [0, 100, 200, 300, 400, 500]
      }
    },
    // Set curve option to smooth
    stroke: {
      curve: 'smooth'
    }
  };

  const series = [{
    name: 'Blue Line',
    type: 'line',
    data: [0, 120, 100, 50, 60, 140, 200, 211, 325]
  },
  {
    name: 'Red Line',
    type: 'line',
    data: [30, 80, 200, 235, 250, 285, 300, 355, 360]
  }];

  return (
    <div style={{ height: "calc(38vh - 20px)" }} className='line-container'>
      <Chart options={options} series={series} type="line" height={height} />
    </div>
  );
};

export default LineChart;
