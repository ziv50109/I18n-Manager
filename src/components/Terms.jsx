import { useContext } from 'react';
import { AuthContext } from '@/store';
import { difference } from 'lodash';
import {
   VStack,
 } from '@chakra-ui/react';
import { Term } from '@/components';
import { updateNamespace } from '@/api';

export const Terms = ({
  terms = [],
}) => {
  const { user } = useContext(AuthContext);

  const onUpdateTerm = (id) => (newTerm, currentTerm) => {
    console.log('update translate:', id, currentTerm, '->', newTerm)
  };
  const onUpdateTranslate = (id) => (lang, newValue, currentValue) => {
    console.log('update translate:', id, lang, currentValue, '->', newValue)
  };
  const onRemoveNamespace = (id) => (namespace) => {
    console.log('remove namespace:', user.uid, id, namespace)
  };
  const onUpdateNamespaces = (id) => (newNamespaces, currentNamespace) => {
    const append = difference(newNamespaces, currentNamespace);
    const remove = difference(currentNamespace, newNamespaces);
    console.log('update namespaces:', user.uid, id, 'append', append, 'remove', remove)
  };

  return (
    <VStack my={8} spacing={6} align="stretch">
      {terms.map((term) => (
        <Term
          key={term.id}
          term={term}
          onUpdateTerm={onUpdateTerm(term.id)}
          onUpdateTranslate={onUpdateTranslate(term.id)}
          onRemoveNamespace={onRemoveNamespace(term.id)}
          onUpdateNamespaces={onUpdateNamespaces(term.id)}
        />
      ))}
    </VStack>
  );
};
