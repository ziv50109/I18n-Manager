import { useMemo } from 'react';
import { omitBy, values, isEmpty } from 'lodash';
import {
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const noop = () => {};

const DropdownMenuButton = ({
  list = [],
  label = '',
  omitEmptyValue = [],
  renderMenuButton = noop,
  menuButtonProps = {},
}) => {
  const selectedValue = values(omitEmptyValue).flat() ?? [];

  const renderInputValue = () => {
    if (
      selectedValue.length === 0
      || selectedValue.length === list.length
    ) return 'All';
    if (selectedValue.length === 1) return selectedValue[0];
    return `${selectedValue.length} of ${list.length} selected`;
  };

  const DefaultMenuButton = () => (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          value={renderInputValue()}
          readOnly
        />
        <InputRightElement>
          <ChevronDownIcon />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );

  const _renderMenuButton = () => (
    renderMenuButton === noop
      ? <DefaultMenuButton />
      : renderMenuButton()
  );

  return (
    <MenuButton {...menuButtonProps}>
      {_renderMenuButton()}
    </MenuButton>
  );
};
const DropdownMenuList = ({
  list = [],
  omitEmptyValue = [],
  onChange = noop,
  renderMenuItem = noop,
  renderMenuHeader = noop,
  renderMenuFooter = noop,
  menuListProps = {},
  menuItemProps = {},
}) => {
  const DefaultMenuItem = (props) => (
    <MenuItem
      as="label"
      cursor="pointer"
      {...props}
    />
  );

  const DefaultStickyItem = (defaultProps) => (props) => (
    <DefaultMenuItem
      pos="sticky"
      width="100%"
      bgColor="inherit"
      zIndex={1}
      _hover={{ bgColor: 'inherit' }}
      {...defaultProps}
      {...props}
    />
  );
  const _renderMenuHeader = () => (
    renderMenuHeader === noop
      ? null
      : renderMenuHeader(DefaultStickyItem({
        top: 0,
        borderBottom: '1px solid',
        borderColor: 'gray.200',
      }))
  );
  const _renderMenuFooter = () => (
    renderMenuFooter === noop
      ? null
      : renderMenuFooter(DefaultStickyItem({
        bottom: 0,
        borderTop: '1px solid',
        borderColor: 'gray.200',
      }))
  );

  const _renderMenuItem = (item) => (
    renderMenuItem === noop
      ? (
        <DefaultMenuItem key={item} {...menuItemProps}>
          <Checkbox value={item}>{item}</Checkbox>
        </DefaultMenuItem>
      )
      : renderMenuItem(item, DefaultMenuItem)
  );

  const lists = useMemo(() => list.map(_renderMenuItem), ['list']);
  return (
    <MenuList
      py={0}
      maxH={400}
      overflow="auto"
      {...menuListProps}
    >
      {_renderMenuHeader()}
      <CheckboxGroup
        colorScheme="green"
        onChange={onChange}
        {...omitEmptyValue}
      >
        {lists}
      </CheckboxGroup>
      {_renderMenuFooter()}
    </MenuList>
  );
};

export const Dropdown = ({
  label = '',
  list = [],
  value = null,
  defaultValue = null,
  onChange = noop,
  renderMenuButton = noop,
  renderMenuItem = noop,
  renderMenuHeader = noop,
  renderMenuFooter = noop,
  menuButtonProps = {},
  menuListProps = {},
  menuItemProps = {},
  ...others
}) => {
  const omitEmptyValue = omitBy({ value, defaultValue }, isEmpty);

  const DropdownMenuButtonProps = {
    list,
    label,
    omitEmptyValue,
    renderMenuButton,
    menuButtonProps,
  };
  const DropdownMenuListProps = {
    list,
    omitEmptyValue,
    onChange,
    renderMenuItem,
    renderMenuHeader,
    renderMenuFooter,
    menuListProps,
    menuItemProps,
  };

  return (
    <Menu closeOnSelect={false} {...others}>
      <DropdownMenuButton {...DropdownMenuButtonProps} />
      <DropdownMenuList {...DropdownMenuListProps} />
    </Menu>
  );
};
