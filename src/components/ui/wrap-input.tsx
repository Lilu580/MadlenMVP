interface Props {
  children: React.ReactNode;
  error?: string;
  title?: string;
}

export const WrapInput = ({ title, error, children }: Props) => {
  return (
    <div className={"flex flex-col gap-2 w-full flex-1"}>
      {title && <p className={"text-r-1 text-gray-project-90"}>{title}</p>}
      {children}
      {error && <p className={"text-r-4 text-red-project-50"}>{error}</p>}
    </div>
  );
};
