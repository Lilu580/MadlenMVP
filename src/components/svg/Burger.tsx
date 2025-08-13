interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const Burger = ({ color, size = 24, className }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 8.5V7.5H20V8.5H3ZM20 12.5V13.5H3V12.5H20ZM3 17.5H20V18.5H3V17.5Z"
        fill={color}
      />
    </svg>
  );
};
