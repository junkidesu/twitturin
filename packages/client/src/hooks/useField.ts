import { useState } from "react";

type ReturnType = [
  () => void,
  {
    value: string;
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => void;
    type?: string;
    placeholder?: string;
  }
];

const useField = (
  type?: string,
  placeholder?: string,
  initialValue?: string
): ReturnType => {
  const [value, setValue] = useState(initialValue || "");

  const clear = () => setValue("");

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setValue(event.target.value);

  return [clear, { value, onChange, type, placeholder }];
};

export default useField;
