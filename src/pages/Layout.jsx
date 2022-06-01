import { useContext } from 'react';
import { AuthContext } from '@/store/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header, Footer } from '@/components';
import { signout as signoutAPI } from '@/api/auth';

export const Layout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignin = () => {
    navigate('/signin');
  };
  const onSignup = () => {
    navigate('/signup');
  };
  const onSignout = async () => {
    await signoutAPI();
    await auth.signout(onSignin);
  };

  if (auth.isLoading) return null;

  return (
    <Grid
      minH="100vh"
      templateRows="auto 1fr auto"
      templateColumns="100%"
      css={{
        '& *::-webkit-scrollbar': {
          width: 5,
        },
        '& *::-webkit-scrollbar-track': {
          backgroundColor: '#ced3db',
        },
        '& *::-webkit-scrollbar-thumb': {
          backgroundColor: '#718096',
        },
        '& *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#617086',
        },
      }}
    >
      <GridItem pos="sticky" top={0} zIndex={1}>
        <Header
          user={auth.user}
          onSignin={onSignin}
          onSignup={onSignup}
          onSignout={onSignout}
        />
      </GridItem>

      <GridItem display="grid" rowEnd="auto">
        <Outlet />
      </GridItem>

      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
};
