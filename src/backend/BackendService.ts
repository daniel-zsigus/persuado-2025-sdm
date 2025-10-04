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
    console.log({ user });
    const accountId = user["accountId"];
    console.log({ accountId });
    const groupsRes = await api.asApp().requestJira(route`/rest/api/3/user/groups?accountId=${accountId}`);
    const groupsData = (await groupsRes.json()) as { name: string }[];
    const groupNames = groupsData.map((g) => g.name);
    console.log({ groupNames });

    const configData = await this.getData();

    const roleMap = new Map<string, string[]>();

    for (const role of configData.roles) {
      roleMap.set(role.name, role.membergroups);
    }

    console.log(roleMap);

    if (!groupNames || groupNames.length === 0) {
      return "User";
    }

    for (const [roleName, roleGroups] of roleMap.entries()) {
      if (groupNames.some((group) => roleGroups.includes(group))) {
        return roleName === "HR Administrator" || roleName === "Project Manager" ? roleName : "User";
      }
    }

    return "user";
  }
}

export const backendService = new BackendService();
