// tslint:disable:interface-name
declare module "tmr-tree-select" {
  import * as React from "react";
  export interface TreeData {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    children?: TreeData[];
  }
  export interface TMRTreeSelectProps {
    value: string[];
    treeData: TreeData[];
    onChange: (value: string[]) => any;
    labelPrefix?: (id: string) => React.ReactNode;
    labelSuffix?: (id: string) => React.ReactNode;
    tagPrefix?: (id: string) => React.ReactNode;
    tagSuffix?: (id: string) => React.ReactNode;
    notFoundContent?: React.ReactNode;
  }
  export default class TMRTreeSelect extends React.Component<TMRTreeSelectProps> {}
}
