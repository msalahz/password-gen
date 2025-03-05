import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { generatePassword } from '@/lib/generate-password';
import { useQueryParams } from '@/hooks/use-query-params';
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export function GenFrom({ className, ...props }: React.ComponentProps<'div'>) {
  const { password, characters, hasNumber, hasSymbols, setParams } = useQueryParams({
    default_password: generatePassword(),
    default_chars: MIN_CHARACTERS,
    default_num: false,
    default_symb: false,
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Create a new password</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-[auto_1fr_auto] gap-5">
                  <Label htmlFor="characters">Characters</Label>
                  <Slider
                    id="characters"
                    min={MIN_CHARACTERS}
                    max={MAX_CHARACTERS}
                    value={[characters]}
                    onValueChange={([value]) => {
                      setParams({
                        chars: value,
                        pass: generatePassword({ characters: value, hasNumber, hasSymbols }),
                      });
                    }}
                  />
                  <Input id="characters-input" type="input" className="w-11" readOnly value={characters} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers">Numbers</Label>
                  <Switch
                    id="numbers"
                    checked={hasNumber}
                    onCheckedChange={checked =>
                      setParams({
                        num: checked,
                        pass: generatePassword({ characters, hasNumber: checked, hasSymbols }),
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols">Symbols</Label>
                  <Switch
                    id="symbols"
                    checked={hasSymbols}
                    onCheckedChange={checked =>
                      setParams({
                        symb: checked,
                        pass: generatePassword({ characters, hasNumber, hasSymbols: checked }),
                      })
                    }
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="input" readOnly value={password} className="text-center" />{' '}
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() =>
              setParams({
                pass: generatePassword({ characters, hasNumber, hasSymbols }),
              })
            }
          >
            <RotateCw /> Refresh
          </Button>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(password);
              toast('Password copied to clipboard');
            }}
          >
            <Copy /> Copy
          </Button>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs">
        By Mohammed Zaghloul <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
