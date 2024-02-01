import React from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  accept: string[];
};

const FormFileInput = <T extends FieldValues>({
  control,
  name,
  label,
  accept,
}: Props<T>) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList === null || fileList.length === 0) return;
    onChange(fileList[0]);
  };

  return (
    <fieldset>
      <label htmlFor="file-input" className="file-input">
        {label}
      </label>

      <input
        id="file-input"
        type="file"
        accept={accept.join(", ")}
        value={value?.fileName}
        onBlur={onBlur}
        onChange={handleChange}
      />

      {error && <p className="error-message">{error.message}</p>}
    </fieldset>
  );
};

export default FormFileInput;
