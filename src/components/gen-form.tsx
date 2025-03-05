import { toast } from 'sonner';
import { Copy, RotateCw } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { generatePassword } from '@/lib/generate-password';
import { MAX_CHARACTERS, MIN_CHARACTERS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export function GenFrom({ className, ...props }: React.ComponentProps<'div'>) {
  const search = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const { password, characters, hasNumbers, hasSymbols } = search;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Create a new password</CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-[auto_1fr_auto] gap-5">
                  <Label>Characters</Label>
                  <Slider
                    name="characters"
                    min={MIN_CHARACTERS}
                    max={MAX_CHARACTERS}
                    value={[characters]}
                    onValueChange={async ([value]) => {
                      await navigate({
                        search: {
                          characters: value,
                          password: generatePassword({ characters: value, hasNumbers, hasSymbols }),
                          hasNumbers,
                          hasSymbols,
                        },
                      });
                    }}
                  />
                  <Input id="characters-input" type="input" className="w-11" readOnly value={characters} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers">Numbers</Label>
                  <Switch
                    id="numbers"
                    checked={hasNumbers}
                    onCheckedChange={async checked => {
                      await navigate({
                        search: {
                          hasNumbers: checked,
                          password: generatePassword({ characters, hasNumbers: checked, hasSymbols }),
                          characters,
                          hasSymbols,
                        },
                      });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols">Symbols</Label>
                  <Switch
                    id="symbols"
                    checked={hasSymbols}
                    onCheckedChange={async checked => {
                      await navigate({
                        search: {
                          hasSymbols: checked,
                          password: generatePassword({ characters, hasNumbers, hasSymbols: checked }),
                          characters,
                          hasNumbers,
                        },
                      });
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="input" readOnly value={password} className="text-center" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={async () =>
              await navigate({
                search: {
                  password: generatePassword({ characters, hasNumbers, hasSymbols }),
                  characters,
                  hasNumbers,
                  hasSymbols,
                },
              })
            }
          >
            <RotateCw /> Refresh
          </Button>

          <Button
            onClick={() => {
              toast.promise(navigator.clipboard.writeText(password), {
                loading: 'Copying password...',
                error: 'Failed to copy password',
                success: 'Password copied to clipboard',
              });
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
