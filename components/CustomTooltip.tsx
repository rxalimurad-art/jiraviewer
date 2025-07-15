"use client";
import React from "react";
import { TooltipProps } from "@/types";

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isWeekend = data.dayOfWeek === 0 || data.dayOfWeek === 6;
    const hasData = data.hasData;
    const actualHours = data.actualHours;

    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-medium text-black">{label}</p>
        <p className="text-blue-600">
          Hours: <span className="font-bold">{actualHours}</span>
        </p>
        {isWeekend && <p className="text-gray-500 text-sm">Weekend</p>}
        {!hasData && !isWeekend && (
          <p className="text-red-500 text-sm">No work logged</p>
        )}
        {!hasData && isWeekend && (
          <p className="text-gray-500 text-sm">Weekend - No work logged</p>
        )}
        {hasData && !isWeekend && actualHours < 8 && (
          <p className="text-red-500 text-sm">Short day (&lt;8 hours)</p>
        )}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
