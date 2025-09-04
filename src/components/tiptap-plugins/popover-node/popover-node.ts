import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { PopoverNodeView } from './popover-node-view';
import type { PopoverNodeOptions } from './types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    popoverNode: {
      /**
       * Insert a popover node
       */
      insertPopoverNode: (attributes?: { content: string; title?: string }) => ReturnType;
    };
  }
}

export const PopoverNode = Node.create<PopoverNodeOptions>({
  name: 'popoverNode',

  group: 'block',

  content: "block+",

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      content: {
        default: 'Click to edit popover content',
        parseHTML: element => element.getAttribute('data-content'),
        renderHTML: attributes => {
          if (!attributes.content) {
            return {};
          }
          return {
            'data-content': attributes.content,
          };
        },
      },
      title: {
        default: 'Popover Title',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          if (!attributes.title) {
            return {};
          }
          return {
            'data-title': attributes.title,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="popover-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'popover-node' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PopoverNodeView);
  },

  addCommands() {
    return {
      insertPopoverNode:
        (attributes = { content: 'New popover content' }) =>
          ({ commands, editor }) => {
            return commands.insertContent({
              type: this.name,
              attrs: attributes,
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Add your content here..." },
                  ],
                },
              ]
            });
          },
    };
  },
});