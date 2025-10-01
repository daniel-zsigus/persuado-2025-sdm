import { makeInvoke } from "@forge/bridge";
import ForgeReconciler, { Text } from "@forge/react";
import React, { useEffect, useState } from "react";
import { ResolverTypeDefs } from "../shared/types";

const invoke = makeInvoke<ResolverTypeDefs>();

const App = () => {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    invoke("getText").then(setData);
  }, []);

  return (
    <>
      <Text>Hello world from frontend!</Text>
      <Text>{data || "Loading text from backend..."}</Text>
      <Text>Feature-3</Text>
      <Text>Feature-4</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
