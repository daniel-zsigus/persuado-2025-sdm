import { makeInvoke } from "@forge/bridge";
import ForgeReconciler, { Text } from "@forge/react";
import React, { useEffect, useState } from "react";
import { IssueData, ResolverTypeDefs } from "../shared/types";

const invoke = makeInvoke<ResolverTypeDefs>();

const App = () => {
  const [data, setData] = useState<IssueData | null>(null);

  useEffect(() => {
    invoke("getData")
      .then((response) => {
        setData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Text>Roles:</Text>
      <Text>{data ? data.roles.join(", ") : "Loading..."}</Text>

      <Text>Colleagues:</Text>
      <Text>{data ? data.colleagues.join(", ") : "Loading..."}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
