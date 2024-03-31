import React from 'react'
import { faker } from "@faker-js/faker";
import { Line } from 'react-chartjs-2';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
  export const data = {
    labels,
    datasets: [
      {
        label: "Total Spendings",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 12000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]
}

const LineChart2 = () => {
  return (
    <div>
        <Line data={data}  />

    </div>
  )
}

export default LineChart2