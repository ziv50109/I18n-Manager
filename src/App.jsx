import {
  BrowserRouter,
  useRoutes,
} from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { routes } from '@/lib';
import { AuthProvider, DatabaseProvider } from '@/store';

const RouterElement = () => {
  const element = useRoutes(routes);

  return element;
};

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <DatabaseProvider>
            <ChakraProvider>
              <CSSReset />
              <RouterElement />
            </ChakraProvider>
          </DatabaseProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App
