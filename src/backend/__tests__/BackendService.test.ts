import { backendService } from "../BackendService";

test("test backend service getData return value", () => {
  backendService.getData();
  expect("1").toBe("1");
});
