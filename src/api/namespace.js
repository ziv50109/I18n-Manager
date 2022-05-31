import {
  ref,
  child,
  push,
  update,
} from 'firebase/database';
import { database } from '@/lib';

const noop = () => {};

export const updateNamespace = async (callback = noop) => {
  // console.log(auth)
  // try {
  //   const updates = {};
  //   updates['/posts/' + newPostKey] = postData;
  //   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  //   await update(ref(db), updates);
  //   callback();
  // } catch (error) {
  //   console.log(error);
  // }
};