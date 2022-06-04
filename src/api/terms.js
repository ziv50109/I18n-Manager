import {
  ref,
  update,
} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '@/lib/firebase';

export const setTerm = async ({ termId, newTerm }) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  try {
    const updates = {};
    updates[`${userId}/keys/${termId}`] = newTerm;

    await update(ref(database), updates);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const setTranslate = async ({ termId, lang, newTerm }) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  try {
    const updates = {};
    updates[`${userId}/translates/${termId}/${lang}`] = newTerm;

    await update(ref(database), updates);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, error };
  }
};
