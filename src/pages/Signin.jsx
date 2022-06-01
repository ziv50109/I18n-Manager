import { useContext } from 'react';
import { AuthContext } from '@/store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signinWithEmail } from '@/api/auth';
import { SigninForm } from '@/components/SigninForm';

export const Signin = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const onSubmit = async ({ email, password }) => {
    const user = await signinWithEmail(email, password);

    await auth.signin(user);
    navigate('/');
  };

  return (
    <SigninForm onSubmit={onSubmit} />
  );
};
