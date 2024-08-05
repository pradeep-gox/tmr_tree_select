import type * as React from "react";

export interface TreeData {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: TreeData[];
}
export interface TMRTreeSelectProps {
  treeData: TreeData[];
  value?: string[];
  onChange?: (value: string[]) => any;
  labelPrefix?: (id: string) => React.ReactNode;
  labelSuffix?: (id: string) => React.ReactNode;
  tagPrefix?: (id: string) => React.ReactNode;
  tagSuffix?: (id: string) => React.ReactNode;
  notFoundContent?: React.ReactNode;
}

declare const TMRTreeSelect: React.FC<TMRTreeSelectProps>;

export { TMRTreeSelect };
