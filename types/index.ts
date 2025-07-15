export interface WorklogEntry {
  id: string;
  date: string;
  user: string;
  issueKey: string;
  issueType: string;
  summary: string;
  hours: number;
  description: string;
}

export interface ChartEntry {
  date: string;
  hours: number;
  actualHours: number;
  dayOfWeek: number;
  formattedDate: string;
  isWeekend: boolean;
  hasData: boolean;
}

export interface Summary {
  totalHours: number;
  totalDays: number;
  avgHoursPerDay: number;
  workingDays: number;
}

export interface TooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
  label?: string;
}

export interface Credentials {
  email: string;
  password: string;
  startDate: string;
  endDate: string;
}

export interface AuthContextType {
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  worklogData: WorklogEntry[];
  setWorklogData: (data: WorklogEntry[]) => void;
  chartData: ChartEntry[];
  setChartData: (data: ChartEntry[]) => void;
  summary: Summary;
  setSummary: (summary: Summary) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchWorklogs: () => Promise<boolean>;
}
