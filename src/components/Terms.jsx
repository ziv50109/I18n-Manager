import { useContext } from 'react';
import { AuthContext } from '@/store';
import {
   VStack,
 } from '@chakra-ui/react';
import { Term } from '@/components';
import { updateNamespace } from '@/api';

export const Terms = ({
  terms = [],
}) => {
  const { user } = useContext(AuthContext);

  const onRemoveNamespace = (id) => (namespace) => {
    console.log('remove namespace:', user.uid, id, namespace)
  };

  return (
    <VStack my={8} spacing={6} align="stretch">
      {terms.map((term) => (
        <Term
          key={term.id}
          term={term}
          onRemoveNamespace={onRemoveNamespace(term.id)}
        />
      ))}
    </VStack>
  );
};
