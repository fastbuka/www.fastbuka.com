"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";

type Props = {
  value: string;
  setValue: (html: string) => void;
};

export default function RichTextEditor({ value, setValue }: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setValue(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setValue(editorRef.current.innerHTML);
    }
  };

  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-[#E7E7E7] rounded-2xl w-full">
      <div className="flex gap-2 border-b px-6 py-2.5 mb-2">
        <EditorButton
          onClick={() => exec("bold")}
          label="Bold"
          shortcut="Ctrl+B"
        >
          <Bold size={15} />
        </EditorButton>
        <EditorButton
          onClick={() => exec("italic")}
          label="Italic"
          shortcut="Ctrl+I"
        >
          <Italic size={15} />
        </EditorButton>
        <EditorButton
          onClick={() => exec("underline")}
          label="Underline"
          shortcut="Ctrl+U"
        >
          <Underline size={15} />
        </EditorButton>
        <EditorButton
          onClick={() => exec("insertUnorderedList")}
          label="Bullet List"
          shortcut="Ctrl+Shift+U"
        >
          <List size={15} />
        </EditorButton>
        <EditorButton
          onClick={() => exec("insertOrderedList")}
          label="Numbered List"
          shortcut="Ctrl+Shift+O"
        >
          <ListOrdered size={15} />
        </EditorButton>
      </div>

      <div
        ref={editorRef}
        className="min-h-[132px] px-6 outline-none max-w-none text-sm 2xl:text-base font-normal text-[#101010] 
    list-disc list-inside [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4"
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
}

function EditorButton({
  onClick,
  children,
  label,
  shortcut,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  shortcut: string;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={onClick}
            className="p-1 text-sm border border-gray-200 rounded hover:bg-gray-100"
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-800 text-white text-xs px-2 py-1 rounded"
            side="top"
            sideOffset={4}
          >
            {label} ({shortcut})
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
