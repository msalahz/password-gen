import IconsCopy from '../assets/icons/icon-copy';

export type TextWithCopy = {
  value: string;
};

export default function TextWithCopy(props: TextWithCopy) {
  return (
    <>
      <input
        readOnly
        type="text"
        value={props.value}
        className="border-1 rounded-sm border-white p-2 outline-0"
      />

      <button
        title="Copy"
        className="w-10 cursor-pointer rounded-sm p-1 ring ring-blue-300 hover:ring-2"
        onClick={() => navigator.clipboard.writeText(props.value)}
      >
        <IconsCopy className="h-full w-full bg-transparent stroke-blue-300" />
      </button>
    </>
  );
}
