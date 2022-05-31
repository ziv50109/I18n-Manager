import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/store/AuthContext';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib';

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

  const initialValue = { ...dataset };

  return (
    <DatabaseContext.Provider value={initialValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
