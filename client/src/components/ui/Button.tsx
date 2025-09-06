// client/src/components/ui/Button.tsx

import React from 'react';

type ButtonProps = React.ComponentProps<'button'>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;