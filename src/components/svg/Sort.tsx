interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const Sort = ({ className, size = 25, color }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.5 7.5H19.5M7 12.5H17M10 17.5H14"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
