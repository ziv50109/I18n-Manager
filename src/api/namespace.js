import {
  ref,
  child,
  get,
  update,
} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '@/lib/firebase';
import { difference, clone, isEmpty } from 'lodash';

export const removeNamespace = async ({ namespace, termIds }) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const dbRef = ref(database);

  const dbNamespace = await get(child(dbRef, `${userId}/namespaces/${namespace}`));

  const newNamespace = difference(dbNamespace.val(), termIds);
  const formatted = isEmpty(newNamespace) ? '' : newNamespace;
  try {
    const updates = {};
    updates[`${userId}/namespaces/${namespace}`] = formatted;

    await update(ref(database), updates);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const updateNamespaces = async ({ append, remove, termId }) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const dbRef = ref(database);

  const dbNamespaces = await get(child(dbRef, `${userId}/namespaces`));

  const newNamespaces = clone(dbNamespaces.val());
  append.forEach((item) => {
    if (isEmpty(newNamespaces[item])) newNamespaces[item] = [];
    newNamespaces[item].push(termId);
  });
  remove.forEach((item) => {
    const newNamespace = newNamespaces[item].filter((id) => id !== termId);
    const formatted = isEmpty(newNamespace) ? '' : newNamespace;
    newNamespaces[item] = formatted;
  });

  try {
    const updates = {};
    updates[`${userId}/namespaces`] = newNamespaces;

    await update(ref(database), updates);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, error };
  }
};
