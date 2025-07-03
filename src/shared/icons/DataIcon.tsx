import { SVGProps } from 'react';

const DataIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="29"
    height="34"
    viewBox="0 0 29 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="1"
      y="17.0127"
      width="7"
      height="15"
      rx="3"
      stroke="currentColor"
      strokeWidth={2}
    />
    <rect
      x="11"
      y="1.0127"
      width="7"
      height="31"
      rx="3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <rect
      x="21"
      y="9.0127"
      width="7"
      height="23"
      rx="3"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
);

export default DataIcon;
