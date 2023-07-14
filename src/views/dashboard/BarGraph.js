/* eslint-disable */
import React, { useEffect } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import { Chart, CategoryScale } from 'chart.js/auto';
Chart.register(CategoryScale);

const BarGraph = () => {
  useEffect(() => {
    // Get the chart canvas element
    const ctx = document.getElementById('barChart').getContext('2d');

    // Define the chart data
    const data = {
      labels: ['Projects', 'Task', 'Pending Task'],
      datasets: [
        {
          label: 'Total',
          data: [10, 15, 5],
          backgroundColor: ['#0f9299'], // Bar colors for each label
        },
      ],
    };

    // Define the chart options
    const options = {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create the chart
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }, []);

  return <canvas id="barChart" width={100} height={100}></canvas>;
};

export default BarGraph;
