import { makeResolver } from "@forge/resolver";
import { ResolverTypeDefs } from "../shared/types";
import { backendService } from "./BackendService";

export const handler = makeResolver<ResolverTypeDefs>({
  async getData() {
    return backendService.getConfigData();
  },
  async getTableData(request) {
    const { endDate } = request.payload;
    console.log("Received endDate:", endDate);
    // Implement logic to fetch and return table data based on endDate
    return [];
  },
});
