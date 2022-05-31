import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const noop = () => {};

export const signinWithEmail = async (email, password) => {
  const auth = getAuth();
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const { user } = userCredential;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const signout = async (callback = noop) => {
  const auth = getAuth();
  try {
    await signOut(auth);

    callback();
  } catch (error) {
    console.log(error);
  }
};
