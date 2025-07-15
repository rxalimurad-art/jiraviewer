"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";

interface DateRangeFilterProps {
  onApply: () => void;
  loading: boolean;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onApply,
  loading,
}) => {
  const { credentials, setCredentials } = useAuth();

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="date"
              value={credentials.startDate}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  startDate: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="date"
              value={credentials.endDate}
              onChange={(e) =>
                setCredentials({ ...credentials, endDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 hover:cursor-pointer"
        >
          {loading ? "Fetching..." : "Apply Filter"}
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
