import { makeResolver } from "@forge/resolver";
import { ResolverTypeDefs, TableRowData } from "../shared/types";
import { backendService } from "./BackendService";

export const handler = makeResolver<ResolverTypeDefs>({
  async getData() {
    return backendService.getConfigData();
  },
  async getWorklogData(request): Promise<TableRowData[]> {
    // Extract parameters from request.payload as per Forge resolver convention
    const { dateFrom, dateUntil, users } = request.payload;
    const data = await backendService.getWorklogData(dateFrom, dateUntil, users);

    // Map UserReportsResponse -> TableRowData[] for frontend
    return data.userReports.map((r) => ({
      accountId: r.accountId,
      startDate: dateFrom,
      endDate: dateUntil,
      expectedDailyHours: 8, // placeholder
      expectedHours: 160, // placeholder
      totalHours: r.daySummaries.reduce((sum, d) => sum + d.realWorkInSeconds / 3600, 0),
      overtimeHours: 0,
    }));
  },
  async getTableData(request) {
    // Forge resolver passes the payload in request.payload
    const { endDate } = request.payload;
    console.log("getTableData called with endDate:", endDate);
    return [];
  },
});
