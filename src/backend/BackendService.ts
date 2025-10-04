import api, { route } from "@forge/api";
import { OvertimeConfig } from "../shared/types";

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

    const res = { roles, colleagues, holidays_excluded: holidaysExcluded, holidays_included: holidaysIncluded };
    return res;
  }

  async getUserRule() {
    const res = await api.asUser().requestJira(route`/rest/api/3/myself`);
    const user = await res.json();

    const groupsRes = await api.asApp().requestJira(route`/rest/api/3/user/groups?accountId=${user.accountId}`);
    const groupsData = (await groupsRes.json()) as { name: string }[];
    const groupNames = groupsData.map((g) => g.name);

    if (!groupNames || groupNames.length === 0) {
      return "User";
    }

    if (groupNames.includes("Persuado Backoffice") || groupNames.includes("Persuado Management")) {
      return "HR";
    } else if (groupNames.includes("Persuado Project Managers")) {
      return "PM";
    } else {
      return "User";
    }
  }
}

export const backendService = new BackendService();
