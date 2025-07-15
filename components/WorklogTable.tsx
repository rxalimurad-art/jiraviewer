"use client";
import React from "react";
import { WorklogEntry } from "@/types";

interface WorklogTableProps {
  worklogs: WorklogEntry[];
}

const WorklogTable: React.FC<WorklogTableProps> = ({ worklogs }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-900 font-medium">
                Date
              </th>
              <th className="px-4 py-3 text-left text-gray-900 font-medium">
                User
              </th>
              <th className="px-4 py-3 text-left text-gray-900 font-medium">
                Issue Key
              </th>
              <th className="px-4 py-3 text-left text-gray-900 font-medium">
                Summary
              </th>
              <th className="px-4 py-3 text-left text-gray-900 font-medium">
                Time Spent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {worklogs.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{item.date}</td>
                <td className="px-4 py-3 text-gray-600">{item.user}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {item.issueKey}
                </td>
                <td className="px-4 py-3 text-gray-600">{item.summary}</td>
                <td className="px-4 py-3 text-gray-600">{item.hours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorklogTable;
