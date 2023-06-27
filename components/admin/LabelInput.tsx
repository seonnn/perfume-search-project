import React from 'react';

interface LabelInputProps {
  label: string;
  perfumeName: string;
  setPerfumeName: React.Dispatch<React.SetStateAction<string>>;
}

function LabelInput({ label, perfumeName, setPerfumeName }: LabelInputProps) {
  return (
    <React.Fragment>
      <label className="flex w-24 shrink-0">{label}:</label>
      <input
        className="flex grow border-1 border-stone-300 p-3"
        value={perfumeName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPerfumeName(event.target.value)}
      />
    </React.Fragment>
  );
}

export default LabelInput;
