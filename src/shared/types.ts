export type ResolverTypeDefs = {
  getData: () => IssueData;
};

export type IssueData = {
  roles: string[];
  colleagues: string[];
};
