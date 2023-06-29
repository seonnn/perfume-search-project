import React, { InputHTMLAttributes } from 'react';

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  state?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function LabelInput({ label, state, setState, ...props }: LabelInputProps) {
  return (
    <React.Fragment>
      <label className="flex w-24 shrink-0">{label}:</label>
      <input
        className="flex w-full grow border-1 border-stone-300 p-3 placeholder:text-stone-400"
        value={state}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setState(event.target.value)}
        placeholder={props.placeholder}
        type={props.type}
        required
      />
    </React.Fragment>
  );
}

export default LabelInput;
