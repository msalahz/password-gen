import randomString from '../utils/random-string';

export type RangeWithInput = {
  label: string;
  characters: number;
  minCharacters: number;
  maxCharacters: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RangeWithInput(props: RangeWithInput) {
  const prefix = randomString(8);
  const { label, characters, minCharacters, maxCharacters, onChange } = props;

  return (
    <>
      <label
        id={`${prefix}-label`}
        htmlFor={`${prefix}-input`}
        className="flex grid-cols-1 items-center gap-2"
      >
        {label ?? ''}

        <input
          type="range"
          className="w-full"
          name={`${prefix}-input`}
          value={characters}
          min={minCharacters}
          max={maxCharacters}
          onChange={onChange}
        />
      </label>

      <input
        readOnly
        type="number"
        name="characters-count"
        value={characters}
        min={minCharacters}
        max={maxCharacters}
        className="w-10 appearance-none border-2 border-white p-2 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </>
  );
}
