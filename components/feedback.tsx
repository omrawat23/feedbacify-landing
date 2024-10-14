'use client'
import React, { useEffect, useRef } from 'react';

interface FeedbacifyWidgetProps {
  projectId: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id'?: string;
      };
    }
  }
}

export default function FeedbacifyWidget({ projectId }: FeedbacifyWidgetProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const widgetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://feedbacify-widget.vercel.app/widget.umd.js';
      script.async = true;
      script.onload = () => {
        console.log('Feedbacify widget script loaded successfully');
        if (widgetRef.current) {
          widgetRef.current.setAttribute('project-id', projectId);
        }
      };
      script.onerror = () => {
        console.error('Failed to load Feedbacify widget script');
      };
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [projectId]);

  return (
    <div className="feedbacify-widget-container">
      <my-widget ref={widgetRef} project-id={projectId}></my-widget>
    </div>
  );
}