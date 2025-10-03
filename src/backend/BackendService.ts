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
}

export const backendService = new BackendService();
