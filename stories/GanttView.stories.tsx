import * as React from "react";

import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { IInputs, IOutputs } from "../GanttView/generated/ManifestTypes";

import { useEffect, useMemo, useState } from "react";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  DateTimePropertyMock,
  TwoOptionsPropertyMock,
} from "@shko.online/componentframework-mock";

import { GanttView as Component } from "../GanttView";
import { getFromResource } from "./getFromSource";

import testData from "./testData";

import "../GanttView/css/GanttView.css";

interface StoryArgs {
  currentDate: Date;
  expandDetails: boolean;
  ganttEndDate: Date;
  ganttStartDate: Date;
}

export default {
  title: "PCF Component/GanttView",
  argTypes: {
    currentDate: {
      description: getFromResource("CurrentDate_Desc_Key"),
    },
    expandDetails: {
      description: getFromResource("ExpandDetails_Desc_Key"),
    },
    ganttEndDate: {
      description: getFromResource("GanttEndDate_Desc_Key"),
    },
    ganttStartDate: {
      description: getFromResource("GanttStartDate_Desc_Key"),
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta<StoryArgs>;

const dateArg = (arg: Date) =>
  arg instanceof Date || !arg ? arg : new Date(arg);

export const LongText = {
  render: (args: StoryArgs) => {
    const mockGenerator = useMemo(() => {
      const mockGenerator: ComponentFrameworkMockGeneratorReact<
        IInputs,
        IOutputs
      > = new ComponentFrameworkMockGeneratorReact(Component, {
        currentDate: DateTimePropertyMock,
        expandDetails: TwoOptionsPropertyMock,
        ganttEndDate: DateTimePropertyMock,
        ganttStartDate: DateTimePropertyMock,
        records: DataSetMock,
      });
  
      mockGenerator.context._SetCanvasItems({
        currentDate: dateArg(args.currentDate),
        expandDetails: true,
        ganttEndDate: dateArg(args.ganttEndDate),
        ganttStartDate: dateArg(args.ganttStartDate),
      });
  
      mockGenerator.context._parameters.records._InitItems(testData);
  
      mockGenerator.ExecuteInit();
      return mockGenerator;
    }, []);
  
    useEffect(() => {
      mockGenerator.context._parameters.currentDate._SetValue(
        args.currentDate instanceof Date
          ? args.currentDate
          : new Date(args.currentDate)
      );
      mockGenerator.context._parameters.expandDetails._SetValue(
        args.expandDetails
      );
      mockGenerator.context._parameters.ganttEndDate._SetValue(
        args.ganttEndDate instanceof Date
          ? args.ganttEndDate
          : new Date(args.ganttEndDate)
      );
      mockGenerator.context._parameters.ganttStartDate._SetValue(
        args.ganttStartDate instanceof Date
          ? args.ganttStartDate
          : new Date(args.ganttStartDate)
      );
      setComponent(mockGenerator.ExecuteUpdateView());
    }, [
      args.currentDate,
      args.expandDetails,
      args.ganttEndDate,
      args.ganttStartDate,
    ]);
  
    const [component, setComponent] = useState<ReactElement>(<React.Fragment></React.Fragment>);
  
    return component;
  },
  args: {
    currentDate: new Date(2023, 1, 14),
    expandDetails: false,
    ganttEndDate: new Date(2023, 4, 31),
    ganttStartDate: new Date(2023, 1, 1),
  },
} as StoryObj<StoryArgs>;
