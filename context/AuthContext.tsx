"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import {
  AuthContextType,
  Credentials,
  WorklogEntry,
  ChartEntry,
  Summary,
} from "@/types";

const defaultDate = new Date().toISOString().split("T")[0];

const defaultCredentials: Credentials = {
  email: "",
  password: "",
  startDate: "2025-06-01",
  endDate: defaultDate,
};

const defaultSummary: Summary = {
  totalHours: 0,
  totalDays: 0,
  avgHoursPerDay: 0,
  workingDays: 0,
};

const AuthContext = createContext<AuthContextType>({
  credentials: defaultCredentials,
  setCredentials: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  worklogData: [],
  setWorklogData: () => {},
  chartData: [],
  setChartData: () => {},
  summary: defaultSummary,
  setSummary: () => {},
  loading: false,
  setLoading: () => {},
  fetchWorklogs: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] =
    useState<Credentials>(defaultCredentials);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [worklogData, setWorklogData] = useState<WorklogEntry[]>([]);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [summary, setSummary] = useState<Summary>(defaultSummary);
  const [loading, setLoading] = useState<boolean>(false);

  // Generate all dates in the selected range
  const generateAllDatesInRange = useCallback(
    (startDate: string, endDate: string): string[] => {
      const dates: string[] = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        dates.push(date.toISOString().split("T")[0]);
      }

      return dates;
    },
    []
  );

  // Generate chart data from worklog entries
  const generateChartData = useCallback(
    (data: WorklogEntry[]) => {
      const dailyHours: Record<string, number> = {};

      // Group hours by date
      data.forEach((item) => {
        if (!dailyHours[item.date]) {
          dailyHours[item.date] = 0;
        }
        dailyHours[item.date] += item.hours;
      });

      // Generate all dates in the range
      const allDates = generateAllDatesInRange(
        credentials.startDate,
        credentials.endDate
      );

      const chartData = allDates
        .map((date) => {
          const actualHours = dailyHours[date] || 0;
          const dayOfWeek = new Date(date).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const hasData = actualHours > 0;

          return {
            date: date,
            hours: hasData ? parseFloat(actualHours.toFixed(2)) : 8, // Show 8 hours height for no data
            actualHours: parseFloat(actualHours.toFixed(2)), // Store actual hours for tooltip
            dayOfWeek: dayOfWeek,
            formattedDate: new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            isWeekend: isWeekend,
            hasData: hasData,
          };
        })
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      setChartData(chartData);
    },
    [credentials.startDate, credentials.endDate, generateAllDatesInRange]
  );

  // Calculate summary statistics from worklog entries
  const calculateSummary = useCallback((data: WorklogEntry[]) => {
    const totalHours = data.reduce((sum, item) => sum + item.hours, 0);
    const uniqueDates = [...new Set(data.map((item) => item.date))];
    const workingDays = uniqueDates.filter((date) => {
      const day = new Date(date).getDay();
      return day !== 0 && day !== 6;
    }).length;

    setSummary({
      totalHours: parseFloat(totalHours.toFixed(2)),
      totalDays: uniqueDates.length,
      avgHoursPerDay: parseFloat(
        (totalHours / uniqueDates.length || 0).toFixed(2)
      ),
      workingDays,
    });
  }, []);

  // Fetch worklogs from the API
  const fetchWorklogs = useCallback(async (): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await fetch("/api/fetchJiraLogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.email,
          apiToken: credentials.password,
          startDate: credentials.startDate,
          endDate: credentials.endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch worklogs");
      }

      const data: WorklogEntry[] = await response.json();

      // Sort data in descending order of dates
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setWorklogData(sortedData);
      generateChartData(sortedData);
      calculateSummary(sortedData);
      return true;
    } catch (err) {
      console.error("Fetch Worklogs Error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [credentials, generateChartData, calculateSummary]);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        isAuthenticated,
        setIsAuthenticated,
        worklogData,
        setWorklogData,
        chartData,
        setChartData,
        summary,
        setSummary,
        loading,
        setLoading,
        fetchWorklogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
