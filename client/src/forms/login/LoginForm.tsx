import Button from '@/components/common/button/Button';
import TextInput from '@/components/common/textinput/TextInput';
import { APP_LINKS } from '@/routes/routeLinks';
import { useLoginMutation } from '@/services/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/forms/login/Login.schema';
import { encryptData } from '@utils/functions';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
    mode: 'all'
  });
  const {
    handleSubmit,
    formState: { isValid }
  } = methods;
  const [login, { isLoading }] = useLoginMutation();
  const submitData = async (Data: FormData) => {
    try {
      await login(Data);
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExNTQ5NzA3LCJpYXQiOjE3MTE1MjYyMTcsImp0aSI6IjYyNDE4NTk1YzFjZDQxNTI4ZDE5ZmRkZjE0Y2ExZjhiIiwidXNlcl9pZCI6MX0.XgipGjelgOoGJVllVM3WaLmyi5nUjHhKGrSNajb4EdI';
      const refreshToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMjc1NTcwNywiaWF0IjoxNzExNTQ2MTA3LCJqdGkiOiI4OTVkZDMxYzI5YmI0MTI0OTcyMzk1ZTI4M2ZmOWZiNyIsInVzZXJfaWQiOjF9.N8i0knckFwTqqTCfj8dIyTMl0wwdAsT42TDkmEPJDck';
      const tokens = {
        refresh: refreshToken,
        access: accessToken
      };
      // Store tokens in local storage
      localStorage.setItem('tokens', encryptData(JSON.stringify(tokens)));
      setIsLoggedIn(true);
    } catch (error) {
      console.error('An error occurred during login', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate(`${APP_LINKS.DASHBOARD.PATH}`, { replace: true });
      }, 1000);
    }
  }, [isLoggedIn]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitData)}>
          <Stack justify="center" mb="md">
            {/* Email input field */}
            <TextInput name="email" type="email" placeholder="Enter Email here" size="md" withAsterisk />

            {/* Password input field */}
            <TextInput name="password" type="password" placeholder="Enter Password here" size="md" withAsterisk />

            {/* Login Button */}
            <Button
              fullWidth
              loading={isLoading}
              size="md"
              type="submit"
              variant="filled"
              disabled={!isValid}
              text="Login"
              bg="cyan.5"
              c="white"
            />
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
