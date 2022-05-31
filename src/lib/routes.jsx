import { values } from 'lodash';
import {
  Layout,
  Home,
 } from '@/pages';

export const features = {
  home: {
    index: true,
    path: '/',
    name: 'home',
    element: <Home />,
  },
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...values(features),
    ],
  },
];
