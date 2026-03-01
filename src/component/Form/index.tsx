import React, { useState } from "react";
import type { z, ZodObject, ZodRawShape } from "zod";

interface IFormProps<TSchema extends ZodObject<ZodRawShape>> extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  children: React.ReactNode;
  label?: string;
  labelClass?: string;
  validationSchema?: TSchema;
  onSubmit?: (data: z.infer<TSchema>) => void;
}

export const Form = <TSchema extends ZodObject<ZodRawShape>>({
  children,
  className = "space-y-4 p-6",
  ...props
}: IFormProps<TSchema>) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof z.infer<TSchema>, string>>
  >({});

  const handleForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());
    const data: Record<string, any> = {}; 
    console.log('data',data)
    Object.keys(rawData).forEach((key) => {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      if (input?.type === "number") {
        data[key] = rawData[key] === "" ? undefined : Number(rawData[key]);
      } else {
        data[key] = rawData[key];
      }
    });
    if(!props.validationSchema) return;
    const result = props.validationSchema.safeParse(data);

    if (result.success) {
      setErrors({});
      props.onSubmit?.(result.data);
    } else {
      const formatted = result.error.flatten();
      const fieldErrors: Partial<Record<keyof z.infer<TSchema>, string>> = {};

      Object.entries(formatted.fieldErrors).forEach(([key, value]) => {
        if (value?.[0]) {
          fieldErrors[key as keyof z.infer<TSchema>] = value[0];
        }
      });

      setErrors(fieldErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow">
      <label className={`text-2xl ${props.labelClass}`}>{props.label}</label>
      <form className={`${className}`} onSubmit={handleForm}>
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            error: errors[child.props.name as keyof z.infer<TSchema>],
          }),
        )}
      </form>
    </div>
  );
};
