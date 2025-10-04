import api, { fetch, route } from "@forge/api";
import { OvertimeConfig } from "../shared/types";

interface UserReportsResponse {
  userReports: {
    accountId: string;
    daySummaries: {
      date: string;
      nonWorkInSeconds: number;
      realWorkInSeconds: number;
    }[];
  }[];
}

class BackendService {
  async getData() {
    const issueKey = "HM-34";
    const response = await api.asApp().requestJira(route`/rest/api/2/issue/${issueKey}?fields=description`);

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
    }

    const responseJson = await response.json();
    const description = responseJson["fields"]["description"];

    const jsonData: OvertimeConfig = JSON.parse(description);
    const roles = jsonData.roles ?? [];
    const colleagues = jsonData.colleagues ?? [];

    const holidaysExcluded = jsonData.holidays_excluded;
    const holidaysIncluded = jsonData.holidays_included;

    return { roles, colleagues, holidays_excluded: holidaysExcluded, holidays_included: holidaysIncluded };
  }

  async getWorklogData(
    dateFrom: string,
    dateUntil: string,
    users?: string[],
    groups?: string[],
    projects?: number[]
  ): Promise<UserReportsResponse> {
    const baseUrl = "https://jttp-cloud.everit.biz/timetracker/api/latest/public/report/fillchecker";
    const apiKey = await this.getEveritApiKey();

    const body = {
      dateFrom,
      dateUntil,
      users,
      groups,
      projects,
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-everit-api-key": apiKey,
        "x-requested-by": "ForgeApp",
        "x-timezone": "Europe/Budapest",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Fillchecker API error: ${response.status} ${response.statusText} - ${text}`);
    }

    const data: UserReportsResponse = await response.json();
    return data;
  }

  private async getEveritApiKey(): Promise<string> {
    return "YOUR_EVERIT_API_KEY";
  }
}

export const backendService = new BackendService();
