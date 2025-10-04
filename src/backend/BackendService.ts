import api, { route } from "@forge/api";
import { OvertimeConfig } from "../shared/types";

class BackendService {
  async getConfigData(): Promise<OvertimeConfig> {
    const issueKey = "HM-34";
    const response = await api.asApp().requestJira(route`/rest/api/2/issue/${issueKey}?fields=description`);

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
    }

    const responseJson = await response.json();
    const description = responseJson["fields"]["description"];

    const jsonData: OvertimeConfig = JSON.parse(description);
    return jsonData;
  }
}

export const backendService = new BackendService();
