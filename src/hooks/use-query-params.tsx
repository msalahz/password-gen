import { useQueryStates, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs';

export type useQueryParamsProps = {
  default_password: string;
  default_chars: number;
  default_num: boolean;
  default_symbol: boolean;
};

export function useQueryParams({ default_password, default_chars, default_num, default_symbol }: useQueryParamsProps) {
  const [params, setParams] = useQueryStates(
    {
      pass: parseAsString.withDefault(default_password ?? ''),
      chars: parseAsInteger.withDefault(default_chars ?? 8),
      num: parseAsBoolean.withDefault(default_num ?? false),
      symbol: parseAsBoolean.withDefault(default_symbol ?? false),
    },
    { history: 'push' }
  );

  const { pass: password, chars: characters, num: hasNumber, symbol: hasSymbols } = params;
  return { password, characters, hasNumber, hasSymbols, setParams };
}
