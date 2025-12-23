'use client';

import { CodeBlock } from './CodeBlock';

export function InstallStep({ step, title, code }: { step: string; title: string; code: string }) {
  return (
    <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300'>
      <div className='flex items-start gap-4'>
        <div className='flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg'>
          {step}
        </div>
        <div className='flex-1'>
          <h3 className='text-xl font-bold text-white mb-3'>{title}</h3>
          <CodeBlock
            code={code}
            language={code.includes('import') || code.includes('function') ? 'typescript' : 'bash'}
            showCopy={true}
          />
        </div>
      </div>
    </div>
  );
}
