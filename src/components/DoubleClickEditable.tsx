import { useState, useRef, useEffect } from "react";
import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

interface DoubleClickEditableProps extends TextProps {
  children: string;
  onSave?: (value: string) => void;
}

export function DoubleClickEditable({ 
  children, 
  onSave, 
  style,
  ...others 
}: DoubleClickEditableProps) {
  const [isEditable, setIsEditable] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const lastSyncValue = useRef<string | null>(null);

  // Sync the DOM content with the children prop when NOT editing.
  // This ensures that if the prop changes externally, the UI updates.
  useEffect(() => {
    if (!isEditable && textRef.current && children !== lastSyncValue.current) {
      textRef.current.innerText = children;
      lastSyncValue.current = children;
    }
  }, [children, isEditable]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditable(true);
    const clientX = e.clientX;
    const clientY = e.clientY;

    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection) return;

      // @ts-ignore: caretRangeFromPoint is not standard but widely supported in Chromium
      if (document.caretRangeFromPoint) {
        // @ts-ignore
        const range = document.caretRangeFromPoint(clientX, clientY);
        if (range) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else if ((document as any).caretPositionFromPoint) {
        // Firefox fallback
        const pos = (document as any).caretPositionFromPoint(clientX, clientY);
        if (pos) {
          const range = document.createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 0);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditable(false);
    const newContent = e.currentTarget.innerText;
    onSave?.(newContent);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <Text
      {...others}
      ref={textRef}
      contentEditable={isEditable ? "plaintext-only" : false}
      suppressContentEditableWarning
      style={{ 
        border: "1px dashed #ccc", 
        padding: "4px",
        cursor: isEditable ? "text" : "pointer",
        whiteSpace: "pre-wrap",
        ...style 
      }}
      onMouseDown={(e) => {
        if (e.detail > 1) {
          e.preventDefault();
        }
      }}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onPaste={handlePaste}
    />
  );
}
