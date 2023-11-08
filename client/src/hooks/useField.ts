import { useState } from "react";

const useField = (type?: string, placeholder?: string) => {
  const [value, setValue] = useState("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setValue(event.target.value);

  return { value, onChange, type, placeholder };
};

export default useField;
