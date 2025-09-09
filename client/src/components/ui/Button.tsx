// client/src/components/ui/Button.tsx

import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ComponentProps<'button'> & {
  className?: string;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 font-bold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;