import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { URLS } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { useNavigate, useSearch } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export type LoginFormInputs = {
  username: string;
  password: string;
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  // @ts-expect-error - Not sure how to fix this - maybe help here? => https://github.com/TanStack/router/issues/767
  const { reason } = useSearch({ strict: false });
  const navigate = useNavigate({ from: '/login' });

  const updateUserAuthHeaders = (username: string, password: string) => {
    axios.defaults.auth = {
      username,
      password
    };
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    Axios.post(URLS.LOGIN())
      .then(() => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: data.username,
            password: data.password
          })
        );

        updateUserAuthHeaders(data.username, data.password);

        navigate({ to: '/dashboard' });
      })
      .catch(error => {
        console.error(error);
        toast.error('Niepoprawny login lub hasło!');
      });
  };

  useEffect(() => {
    if (reason === 'session-expired') {
      toast.error('Twoja sesja wygasła. Zaloguj się ponownie.');
    } else if (reason === 'logged-out') {
      toast.info('Zostałeś wylogowany.');
    }
  }, [reason]);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logowanie</CardTitle>
          <CardDescription>
            Poniżej wprowadź swoją nazwę użytkownika, aby zalogować się do
            swojego konta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-2 mb-2">
                <Label htmlFor="username">Nazwa użytkownika</Label>
                <Input
                  id="username"
                  {...register('username', {
                    required: 'To pole jest wymagane!'
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2 mb-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'To pole jest wymagane!'
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full mb-2">
                Zaloguj
              </Button>
              <a href={axios.defaults.baseURL + URLS.GOOGLE_LOGIN()}>
                <Button type="button" variant="ghost" className="w-full">
                  Zaloguj się z Google
                </Button>
              </a>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
    </div>
  );
}
