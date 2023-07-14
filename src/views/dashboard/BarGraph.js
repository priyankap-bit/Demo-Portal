/* eslint-disable */
import React, { useEffect } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
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
            label: '5',
            data: [10, 15, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color for 5
          },
          {
            label: '10',
            data: [20, 10, 15],
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Bar color for 10
          },
          {
            label: '15',
            data: [15, 20, 10],
            backgroundColor: 'rgba(255, 206, 86, 0.5)', // Bar color for 15
          },
          {
            label: '20',
            data: [25, 15, 20],
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color for 20
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
  