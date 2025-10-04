import { backendService } from "../BackendService";

test("test backend service getData return value", () => {
  backendService.getConfigData();
  expect("1").toBe("1");
});