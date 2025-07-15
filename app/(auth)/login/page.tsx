"use client";
import React, { useState } from "react";
import { BarChart3, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { credentials, setCredentials, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { fetchWorklogs } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Use the fetchWorklogs function from context
      const success = await fetchWorklogs();

      if (!success) {
        throw new Error("Failed to fetch worklogs");
      }

      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        "\u274C Failed to fetch worklogs. Please check your credentials or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            JIRA Worklog Viewer
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JIRA Id
            </label>
            <input
              type="text"
              title="Only alphanumeric usernames allowed"
              value={credentials.email}
              onChange={(e) => {
                const value = e.target.value;
                const isValid = /^[a-zA-Z0-9]*$/.test(value); // allow empty or valid
                if (isValid) {
                  setCredentials({ ...credentials, email: value });
                }
              }}
              placeholder="Enter your JIRA username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Your JIRA password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !credentials.email || !credentials.password}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Fetching Worklogs...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Fetch Worklogs
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
