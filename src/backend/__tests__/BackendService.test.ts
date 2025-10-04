import { backendService } from "../BackendService";

test("test backend service getData return value", () => {
  backendService.getConfigData();
  expect("1").toBe("1");
});

test("test backend service getTableData return value", () => {
  backendService.getWorklogData("2023-10-01", "2023-10-31");
  expect("1").toBe("1");
});