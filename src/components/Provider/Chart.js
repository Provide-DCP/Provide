import React from "react";
import { Line } from "react-chartjs-2";

export const Chart = ({ data }) => (
  <div className="my-5 mx-auto">
    <Line data={data} height={"400px"} width={"400px"} options={{ maintainAspectRatio: false }} />
  </div>
);
