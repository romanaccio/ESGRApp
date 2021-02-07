import React from 'react';

type ButtonTypes = 'submit' | 'button' | 'reset' | undefined;

export enum MyButtonColor {
  indigo,
  red,
  gray,
}

export interface MyButtonInterface {
  text?: string;
  onClick?(): void;
  disabled?: boolean;
  type?: ButtonTypes;
  icon?: object;
  color?: MyButtonColor;
  children?: any;
}
// the content of the button can be passed as text, icon or children (or any combination)
const MyButton = ({
  text = '',
  onClick,
  disabled = false,
  type = 'submit',
  icon,
  color = MyButtonColor.indigo,
  children,
}: MyButtonInterface) => {
  // the following 3 lines are used to make sure tree shaking won't remove those Tailwind classes
  // eslint-disable-next-line
  const trickIndigo =
    'bg-indigo-100 active:bg-indigo-200 bg-indigo-300 active:bg-indigo-400';
  // eslint-disable-next-line
  const trickRed = 'bg-red-100 active:bg-red-200 bg-red-300 active:bg-red-400';
  // eslint-disable-next-line
  const trickGray =
    'bg-gray-100 active:bg-gray-200 bg-gray-300 active:bg-gray-400';

  let styling =
    ' text-white  font-bold text-xs px-2 py-1 rounded-full shadow outline-none focus:outline-none mr-1 mb-1';
  let styleColor = 'indigo';
  if (color === MyButtonColor.red) {
    styleColor = 'red';
  } else if (color === MyButtonColor.gray) styleColor = 'gray';
  disabled
    ? (styling += ` bg-${styleColor}-100 active:bg-${styleColor}-200`)
    : (styling += ` bg-${styleColor}-300 active:bg-${styleColor}-400 hover:shadow-lg`);
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
