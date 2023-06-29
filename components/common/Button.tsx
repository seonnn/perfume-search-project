import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: 'normal' | 'large';
  design?: 'basic' | 'white';
}

const buttonSize = {
  normal: 'px-8 py-2',
  large: 'px-8 py-3 text-xl',
};

const buttonDesign = {
  basic: 'text-white bg-beige-400 border-beige-400',
  white: 'text-beige-500 bg-white border-beige-500',
};

function Button({ text, size = 'normal', design = 'basic', ...props }: ButtonProps) {
  return (
    <button
      className={`font-bold rounded  border-1 ${buttonSize[size]} ${buttonDesign[design]}`}
      type={props.type}
      onClick={props.onClick}
    >
      {text}
    </button>
  );
}

export default Button;
