import React from 'react';

type StarProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
};

const Star: React.FC<StarProps> = ({
  width = 21,
  height = 21,
  color = '#9CA3AF',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.3938 0.984375L12.8227 8.45988H20.6829L14.3239 13.08L16.7528 20.5555L10.3938 15.9354L4.03474 20.5555L6.46368 13.08L0.104637 8.45988H7.96485L10.3938 0.984375Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
