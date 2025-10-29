import React from 'react';

export const MicrophoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12.75V18.75m0 0A3.375 3.375 0 0015.375 12a3.375 3.375 0 00-6.75 0 3.375 3.375 0 003.375 6.75z"
    />
  </svg>
);
