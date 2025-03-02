import { toast } from 'react-hot-toast';
import { useQueryStates, parseAsInteger, parseAsBoolean, parseAsString } from 'nuqs';

import RangeWithInput from './range-with-input';
import IconsCopy from '../assets/icons/icon-copy';
import IconRerun from '../assets/icons/icon-rerun';
import generatePassword from '../utils/generate-password';

const MIN_CHARACTERS = 8;
const MAX_CHARACTERS = 32;

export default function GenerateForm() {
  const [params, setParams] = useQueryStates(
    {
      pass: parseAsString.withDefault(generatePassword()),
      chars: parseAsInteger.withDefault(MIN_CHARACTERS),
      num: parseAsBoolean.withDefault(false),
      symb: parseAsBoolean.withDefault(false),
    },
    {
      history: 'push',
    }
  );

  const { pass: password, chars: characters, num: hasNumber, symb: hasSymbols } = params;

  function updatePassword() {
    setParams({
      pass: generatePassword({
        characters,
        hasNumber,
        hasSymbols,
      }),
    });
  }

  return (
    <form className="border-1 w-1/3 rounded-md border-gray-700 bg-black/30 p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          title="Rerun"
          className="w-10 cursor-pointer rounded-sm p-1 ring hover:ring-2"
          onClick={() => updatePassword()}
        >
          <IconRerun className="h-full w-full bg-transparent" />
        </button>

        <button
          type="button"
          title="Copy"
          className="w-10 cursor-pointer rounded-sm p-1 ring hover:ring-2"
          onClick={() => {
            toast.promise(navigator.clipboard.writeText(password), {
              loading: 'Copying...',
              success: <b>Password copied to clipboard!</b>,
              error: <b>Could not copy.</b>,
            });
          }}
        >
          <IconsCopy className="bg-transparen h-full w-full" />
        </button>
      </div>

      <hr className="border-gray-400" />

      <div className="my-4">
        <input
          readOnly
          type="text"
          value={password}
          className="border-1 w-full rounded-sm border-gray-300 p-2 outline-0"
        />
      </div>

      <hr className="border-gray-400" />

      <div className="my-4 grid w-full grid-cols-[1fr_auto] gap-2">
        <RangeWithInput
          label="Characters"
          characters={characters}
          minCharacters={MIN_CHARACTERS}
          maxCharacters={MAX_CHARACTERS}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setParams({ chars: e.currentTarget.valueAsNumber });
            updatePassword();
          }}
        />
      </div>

      <div className="my-4 w-full">
        <label htmlFor="numbers" className="flex items-center justify-between gap-2">
          Numbers
          <input
            id="numbers"
            name="numbers"
            type="checkbox"
            checked={hasNumber}
            className="accent-gray-400"
            onChange={e => {
              setParams({ num: e.currentTarget.checked });
              updatePassword();
            }}
          />
        </label>
      </div>

      <div className="my-4 w-full">
        <label htmlFor="symbols" className="flex items-center justify-between gap-2">
          Symbols
          <input
            id="symbols"
            name="symbols"
            type="checkbox"
            checked={hasSymbols}
            className="accent-gray-400"
            onChange={e => {
              setParams({ symb: e.currentTarget.checked });
              updatePassword();
            }}
          />
        </label>
      </div>
    </form>
  );
}
