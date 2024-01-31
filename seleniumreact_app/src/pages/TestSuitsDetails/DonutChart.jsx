// Donut.jsx

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Donut = ({ series, labels, height }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // Avoid setting a fixed width for small screens
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const selectedLabel = config?.w?.config?.labels?.[config.dataPointIndex];
            if (selectedLabel) {
              console.log('Selected label:', selectedLabel);
            }
          },
        },
      },
      colors: ['rgb(101, 77, 247)', 'rgb(247, 77, 77)'],
    },
  });

  useEffect(() => {
    if (series && labels && series.length > 0 && labels.length > 0) {
      setChartData({
        series: series,
        options: {
          labels: labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  // Avoid setting a fixed width for small screens
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
          chart: {
            events: {
              dataPointSelection: (event, chartContext, config) => {
                const selectedLabel = config?.w?.config?.labels?.[config?.dataPointIndex];
                if (selectedLabel) {
                  console.log('Selected label:', selectedLabel);
                }
              },
            },
          },
          colors: ['rgb(101, 77, 247)', 'rgb(247, 77, 77)'],
        },
      });
    }
  }, [series, labels]);

  if (!series || !labels || series.length === 0 || labels.length === 0) {
    return null; // Don't render anything if series or labels are empty or undefined
  }

  return (
    <div className="donut" style={{ height: '100%' }}>
      <Chart options={chartData?.options} series={chartData?.series} type="donut" height={height}/>
    </div>
  );
};

export default Donut;