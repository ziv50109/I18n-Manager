import {
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebase';

export const AuthContext = createContext({});

const noop = () => {};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setIsLoading(true);

      if (_user) {
        setUser(_user);
      } else {
        setUser({});
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signin = (newUser, callback = noop) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback = noop) => {
    setUser({});
    callback();
  };

  const defaultValue = useMemo(() => ({
    user,
    isLoading,
    signin,
    signout,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
