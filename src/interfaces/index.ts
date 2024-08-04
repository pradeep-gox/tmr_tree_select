export interface TreeData {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: TreeData[];
}
