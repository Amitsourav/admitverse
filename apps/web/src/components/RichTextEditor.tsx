'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote,
  Link,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [selection, setSelection] = useState<Range | null>(null)
  const [isEditorFocused, setIsEditorFocused] = useState(false)

  // Set initial content
  useEffect(() => {
    if (editorRef.current && value && !isEditorFocused) {
      editorRef.current.innerHTML = value
    }
  }, [value, isEditorFocused])

  const formatText = (e: React.MouseEvent, command: string, value?: string) => {
    // Prevent default to stop focus loss
    e.preventDefault()
    e.stopPropagation()
    
    // Ensure editor has focus
    editorRef.current?.focus()
    
    // Execute formatting command
    document.execCommand(command, false, value)
    
    // Update content after a small delay to ensure command is applied
    setTimeout(() => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    }, 10)
  }

  const insertLink = (e: React.MouseEvent) => {
    e.preventDefault()
    const url = prompt('Enter URL:')
    if (url) {
      editorRef.current?.focus()
      document.execCommand('createLink', false, url)
      setTimeout(() => {
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML)
        }
      }, 10)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { divider: true },
    { icon: Heading2, command: 'formatBlock', value: 'h2', title: 'Heading 2' },
    { icon: Heading3, command: 'formatBlock', value: 'h3', title: 'Heading 3' },
    { divider: true },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
    { divider: true },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { divider: true },
    { icon: Link, command: 'link', title: 'Insert Link' },
    { divider: true },
    { icon: Undo, command: 'undo', title: 'Undo' },
    { icon: Redo, command: 'redo', title: 'Redo' },
  ]

  return (
    <div style={{
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'white'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        {toolbarButtons.map((button, index) => {
          if (button.divider) {
            return (
              <div
                key={index}
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#e5e7eb',
                  margin: '0 4px'
                }}
              />
            )
          }

          const IconComponent = button.icon as React.ComponentType<any>
          return (
            <button
              key={index}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                if (button.command === 'link') {
                  insertLink(e)
                } else {
                  formatText(e, button.command || '', button.value || '')
                }
              }}
              title={button.title}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <IconComponent style={{ height: '16px', width: '16px', color: '#374151' }} />
            </button>
          )
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="rich-text-editor"
        onInput={(e) => {
          const target = e.target as HTMLDivElement
          onChange(target.innerHTML)
        }}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        style={{
          minHeight: '200px',
          padding: '16px',
          outline: 'none',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#111827',
          position: 'relative',
          textAlign: 'left',
          direction: 'ltr',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
        onFocus={(e) => {
          e.currentTarget.style.backgroundColor = '#fafafa'
          setIsEditorFocused(true)
        }}
        onBlur={(e) => {
          e.currentTarget.style.backgroundColor = 'white'
          setIsEditorFocused(false)
        }}
        suppressContentEditableWarning={true}
      />

    </div>
  )
}