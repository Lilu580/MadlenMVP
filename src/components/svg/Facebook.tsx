interface Props {
  className?: string;
  size?: number;
  color?: string;
}

export const Facebook = ({ color, size = 16, className }: Props) => {
  return (
    <svg
      width={size?.toString()}
      height={size?.toString()}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.6666 8.00026C14.6666 4.31836 11.6818 1.33359 7.99992 1.33359C4.31802 1.33359 1.33325 4.31836 1.33325 8.00026C1.33325 11.3278 3.77116 14.0858 6.95825 14.5859V9.92734H5.26554V8.00026H6.95825V6.53151C6.95825 4.86068 7.95354 3.93776 9.47635 3.93776C10.2057 3.93776 10.9687 4.06797 10.9687 4.06797V5.70859H10.128C9.29985 5.70859 9.04158 6.22249 9.04158 6.7497V8.00026H10.8905L10.595 9.92734H9.04158V14.5859C12.2287 14.0858 14.6666 11.3278 14.6666 8.00026Z"
        stroke={color}
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
  );
};
