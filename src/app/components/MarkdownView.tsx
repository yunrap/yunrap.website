"use client";

import MDEditor from "@uiw/react-md-editor";

interface MarkdownViewProps {
  content: string;
}

export default function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <div data-color-mode="dark">
      <MDEditor.Markdown source={content} className="text-gray-200" />
    </div>
  );
}
