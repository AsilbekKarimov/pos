import React from "react";
import BarChart from "./BarChart/BarChart";
import PieChart from "./BarChart/PieChart";
import StatsTable from "./BarChart/StatsTable";

const Charts = () => {
  return (
    <div className="container mx-auto max-w-[90%] flex-1">
      <div className="flex ">
        <PieChart />
        <StatsTable/>
        <BarChart />
      </div>
    </div>
  );
};

export default Charts;





