import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { PopoverNode, ScrollareaNode, SelectNode } from './tiptap-plugins';

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ content = '', onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      PopoverNode,
      ScrollareaNode,
      SelectNode,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
        style: 'min-height: 200px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;',
      },
    },
  });

  const insertPopoverNode = () => {
    if (editor) {
      editor.chain().focus().insertPopoverNode({
        title: 'New Popover',
        content: 'This is a new popover content. Click edit to modify it.'
      }).run();
    }
  };

  const insertScrollareaNode = () => {
    if (editor) {
      editor.chain().focus().insertScrollareaNode({
        title: 'New Scrollarea',
        content: 'This is a new scrollarea content. Click edit to modify it.'
      }).run();
    }
  };

  const insertSelectNode = () => {
    if (editor) {
      editor.chain().focus().insertSelectNode({
        title: 'New Select',
        content: 'This is a new select content. Click edit to modify it.'
      }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor-container">
      <div className="editor-toolbar" style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={insertPopoverNode}
          style={{
            padding: '8px 12px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Add Popover
        </button>
        <button
          onClick={insertScrollareaNode}
          className='bg-red-500'
          style={{
            padding: '8px 12px',
            color: 'white',
          }}
        >
          Add Scrollarea
        </button>
        <button
          onClick={insertSelectNode}
          style={{
            padding: '8px 12px',
            backgroundColor: '#10b981',
            color: 'white',
          }}
        >
          Add Select
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};