'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  title,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'nord',
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showHeader = Boolean(title) || showCopy;
  const wrapperClassName = showHeader
    ? 'rounded-xl overflow-hidden shadow-xl border border-gray-700 bg-gray-900'
    : 'rounded-xl overflow-hidden bg-transparent';

  return (
    <div className={wrapperClassName}>
      {showHeader && (
        <div className='flex items-center justify-between bg-gray-800 px-6 py-4 border-b border-gray-700'>
          <p className='text-sm font-semibold text-gray-300'>{title || language}</p>
          {showCopy && (
            <button
              onClick={handleCopy}
              className='px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded font-semibold transition-colors duration-200'
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      {isLoading ? (
        <pre className='p-6 overflow-x-auto text-sm text-gray-100 font-mono leading-relaxed'>
          <code>Loading...</code>
        </pre>
      ) : (
        <div
          className='p-6 overflow-x-auto text-sm font-mono leading-relaxed shiki-highlight'
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
    </div>
  );
}
