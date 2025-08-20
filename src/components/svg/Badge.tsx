interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const Badge = ({ color, size = 25, className }: Props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 8.75C4.05109 8.75 3.86032 8.82902 3.71967 8.96967C3.57902 9.11032 3.5 9.30109 3.5 9.5V19.625C3.5 21.043 4.707 22.25 6.125 22.25H18.875C20.293 22.25 21.5 21.101 21.5 19.684V9.5C21.5 9.30109 21.421 9.11032 21.2803 8.96967C21.1397 8.82902 20.9489 8.75 20.75 8.75H4.25Z"
        stroke={color}
      />
      <path
        d="M8 8.75V7.25C8 6.05653 8.47411 4.91193 9.31802 4.06802C10.1619 3.22411 11.3065 2.75 12.5 2.75C13.6935 2.75 14.8381 3.22411 15.682 4.06802C16.5259 4.91193 17 6.05653 17 7.25V8.75"
        stroke={color}
      />
    </svg>
  );
};
