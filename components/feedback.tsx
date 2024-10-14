// MyWidget.tsx
'use client'

import React, { useEffect, useRef } from 'react'

// Define the custom element props
interface MyWidgetElementProps extends React.HTMLAttributes<HTMLElement> {
  'project-id': string;
}

// Extend JSX.IntrinsicElements to include our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-widget': React.DetailedHTMLProps<MyWidgetElementProps, HTMLElement>;
    }
  }
}

export default function MyWidget() {
  const widgetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://feedbacify-widget.vercel.app/widget.umd.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <my-widget ref={widgetRef} project-id="4"></my-widget>
    </div>
  )
}