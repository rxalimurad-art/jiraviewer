"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { ChartEntry } from "@/types";
import CustomTooltip from "./CustomTooltip";

interface WorklogChartProps {
  chartData: ChartEntry[];
}

const WorklogChart: React.FC<WorklogChartProps> = ({ chartData }) => {
  const getBarColor = (entry: ChartEntry) => {
    if (entry.isWeekend) {
      return entry.hasData ? "#10B981" : "#F3F4F6"; // Green if logged, light gray if not
    } else {
      if (!entry.hasData) {
        return "#EF4444"; // Red for no data on weekday
      }
      return entry.actualHours >= 8 ? "#10B981" : "#EF4444"; // Green for >=8 hours, red for <8 hours
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Hours Logged Per Day
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry)}
                  stroke={
                    !entry.hasData && entry.isWeekend ? "#D1D5DB" : "none"
                  }
                  strokeWidth={!entry.hasData && entry.isWeekend ? 1 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorklogChart;
