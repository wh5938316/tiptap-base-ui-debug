import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { SelectNodeView } from './select-node-view';
import type { SelectNodeOptions } from './types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    selectNode: {
      /**
       * Insert a select node
       */
      insertSelectNode: (attributes?: { content: string; title?: string }) => ReturnType;
    };
  }
}

export const SelectNode = Node.create<SelectNodeOptions>({
  name: 'selectNode',

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
        default: 'Click to edit select content',
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
        default: 'Select Title',
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
        tag: 'div[data-type="select-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'select-node' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SelectNodeView);
  },

  addCommands() {
    return {
      insertSelectNode:
        (attributes = { content: 'New select content' }) =>
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