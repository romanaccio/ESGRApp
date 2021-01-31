import React from 'react';

type ButtonTypes = 'submit' | 'button' | 'reset' | undefined;

export interface MyButtonInterface {
  text?: string;
  onClick?(): void;
  disabled?: boolean;
  type?: ButtonTypes;
  icon?: object;
  color?: string;
  children?: any;
}
// the content of the button can be passed as text, icon or children (or any combination)
const MyButton = ({
  text = '',
  onClick,
  disabled = false,
  type = 'submit',
  icon,
  color = 'indigo',
  children,
}: MyButtonInterface) => {
  let styling =
    ' text-white  font-bold text-xs px-2 py-1 rounded-full shadow outline-none focus:outline-none mr-1 mb-1';
  disabled
    ? (styling += ` bg-${color}-200 active:bg-${color}-300`)
    : (styling += ` bg-${color}-500 active:bg-${color}-600 hover:shadow-lg`);
  return (
    <button
      disabled={disabled}
      className={styling}
      type={type}
      onClick={onClick}
    >
      {icon}
      {text}
      {children}
    </button>
  );
};

export default MyButton;
