import { useEffect, useState, useRef } from "react";
import "../index.css";
import Highlighter from "react-highlight-words";
import Tag from "./Tag";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
// types
import type { ReactNode } from "react";
import type { TreeData } from "../interfaces";
// utils
import { findNode } from "../utils/helper";

type Props = {
  treeData: TreeData[];
  value?: string[];
  onChange?: (value: string[]) => any;
  labelPrefix?: (id: string) => ReactNode;
  labelSuffix?: (id: string) => ReactNode;
  tagPrefix?: (id: string) => ReactNode;
  tagSuffix?: (id: string) => ReactNode;
  notFoundContent?: ReactNode;
};

const TMRTreeSelect = ({
  treeData,
  value: propValue,
  onChange,
  labelPrefix,
  labelSuffix,
  tagPrefix,
  tagSuffix,
  notFoundContent,
}: Props) => {
  const isControlled = propValue !== undefined;

  const [internalValue, setInternalValue] = useState<string[]>([]);
  const [tree, setTree] = useState<TreeData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedNodes, setSelectedNodes] = useState<TreeData[]>([]);
  const wrapperRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onNodeSelect = (id: string) => {
    let newValue = [...internalValue];
    if (!newValue.includes(id)) {
      newValue.push(id);
    } else {
      newValue = newValue.filter((item) => item !== id);
    }
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.select();
      }
    }, 0);
  };

  useEffect(() => {
    if (isControlled) {
      setInternalValue(propValue);
    }
  }, [isControlled, propValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const updateTree = (tree: TreeData[]): TreeData[] => {
      return tree
        .map((node) => {
          if (searchValue === "") {
            return {
              ...node,
              children: node.children ? updateTree(node.children) : undefined,
              open: false,
            };
          }
          const isVisible = searchValue
            ? node.label.toLowerCase().includes(searchValue.toLowerCase())
            : true;
          const children = node.children
            ? updateTree(node.children)
            : undefined;
          const hasVisibleChildren = children && children.length > 0;

          const shouldShow = isVisible || hasVisibleChildren;

          if (shouldShow) {
            return {
              ...node,
              children,
              open: shouldShow,
            };
          }
          return null;
        })
        .filter((node) => node !== null);
    };
    setTree(updateTree(treeData));
  }, [searchValue, treeData]);

  useEffect(() => {
    const selectedNodes = internalValue
      .map((id) => findNode(treeData, id))
      .filter((node) => node !== undefined) as TreeData[];
    setSelectedNodes(selectedNodes);
  }, [internalValue, treeData]);

  const generateTree = (tree: TreeData[] | undefined) => {
    if (!tree) {
      return null;
    }
    return tree.map((node) => {
      const isLeaf = node.children === undefined;
      const shouldOpen = node.open;
      if (isLeaf) {
        return (
          <div key={node.value} className={`tmr-tree-select-node`}>
            <input
              type="checkbox"
              checked={internalValue.includes(node.value) ?? false}
              disabled={node.disabled}
              onChange={() => onNodeSelect(node.value)}
            />
            <label
              onClick={() => onNodeSelect(node.value)}
              className="tmr-tree-select-node-label"
              title={node.description}
            >
              {labelPrefix && labelPrefix(node.value)}
              <Highlighter
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={node.label}
              />
              {labelSuffix && labelSuffix(node.value)}
            </label>
          </div>
        );
      }
      return (
        <details
          key={node.value}
          open={shouldOpen}
          className={`tmr-tree-select-node`}
        >
          <summary>
            <div
              className="tmr-tree-select-node-label"
              title={node.description}
            >
              {labelPrefix && labelPrefix(node.value)}
              <Highlighter
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={node.label}
              />
              {labelSuffix && labelSuffix(node.value)}
            </div>
          </summary>
          {generateTree(node.children)}
        </details>
      );
    });
  };

  const handleDragEnd = (event: any, items: TreeData[]) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.value === active.id);
      const newIndex = items.findIndex((i) => i.value === over.id);
      const newValue = arrayMove(items, oldIndex, newIndex).map((i) => i.value);
      if (isControlled) {
        onChange?.(newValue);
      } else {
        setInternalValue(newValue);
      }
    }
  };

  return (
    <div className="tmr-tree-select" ref={wrapperRef}>
      <div
        className="tmr-tree-select-tags"
        onClick={() => {
          searchInputRef.current?.focus();
          setOpen(!open);
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, selectedNodes)}
        >
          <SortableContext items={internalValue} strategy={rectSortingStrategy}>
            {selectedNodes.map((node) => (
              <Tag
                node={node}
                key={node.value}
                onDelete={() => onNodeSelect(node.value)}
                tagPrefix={tagPrefix}
                tagSuffix={tagSuffix}
              />
            ))}
            <input
              ref={searchInputRef}
              className="tmr-tree-select-search"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyDown={(e) => {
                if (!open) setOpen(true);
                const isBackspace = e.key === "Backspace";
                if (isBackspace && !searchValue && selectedNodes.length > 0) {
                  onNodeSelect(selectedNodes[selectedNodes.length - 1].value);
                }
              }}
            />
          </SortableContext>
        </DndContext>
      </div>
      <ul
        className={`tmr-tree-select-list ${
          !open ? "tmr-tree-select-list-hidden" : ""
        }`}
      >
        {tree.length > 0 ? (
          generateTree(tree)
        ) : notFoundContent ? (
          <>{notFoundContent}</>
        ) : (
          <p>No data</p>
        )}
      </ul>
    </div>
  );
};

export default TMRTreeSelect;
