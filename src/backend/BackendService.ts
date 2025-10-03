import api, { route } from "@forge/api";

class BackendService {
  async getData() {
    const response = await api.asApp().requestJira(route`/rest/api/2/issue/HM-32?fields=description`);
    console.log("Jira API response:", response);

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();
    data = JSON.stringify(data);

    // Return the entire response
    return data;
  }
}

export const backendService = new BackendService();
