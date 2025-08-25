import type { FieldError } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export const Input = ({ label, error, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium">{label}</label>
    <input
      {...props}
      className={`border rounded p-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
