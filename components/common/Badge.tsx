import React from 'react';

interface BadgeProps {
  text?: string;
  mode: 'basic' | 'reverse';
}

function Badge({ text, mode = 'basic' }: BadgeProps) {
  return (
    <div
      className={`w-fit px-4 py-2 rounded-xl ${
        mode === 'basic' ? 'bg-beige-400 text-white' : 'text-beige-500 border-1 border-beige-500'
      }`}
    >
      {text}
    </div>
  );
}

export default Badge;
