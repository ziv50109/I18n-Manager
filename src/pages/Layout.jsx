import { Outlet } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header, Footer } from '@/components';

export const Layout = () => {
  return (
    <Grid
      minH="100vh"
      templateRows="auto 1fr auto"
      templateColumns="100%"
    >
      <GridItem pos="sticky" top={0} zIndex={1}>
        <Header />
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
