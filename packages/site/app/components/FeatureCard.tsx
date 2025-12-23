'use client';

export function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className='group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer'>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      ></div>
      <div className='relative'>
        <div className='text-6xl mb-4'>{icon}</div>
        <h3 className='text-2xl font-bold text-white mb-3'>{title}</h3>
        <p className='text-gray-300 leading-relaxed'>{description}</p>
      </div>
    </div>
  );
}
