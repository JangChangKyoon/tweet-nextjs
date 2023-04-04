import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "price";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {kind === "text" ? (
        <div>
          <input id={name} required={required} {...register} type={type} />
        </div>
      ) : null}
    </div>
  );
}
