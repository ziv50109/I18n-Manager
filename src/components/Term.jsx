import { memo, useContext, useState } from 'react';
import { DatabaseContext } from '@/store';
import {
  toPairs,
  keys,
  isEqual,
  pick,
} from 'lodash';
import {
  Box,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  ButtonGroup,
  Button,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import {
  AddIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { CustomEditable, Dropdown } from '@/components';

const noop = () => {};
const areEqual = (prevProps, nextProps) => {
  const comparison = (obj) => pick(obj, ['term']);
  return isEqual(comparison(prevProps), comparison(nextProps));
};

const TermEditable = ({ defaultValue, ...others }) => {
  const renderEditButton = (value) => (EditIconButton) => (
    value?.length ? <EditIconButton /> : <EditIconButton icon={<AddIcon />} />
  );
  const renderCheckButton = (CheckIconButton, getSubmitButtonProps) => (
    <Button colorScheme="teal" {...getSubmitButtonProps()}>Update</Button>
  );

  return (
    <CustomEditable
      maxW={300}
      defaultValue={defaultValue}
      submitOnBlur={false}
      renderEditButton={renderEditButton(defaultValue)}
      renderCheckButton={renderCheckButton}
      {...others}
    />
  );
};

const NamespacesSection = ({
  namespaces = [],
  onRemoveNamespace = noop,
  onUpdateNamespaces = noop,
}) => {
  const database = useContext(DatabaseContext);
  const namespaceList = keys(database.namespaces);

  const [selectedNamespace, setSelectedNamespace] = useState(namespaces);

  const handleRemoveNamespace = (namespace) => () => onRemoveNamespace(namespace);
  const handleUpdateNamespaces = () => {
    onUpdateNamespaces(selectedNamespace, namespaces)
  };

  const onClose = () => {
    setSelectedNamespace(namespaces);
  };

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

  const renderMenuButton = () => (
    <IconButton
      size="xs"
      as="div"
      icon={<EditIcon />}
    />
  );
  const renderMenuFooter = (StickyItem) => (
    <StickyItem>
      <ButtonGroup
        width="100%"
        colorScheme="teal"
        spacing={2}
        justifyContent="space-evenly"
        p={2}
      >
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateNamespaces}>Save</Button>
      </ButtonGroup>
    </StickyItem>
  )

  return (
    <Box>
      <HStack spacing={2} mb={4}>
        <Heading fontSize="md">Namespaces</Heading>
        <Dropdown
          closeOnSelect
          list={namespaceList}
          value={selectedNamespace}
          onChange={setSelectedNamespace}
          onClose={onClose}
          renderMenuButton={renderMenuButton}
          renderMenuFooter={renderMenuFooter}
          menuItemProps={{
            closeOnSelect: false
          }}
        />
      </HStack>
      <HStack spacing={2}>
        {renderNamespaces()}
      </HStack>
    </Box>
  );
};

export const Term = memo(({
  term = {},
  onUpdateTerm = noop,
  onUpdateTranslate = noop,
  onRemoveNamespace = noop,
  onUpdateNamespaces = noop,
}) => {
  const handleUpdateKey = (currentTerm) => (newTerm) => onUpdateTerm(newTerm, currentTerm);
  const handleUpdateTerm = (lang, currValue) => (newValue) => onUpdateTranslate(lang, newValue, currValue);

  return (
    <Box
      boxShadow="base"
      rounded="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      <TermEditable
        px={4}
        py={2}
        fontSize="2xl"
        fontWeight="bold"
        defaultValue={term.key}
        onSubmit={handleUpdateKey(term.key)}
      />
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
            <TermEditable
              defaultValue={value}
              onSubmit={handleUpdateTerm(lang, value)}
            />
          </HStack>
        ))}
        <NamespacesSection
          namespaces={term.namespaces}
          onRemoveNamespace={onRemoveNamespace}
          onUpdateNamespaces={onUpdateNamespaces}
        />
      </Box>
    </Box>
  );
}, areEqual);
