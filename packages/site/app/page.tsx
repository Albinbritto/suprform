'use client';

import { InstallStep } from './components/InstallStep';
import { FeatureCard } from './components/FeatureCard';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative text-white overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full blur-2xl animate-float'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32'>
          <div className='text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-sm font-medium mb-6 animate-pulse'>
              <span className='flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-400'></span>
              </span>
              ✨ Now Available on npm
            </div>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'>
              Build Forms with
              <br />
              <span className='bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse'>
                Any UI Framework
              </span>
            </h1>
            <p className='text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed'>
              TypeScript-first, composable, and design-system agnostic React form library. Zero UI
              dependencies.
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105'>
                <div className='text-4xl font-bold text-cyan-400 mb-2'>📦</div>
                <div className='text-gray-300 text-sm'>npm Package</div>
                <div className='text-lg font-bold text-white mt-1'>suprform</div>
              </div>
              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105'>
                <div className='text-4xl font-bold text-blue-400 mb-2'>⚡</div>
                <div className='text-gray-300 text-sm'>Bundle Size</div>
                <div className='text-lg font-bold text-white mt-1'>~15KB</div>
              </div>
              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105'>
                <div className='text-4xl font-bold text-emerald-400 mb-2'>📝</div>
                <div className='text-gray-300 text-sm'>License</div>
                <div className='text-lg font-bold text-white mt-1'>MIT</div>
              </div>
              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105'>
                <div className='text-4xl font-bold text-violet-400 mb-2'>⭐</div>
                <div className='text-gray-300 text-sm'>TypeScript</div>
                <div className='text-lg font-bold text-white mt-1'>100%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='relative py-24 bg-gradient-to-b from-transparent to-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
              Why Choose SuprForm?
            </h2>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
              A modern form library that adapts to your design system, not the other way around.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <FeatureCard
              icon='🎨'
              title='Design System Agnostic'
              description='Works with Material-UI, Ant Design, Tailwind, shadcn/ui, or plain HTML. You control the design.'
              gradient='from-cyan-400 via-blue-500 to-indigo-500'
            />
            <FeatureCard
              icon='🎯'
              title='Composable Components'
              description='SuprForm.Control wraps your inputs with automatic labels, errors, and validation—no configuration needed.'
              gradient='from-blue-400 via-indigo-500 to-purple-500'
            />
            <FeatureCard
              icon='🔒'
              title='TypeScript-First'
              description='Complete type safety with intelligent inference. Field names, validation rules, and values are fully typed.'
              gradient='from-indigo-400 via-purple-500 to-pink-500'
            />
            <FeatureCard
              icon='👁️'
              title='Conditional Visibility'
              description='Show/hide fields based on other field values with declarative AND/OR logic operators.'
              gradient='from-emerald-400 via-teal-500 to-cyan-500'
            />
            <FeatureCard
              icon='✅'
              title='Declarative Validation'
              description='Powered by react-hook-form with support for sync and async validators out of the box.'
              gradient='from-green-400 via-emerald-500 to-teal-500'
            />
            <FeatureCard
              icon='📦'
              title='Zero UI Dependencies'
              description='Only React as a peer dependency. No CSS framework lock-in, no component library coupling.'
              gradient='from-orange-400 via-red-500 to-pink-500'
            />
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className='py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
              Get Started in Minutes
            </h2>
            <p className='text-xl text-gray-300'>Install and start building forms right away</p>
          </div>

          <div className='space-y-6'>
            <InstallStep step='1' title='Install SuprForm' code='npm install suprform' />
            <InstallStep
              step='2'
              title='Import and Use'
              code={`import SuprForm from 'suprform';

<SuprForm onSubmit={(values) => console.log(values)}>
  <SuprForm.Control name='email' label='Email'>
    <input type='email' />
  </SuprForm.Control>
  <button type='submit'>Submit</button>
</SuprForm>`}
            />
            <InstallStep
              step='3'
              title='Add Validation'
              code={`import SuprForm from 'suprform';

<SuprForm.Control
  name='email'
  label='Email'
  rules={{
    required: 'Email is required',
    pattern: { value: /^\\S+@\\S+$/, message: 'Invalid email' }
  }}
>
  <input type='email' />
</SuprForm.Control>`}
            />
          </div>
        </div>
      </section>

      {/* GitHub README Section */}
      <section className='py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
          <h2 className='text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
            Full README for Developers
          </h2>
          <p className='text-lg text-gray-300'>
            Dive into the GitHub README for end-to-end integration steps, API reference, and
            advanced patterns built on react-hook-form.
          </p>
          <div className='flex justify-center'>
            <button
              onClick={() =>
                window.open('https://github.com/Albinbritto/suprform#readme', '_blank')
              }
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-400/40 transition-all duration-300 cursor-pointer border border-white/20'
            >
              <span className='text-lg'>📘</span>
              <span>Open GitHub README</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative py-20 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600'></div>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float delay-1000'></div>
        </div>
        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl sm:text-5xl font-bold mb-6'>Ready to Build Better Forms?</h2>
          <p className='text-xl text-blue-100 mb-10'>
            Join developers using SuprForm to create flexible, type-safe forms.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={() => window.open('https://www.npmjs.com/package/suprform', '_blank')}
              className='px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer'
            >
              View on npm →
            </button>
            <button
              onClick={() => window.open('https://github.com/Albinbritto/suprform', '_blank')}
              className='px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer'
            >
              GitHub Repository
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-gray-400 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-white font-bold text-lg mb-4'>SuprForm</h3>
              <p className='text-sm'>
                Headless React form library for building forms with any UI framework.
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-4'>Resources</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='https://www.npmjs.com/package/suprform'
                    className='hover:text-white transition-colors'
                  >
                    npm Package
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/Albinbritto/suprform'
                    className='hover:text-white transition-colors'
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href='#examples' className='hover:text-white transition-colors'>
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-4'>Legal</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='https://github.com/Albinbritto/suprform/blob/main/LICENSE'
                    className='hover:text-white transition-colors'
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-sm'>
            <p>© {new Date().getFullYear()} SuprForm. Built with ❤️ by Albin, for developers.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
