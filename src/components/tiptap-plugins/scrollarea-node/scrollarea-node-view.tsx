import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export const ScrollareaNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper className="scrollarea-node-wrapper" style={{
      border: "1px solid",
      padding: 16,
      position: 'relative',
    }}>
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