import { useContext } from 'react';
import { DatabaseContext } from '@/store';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  get,
  compact,
  keys,
  values,
  toPairs,
  intersection,
  isEqual,
} from 'lodash';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Checkbox,
} from '@chakra-ui/react';
import { Dropdown } from '@/components';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const {
    namespaces,
    keys: i18nKeys,
    translates,
  } = useContext(DatabaseContext);
  const namespaceFormatted = keys(namespaces);
  const namespacesMap = toPairs(namespaces).reduce((acc, [namespace, ids]) => {
    if (!ids?.length) return acc;

    ids.forEach((id) => {
      if (!acc?.[id]) {
        acc[id] = [];
      }
      acc[id].push(namespace);
    });

    return acc;
  }, {});
  const terms = toPairs(i18nKeys).map(([id, key]) => ({
    id,
    key,
    namespaces: namespacesMap[id],
    translates: translates[id],
  }));

  const onUpdateParams = (key, value) => {
    const newParams = {
      ...params,
      [key]: value,
    };
    if (!value.length) delete newParams[key];

    setSearchParams(newParams)
  };

  const searchDefaultValue = get(params, 'search', '');
  const namespaceDefaultValue = compact(get(params, 'namespace', '').split(','));
  const partialMatchDefaultValue = JSON.parse(get(params, 'partialMatch', true));

  const onNamespaceChange = (newNamespaces) => onUpdateParams('namespace', newNamespaces.join(','));
  const onSearchChange = (event) => onUpdateParams('search', event.target.value);
  const onPartialMatchChange = (event) => onUpdateParams('partialMatch', event.target.checked);

  const filterSearch = (term) => {
    if (!searchDefaultValue?.length) return true;

    return (
      term.key.toLowerCase().indexOf(searchDefaultValue.toLowerCase()) !== -1
      || values(term.translates).join('').toLowerCase().indexOf(searchDefaultValue.toLowerCase()) !== -1
    );
  };
  const filterNamespace = (term) => {
    if (!namespaceDefaultValue?.length) return true;

    const result = intersection(namespaceDefaultValue, term.namespaces);

    return partialMatchDefaultValue ? result.length > 0 : isEqual(result, namespaceDefaultValue);
  };

  const filterTerms = terms.filter((term) => (
    filterSearch(term)
    && filterNamespace(term)
  ));

  const renderMenuHeader = (StickyItem) => (
    <StickyItem>
      <Checkbox
        p={2}
        colorScheme="green"
        defaultChecked={partialMatchDefaultValue}
        onChange={onPartialMatchChange}
      >
        Partial matches
      </Checkbox>
    </StickyItem>
  );

  return (
    <Box px={4} py={2}>
      <SimpleGrid columns={2} spacing={6}>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input
            placeholder="Search term, translate"
            defaultValue={searchDefaultValue}
            onChange={onSearchChange}
          />
        </FormControl>
        <Dropdown
          label="Namespaces"
          list={namespaceFormatted}
          defaultValue={namespaceDefaultValue}
          onChange={onNamespaceChange}
          renderMenuHeader={renderMenuHeader}
        />
      </SimpleGrid>

      <Outlet />
    </Box>
  );
};
