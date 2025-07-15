"use client";
import React from "react";
import { Calendar, Clock, BarChart3, Users } from "lucide-react";
import { Summary } from "@/types";

interface SummaryCardsProps {
  summary: Summary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <p className="text-gray-600 font-medium">Total Hours</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {summary.totalHours}h
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <p className="text-gray-600 font-medium">Days Logged</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">{summary.totalDays}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-purple-600" />
          <p className="text-gray-600 font-medium">Working Days</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {summary.workingDays}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <p className="text-gray-600 font-medium">Avg Hours/Day</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {summary.avgHoursPerDay}h
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
