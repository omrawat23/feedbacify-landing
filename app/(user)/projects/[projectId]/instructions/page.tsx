'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

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
  const widgetUrl = process.env.NEXT_PUBLIC_WIDGET_URL || 'https://feedbacify-widget.vercel.app/'
  
  // Widget embed code
  const embedCode = `<my-widget project-id="${params.projectId}"></my-widget>\n<script src="${widgetUrl}/widget.umd.js"></script>`
  
  // Styled iFrame embed code
  // const iframeCode = `<iframe src="${widgetUrl}/embed?projectId=${params.projectId}" width="100%" style="height: 100%; min-height: 700px" frameborder="0"></iframe>`

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Start Collecting Feedback</h1>
      <p className="text-lg text-gray-600 mb-6">Embed the code in your site to start gathering valuable insights.</p>
      
      {/* Widget Embed Code Section */}
      <div className="bg-gray-100 p-6 rounded-lg relative">
        <pre className="text-gray-800 text-sm overflow-x-auto">
          <code>{embedCode}</code>
        </pre>
        <CopyBtn text={embedCode} />
      </div>

      {/* Styled iFrame Embed Code Section */}
      {/* <div className="bg-gray-100 p-6 rounded-lg relative mt-8">
        <pre className="text-gray-800 text-sm overflow-x-auto">
          <code>{iframeCode}</code>
        </pre>
        <CopyBtn text={iframeCode} />
      </div> */}

      {/* Instructions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Instructions:</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Copy the code above (either the widget code or iframe).</li>
          <li>Paste it into your website&apos;s HTML, just before the closing &lt;/body&gt; tag.</li>
          <li>The feedback widget will automatically appear on your site.</li>
        </ol>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-800">
          <strong>Note:</strong> Make sure to test the widget on your site to ensure it&apos;s working correctly.
          If you encounter any issues, please check your console for errors or contact support.
        </p>
      </div>
    </div>
  )
}
