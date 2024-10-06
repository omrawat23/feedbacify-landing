'use client'

import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  )
}

export default function Page({ params }: { params: { projectId: string } }) {
  const widgetUrl = process.env.NEXT_PUBLIC_WIDGET_URL || 'https://feedbacify-widget.vercel.app'
  const [embedType, setEmbedType] = useState<'html' | 'react'>('html')
  
  const htmlEmbedCode = `<my-widget project-id="${params.projectId}"></my-widget>\n<script src="${widgetUrl}/widget.umd.js"></script>`
  
  const reactEmbedCode = `import React, { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id': string;
      };
    }
  }
}

export default function MyWidget() {
  const widgetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '${widgetUrl}/widget.umd.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <my-widget ref={widgetRef} project-id="${params.projectId}"></my-widget>
}
`

  const embedCode = embedType === 'html' ? htmlEmbedCode : reactEmbedCode

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Start Collecting Feedback</h1>
      <p className="text-lg text-gray-600 mb-6">Embed the code in your site to start gathering valuable insights.</p>
      
      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => setEmbedType('html')}
          variant={embedType === 'html' ? 'default' : 'outline'}
        >
          HTML
        </Button>
        <Button
          onClick={() => setEmbedType('react')}
          variant={embedType === 'react' ? 'default' : 'outline'}
        >
          React/Next.js
        </Button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg relative">
        <pre className="text-gray-800 text-sm overflow-x-auto">
          <code>{embedCode}</code>
        </pre>
        <CopyBtn text={embedCode} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Instructions:</h2>
        {embedType === 'html' ? (
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Copy the HTML code above.</li>
            <li>Paste it into your website's HTML, just before the closing &lt;/body&gt; tag.</li>
            <li>The feedback widget will automatically appear on your site.</li>
          </ol>
        ) : (
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Copy the React component code above.</li>
            <li>Create a new file in your React/Next.js project (e.g., MyWidget.tsx).</li>
            <li>Paste the copied code into this new file.</li>
            <li>Import and use the MyWidget component in your desired location (e.g., layout.tsx)</li>
            <li className="ml-8">
              <code className="bg-gray-200 p-1 rounded">
                import MyWidget from './MyWidget'
              </code>
            </li>
            <li className="ml-8">
              <code className="bg-gray-200 p-1 rounded">
                {'<MyWidget />'}
              </code>
            </li>
          </ol>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-800">
          <strong>Note:</strong>{' '}
          {embedType === 'html' ? (
            "Make sure to test the widget on your site to ensure it's working correctly. If you encounter any issues, please check your console for errors or contact support."
          ) : (
            "This code includes TypeScript declarations for the custom element. If you're using JavaScript, you can remove the 'declare global' block. The widget script is loaded dynamically to avoid issues with server-side rendering. If you encounter any problems, check your browser console for errors or contact our support team."
          )}
        </p>
      </div>
    </div>
  )
}