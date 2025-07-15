"use client";
import React from "react";
import { BarChart3, Code } from "lucide-react";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      {/* Logo and Title */}
      <div className="flex items-center gap-4 text-gray-900">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          JIRA Worklog Viewer
        </h2>
      </div>

      {/* GitHub Link and Avatar */}
      <div className="flex items-center gap-6">
        {/* GitHub Code Link */}
        <a
          href="https://github.com/rxalimurad-art/jiraviewer"
          target="_blank"
          rel="noopener noreferrer"
          title="View Source Code on GitHub"
          aria-label="View Source Code on GitHub"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105"
        >
          <Code className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            View Code
          </span>
        </a>

        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-semibold text-sm">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
