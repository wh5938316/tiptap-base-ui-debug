import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ScrollareaNodeView } from './scrollarea-node-view';
import type { ScrollareaNodeOptions } from './types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    scrollareaNode: {
      /**
       * Insert a popover node
       */
      insertScrollareaNode: (attributes?: { content: string; title?: string }) => ReturnType;
    };
  }
}

export const ScrollareaNode = Node.create<ScrollareaNodeOptions>({
  name: 'scrollareaNode',

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
        default: 'Click to edit scrollarea content',
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
        default: 'Scrollarea Title',
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
        tag: 'div[data-type="scrollarea-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'scrollarea-node' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ScrollareaNodeView);
  },

  addCommands() {
    return {
      insertScrollareaNode:
        (attributes = { content: 'New scrollarea content' }) =>
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