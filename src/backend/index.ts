import { makeResolver } from "@forge/resolver";
import { ResolverTypeDefs } from "../shared/types";
import { backendService } from "./BackendService";

export const handler = makeResolver<ResolverTypeDefs>({
  async getData() {
    return backendService.getData();
  },
  async getUserRule() {
    return backendService.getUserRule();
  },
});
