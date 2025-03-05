import { useQueryStates, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs';

export type useQueryParamsProps = {
  default_password: string;
  default_chars: number;
  default_num: boolean;
  default_symb: boolean;
};

export function useQueryParams({ default_password, default_chars, default_num, default_symb }: useQueryParamsProps) {
  const [params, setParams] = useQueryStates(
    {
      pass: parseAsString.withDefault(default_password ?? ''),
      chars: parseAsInteger.withDefault(default_chars ?? 8),
      num: parseAsBoolean.withDefault(default_num ?? false),
      symb: parseAsBoolean.withDefault(default_symb ?? false),
    },
    { history: 'push' }
  );

  const { pass: password, chars: characters, num: hasNumber, symb: hasSymbols } = params;
  return { password, characters, hasNumber, hasSymbols, setParams };
}
