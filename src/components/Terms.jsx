import PropTypes from 'prop-types';
import { difference, isEmpty } from 'lodash';
import {
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Term } from '@/components';
import {
  updateNamespaces,
  removeNamespace,
  setTerm,
  setTranslate,
} from '@/api';

export const Terms = ({
  terms,
}) => {
  const toast = useToast();

  const showToast = (response) => (
    response.isSuccess
      ? toast({
        title: 'Success!',
        status: 'success',
        variant: 'subtle',
        isClosable: true,
      })
      : toast({
        title: response.error.message,
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      })
  );

  const onUpdateTerm = (termId) => async (_newTerm, currentTerm) => {
    const newTerm = isEmpty(_newTerm) ? currentTerm : _newTerm;
    const res = await setTerm({ termId, newTerm });
    showToast(res);
  };
  const onUpdateTranslate = (termId) => async (lang, newTerm) => {
    const res = await setTranslate({ termId, lang, newTerm });
    showToast(res);
  };
  const onRemoveNamespace = (termId) => async (namespace) => {
    const res = await removeNamespace({ namespace, termIds: [termId] });
    showToast(res);
  };
  const onUpdateNamespaces = (termId) => async (newNamespaces, currentNamespace) => {
    const append = difference(newNamespaces, currentNamespace);
    const remove = difference(currentNamespace, newNamespaces);

    const res = await updateNamespaces({ append, remove, termId });
    showToast(res);
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
Terms.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    namespaces: PropTypes.arrayOf(PropTypes.string),
    translates: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
};
