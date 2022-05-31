import { memo } from 'react';
import {
  toPairs,
  isEqual,
  pick,
} from 'lodash';
import {
  Box,
  Heading,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Divider,
} from '@chakra-ui/react';

const noop = () => {};
const areEqual = (prevProps, nextProps) => {
  const comparison = (obj) => pick(obj, ['term']);
  return isEqual(comparison(prevProps), comparison(nextProps));
};

const NamespacesSection = ({
  namespaces = [],
  onRemoveNamespace = noop,
}) => {

  const handleRemoveNamespace = (namespace) => () => onRemoveNamespace(namespace);

  const renderNamespaces = () => namespaces.map((namespace) => (
    <Tag
      key={namespace}
      size="md"
      borderRadius="full"
      variant="solid"
      colorScheme="green"
    >
      <TagLabel>{namespace}</TagLabel>
      <TagCloseButton onClick={handleRemoveNamespace(namespace)} />
    </Tag>
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4}>Namespaces</Heading>
      <HStack spacing={2}>
        {renderNamespaces()}
      </HStack>
    </Box>
  );
};

export const Term = memo(({
  term = {},
  onRemoveNamespace = noop,
}) => {

  return (
    <Box
      boxShadow="base"
      rounded="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      {term.key}
      <Divider />
      <Box px={4} py={2}>
        {toPairs(term.translates).map(([lang, value]) => (
          <HStack
            key={`${term.id}-${lang}`}
            spacing={2}
            mt={2}
            mb={4}
          >
            <Heading as="h4" size="sm">{`${lang}:`}</Heading>
            <Text>{value}</Text>
          </HStack>
        ))}
        <NamespacesSection
          namespaces={term.namespaces}
          onRemoveNamespace={onRemoveNamespace}
        />
      </Box>
    </Box>
  );
}, areEqual);
