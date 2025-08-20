interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const ArrowRight = ({ className, size = 20, color }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 10L19 10M19 10L10.5 18.5M19 10L10.5 1.5"
        stroke={color}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
