export type ResolverTypeDefs = {
  getData: () => OvertimeConfig;
  getTableData: (args: { endDate: string }) => TableRowData[];
  getWorklogData: (args: { dateFrom: string; dateUntil: string; users: string[] }) => TableRowData[];
};

// Role definition
export interface Role {
  name: string;
  membergroups: string[];
  _comment?: string;
}

// Main JSON structure
export interface OvertimeConfig {
  _comment?: string;
  roles: Role[];
  _comment_holidays_included?: string;
  holidays_included: string[]; // Dates as "YYYY.MM.DD"
  _comment_holidays_excluded?: string;
  holidays_excluded: string[]; // Dates as "YYYY.MM.DD"
  colleagues: Colleague[];
}

// Colleague definition
export interface Colleague {
  name: string;
  user_id: string; // Empty string allowed
  hr_from_previous_year: number; // Hours carried over from previous year
  work_start_date: string; // "YYYY.MM.DD" format
  expected_daily_hours: number;
}

export interface DaySummary {
  date: string;
  nonWorkInSeconds: number;
  realWorkInSeconds: number;
}

export interface UserReport {
  accountId: string;
  daySummaries: DaySummary[];
}

export interface UserReportsResponse {
  userReports: UserReport[];
}

export interface TableRowData {
  accountId: string;
  startDate: string;
  endDate: string;
  expectedDailyHours: number;
  expectedHours: number;
  totalHours: number;
  overtimeHours: number;
}
