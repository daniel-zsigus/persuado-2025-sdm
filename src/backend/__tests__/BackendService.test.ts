import { Role } from "../../shared/types";

test("dummy test", () => {
  const role: Role = { name: "Admin", membergroups: ["jira-administrators"] };
  expect(role).toBeDefined();
  expect(role.name).toBe("Admin");
  expect(role.membergroups).toContain("jira-administrators");
});
