interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const ArrowDown = ({ className, size = 14, color }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 7 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1L6 7L1 13"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
