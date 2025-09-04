import React, { useState } from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { Popover } from '@base-ui-components/react/popover';
import type { PopoverNodeAttributes } from './types';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export const PopoverNodeView: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState('');
  const [tempTitle, setTempTitle] = useState('');

  const attributes = node.attrs as PopoverNodeAttributes;

  const handleEdit = () => {
    setTempContent(attributes.content || '');
    setTempTitle(attributes.title || '');
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSave = () => {
    updateAttributes({
      content: tempContent,
      title: tempTitle,
    });
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsOpen(false);
    setTempContent('');
    setTempTitle('');
  };

  return (
    <NodeViewWrapper className="popover-node-wrapper" style={{
      border: "1px solid",
      padding: 16,
      position: 'relative',
    }}>
      <Popover.Root>
        <Popover.Trigger
          render={
            <button
              className="popover-trigger-button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s',
                position: 'absolute',
                right: 20,
                top: 20,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              {attributes.title || 'Popover Title'}
            </button>
          } />

        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                maxWidth: '300px',
                zIndex: 1000,
              }}
            >
              {isEditing ? (
                <div className="popover-edit-form">
                  <div style={{ marginBottom: '12px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#374151',
                      }}
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                      placeholder="Enter title"
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#374151',
                      }}
                    >
                      Content:
                    </label>
                    <textarea
                      value={tempContent}
                      onChange={(e) => setTempContent(e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        resize: 'vertical',
                      }}
                      placeholder="Enter content"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleCancel}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="popover-content">
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                      {attributes.content || 'No content available'}
                    </p>
                  </div>
                  <button
                    onClick={handleEdit}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      width: '100%',
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
              <Popover.Arrow
                style={{
                  fill: 'white',
                  stroke: '#e5e7eb',
                  strokeWidth: 1,
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      <div>
        <ScrollArea.Root className="h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]">
          <ScrollArea.Viewport className="h-full overscroll-contain rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
            <NodeViewContent />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
            <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </NodeViewWrapper>
  );
};