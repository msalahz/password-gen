import { useQueryStates, parseAsInteger, parseAsBoolean, parseAsString } from 'nuqs';
import IconRerun from '../assets/icons/icon-rerun';
import TextWithCopy from './text-with-copy';
import generatePassword from '../utils/generate-password';
import RangeWithInput from './range-with-input';

const MIN_CHARACTERS = 8;
const MAX_CHARACTERS = 32;

export default function GeneratePassword() {
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

  return (
    <main className="flex h-dvh items-center justify-center bg-black p-4 text-white">
      <div className="w-1/3">
        <h1 className="border-b-2 border-b-blue-500 text-center text-2xl font-bold uppercase">Generate Password</h1>

        <div className="my-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <button
            title="Rerun"
            className="w-10 cursor-pointer rounded-sm p-1 ring ring-blue-300 hover:ring-2"
            onClick={() => {
              setParams({
                pass: generatePassword({
                  characters,
                  hasNumber,
                  hasSymbols,
                }),
              });
            }}
          >
            <IconRerun className="h-full w-full bg-transparent stroke-blue-300" />
          </button>

          <TextWithCopy value={password} />
        </div>

        <hr />

        <div className="my-4 grid w-full grid-cols-[1fr_auto] gap-2">
          <RangeWithInput
            label="Characters"
            characters={characters}
            minCharacters={MIN_CHARACTERS}
            maxCharacters={MAX_CHARACTERS}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setParams({
                chars: e.currentTarget.valueAsNumber,
                pass: generatePassword({
                  characters: e.currentTarget.valueAsNumber,
                  hasNumber: true,
                  hasSymbols: true,
                }),
              });
            }}
          />
        </div>

        <div className="my-4 w-full">
          <label htmlFor="numbers" className="flex items-center justify-between gap-2">
            Numbers
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={hasNumber}
              onChange={e => {
                setParams({
                  num: e.currentTarget.checked,
                  pass: generatePassword({
                    characters,
                    hasNumber: e.currentTarget.checked,
                    hasSymbols,
                  }),
                });
              }}
            />
          </label>
        </div>

        <div className="my-4 w-full">
          <label htmlFor="symbols" className="flex items-center justify-between gap-2">
            Symbols
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={hasSymbols}
              onChange={e => {
                setParams({
                  symb: e.currentTarget.checked,
                  pass: generatePassword({
                    characters,
                    hasNumber,
                    hasSymbols: e.currentTarget.checked,
                  }),
                });
              }}
            />
          </label>
        </div>
      </div>
    </main>
  );
}
