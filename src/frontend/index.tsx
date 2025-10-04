import { makeInvoke } from "@forge/bridge";
import ForgeReconciler, {
  Box,
  Button,
  DatePicker,
  DynamicTable,
  Inline,
  Label,
  Stack,
  Text,
  Textfield,
} from "@forge/react";
import React, { useEffect, useState } from "react";
import { ResolverTypeDefs } from "../shared/types";

const invoke = makeInvoke<ResolverTypeDefs>();

function ConfigIssue({ userRule }: { userRule: string | null }) {
  if (userRule == "HR") {
    return (
      <Stack alignInline="center" space="space.150">
        <Label labelFor="textfield">
          <Text size="large" weight="bold" color="color.text.accent.magenta">
            Config Issue :
          </Text>
        </Label>
        <Inline space="space.100" alignBlock="center">
          <Textfield name="basic" id="textfield" width={350} defaultValue="KAN-" />
          <Button appearance="primary">SUBMIT</Button>
        </Inline>
      </Stack>
    );
  } else {
    return <></>;
  }
}

const EndDatePicker = () => (
  <Stack space="space.050">
    <Label labelFor="textfield">
      <Text size="large" weight="bold" color="color.text.accent.magenta">
        Choose End Date :
      </Text>
    </Label>
    <DatePicker shouldShowCalendarButton id="End-Date-Picker" />
  </Stack>
);

const head = {
  cells: [
    {
      key: "User",
      content: (
        <Text weight="bold" size="medium" color="color.text.accent.magenta">
          Employee
        </Text>
      ),
    },
    {
      key: "Start Date",
      content: (
        <Text weight="medium" size="small" color="color.text.accent.magenta">
          Start
        </Text>
      ),
    },
    {
      key: "End Date",
      content: (
        <Text weight="bold" size="small" color="color.text.accent.magenta">
          End
        </Text>
      ),
    },
    {
      key: "Expected Daily Hours",
      content: (
        <Text weight="medium" size="small" color="color.text.accent.magenta">
          Daily Hours
        </Text>
      ),
    },
    {
      key: "Expected Hours",
      content: (
        <Text weight="bold" size="small" color="color.text.accent.magenta">
          Expected
        </Text>
      ),
    },
    {
      key: "Worked Now",
      content: (
        <Text weight="medium" size="small" color="color.text.accent.magenta">
          Worked
        </Text>
      ),
    },
    {
      key: "OverTime Hours",
      content: (
        <Text weight="bold" size="small" color="color.text.accent.magenta">
          Overtime
        </Text>
      ),
    },
  ],
};

const rows = [
  {
    key: "row-1",
    cells: [
      { key: "User", content: "Nabil Tallal" },
      { key: "Start Date", content: "13-10-2025" },
      { key: "End Date", content: "13-10-2026" },
      { key: "Expected Daily Hours", content: "8" },
      { key: "Expected Hours", content: "430" },
      { key: "Worked Now", content: "350" },
      { key: "OverTime Hours", content: "12" },
    ],
  },
];

const App = () => {
  const [userRule, setUserRule] = useState<string | null>(null);

  useEffect(() => {
    invoke("getUserRule").then(setUserRule);
  }, []);
  return (
    <>
      <Inline rowSpace="space.100" alignBlock="center" alignInline="center" spread="space-between">
        <EndDatePicker />
        <ConfigIssue userRule={userRule} />
      </Inline>

      <Box padding="space.200" />

      <Stack space="space.200">
        <Text as="strong" weight="bold" color="color.text.accent.magenta.bolder" size="large">
          WORKTIME TABLE :
        </Text>
        <Inline alignInline="end" grow="hug">
          <Button appearance="default">
            <Text color="color.text.accent.magenta">Export Excel (.csv)</Text>
          </Button>
        </Inline>

        <DynamicTable caption="" head={head} rows={rows} />
      </Stack>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
