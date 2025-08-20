interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const Chevron = ({ className, size = 14, color }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 14 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 0.5L7 5.5L1 0.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
