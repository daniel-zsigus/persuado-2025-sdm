import api, { route } from "@forge/api";

class BackendService {
  async getData() {
    const issueKey = "HM-34";
    const response = await api.asApp().requestJira(route`/rest/api/2/issue/${issueKey}?fields=description`);

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();
    data = data["fields"]["description"];

    const jsonData = JSON.parse(data);
    const roles = jsonData["roles"] ?? [];
    const colleagues = jsonData["colleagues"] ?? [];

    const res = { roles: [JSON.stringify(roles)], colleagues: [JSON.stringify(colleagues)] };
    return res;
  }
}

export const backendService = new BackendService();
