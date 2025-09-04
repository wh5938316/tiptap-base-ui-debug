import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { TiptapEditor } from '../components/TiptapEditor'
import '../App.css'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [content, setContent] = useState(`<h2>Tiptap Custom Popover Node Usage Guide</h2>
<p>This is a demonstration of a custom Tiptap node plugin using Base UI Popover component.</p>

<h3>Known Issues:</h3>
<ol>
<li><strong>ScrollArea Conflict Issue:</strong> Clicking the "Add Popover" button causes errors because ScrollArea component is used in NodeView.</li>
<li><strong>Positioning Issue:</strong> After commenting out ScrollArea, nodes can be added successfully, but clicking the newly appeared "New Popover" button doesn't show the popup because the button has position: 'absolute' set.</li>
</ol>`);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ color: '#1f2937', marginBottom: '8px' }}>Tiptap Custom Popover Node Demo</h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          A custom Tiptap node plugin using Base UI Popover component
        </p>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#374151', marginBottom: '16px', fontSize: '18px' }}>Rich Text Editor</h2>
        <TiptapEditor
          content={content}
          onChange={setContent}
        />
      </div>

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>

      </div>
    </div>
  )
}
