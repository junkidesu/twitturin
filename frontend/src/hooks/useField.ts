import { useState } from "react";

const useField = (type?: string, placeholder?: string, initialValue?: string) => {
  const [value, setValue] = useState(initialValue || "");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setValue(event.target.value);

  return { value, onChange, type, placeholder };
};

export default useField;
