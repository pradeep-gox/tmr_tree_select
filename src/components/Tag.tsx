import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// types
import type { ReactNode } from "react";
import type { TreeData } from "../interfaces";

const Tag = ({
  node,
  onDelete,
  tagPrefix,
  tagSuffix,
}: {
  node: TreeData;
  onDelete: () => void;
  tagPrefix?: (id: string) => ReactNode;
  tagSuffix?: (id: string) => ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.value });
  const tf = CSS.Translate.toString(transform);
  const style = {
    transform: tf,
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      key={node.value}
      className="tmr-tree-select-tag"
      style={style}
      {...attributes}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="tmr-tree-select-tag-label" {...listeners}>
        {tagPrefix && tagPrefix(node.value)}
        <p>{node.label}</p>
        {tagSuffix && tagSuffix(node.value)}
      </div>
      <button
        type="button"
        className="tmr-tree-select-tag-close"
        onClick={onDelete}
      >
        x
      </button>
    </div>
  );
};

export default Tag;
