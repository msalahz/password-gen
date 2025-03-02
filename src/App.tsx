import CopyIcon from '/images/copy.png';

function App() {
  return (
    <main className="flex h-dvh items-center justify-center bg-black p-4 text-white">
      <div className="">
        <h1 className="border-b-2 border-b-blue-500 text-center text-2xl font-bold uppercase">
          Generate Password
        </h1>

        <div className="my-4 flex items-center gap-2">
          <input
            readOnly
            type="text"
            placeholder="Password"
            className="w-full border-2 border-white p-2"
          />

          <button className="cursor-pointer p-1" title="Copy">
            <img src={CopyIcon} alt="Copy" className="h-10 w-12" />
          </button>
        </div>

        <hr />

        <div className="my-4 grid w-full grid-cols-[1fr_auto] gap-2">
          <label
            id="characters"
            htmlFor="characters"
            className="flex grid-cols-1 items-center gap-2"
          >
            Characters
            <input type="range" name="characters" />
          </label>

          <input
            value={99}
            type="text"
            name="characters-count"
            className="w-10 border-2 border-white p-2"
          />
        </div>

        <div className="my-4 w-full">
          <label
            htmlFor="numbers"
            className="flex items-center justify-between gap-2"
          >
            Numbers
            <input type="checkbox" name="numbers" id="numbers" />
          </label>
        </div>

        <div className="my-4 w-full">
          <label
            htmlFor="symbols"
            className="flex items-center justify-between gap-2"
          >
            Symbols
            <input type="checkbox" name="symbols" id="symbols" />
          </label>
        </div>
      </div>
    </main>
  );
}

export default App;
