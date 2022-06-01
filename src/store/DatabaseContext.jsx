import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '@/store/AuthContext';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

const defaultDataset = {
  keys: {},
  languages: [],
  namespaces: {},
  translates: {},
};

export const DatabaseContext = createContext(defaultDataset);

export const DatabaseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [dataset, setDataset] = useState(defaultDataset);

  useEffect(() => {
    if (user.uid) {
      const starCountRef = ref(database, user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setDataset(data);
      });
    }
  }, [user.uid]);

  const initialValue = useMemo(() => ({ ...dataset }), [dataset]);

  return (
    <DatabaseContext.Provider value={initialValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
DatabaseProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
