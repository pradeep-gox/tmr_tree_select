import { TreeData } from "../interfaces";

export const findNode = (
  tree: TreeData[],
  id: string
): TreeData | undefined => {
  for (const node of tree) {
    if (node.value === id) {
      return node;
    }
    if (node.children) {
      const foundNode = findNode(node.children, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }
};
