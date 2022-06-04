import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
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

const objectPropTypes = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.object,
  PropTypes.bool,
]));

const noop = () => {};

const DropdownMenuButton = ({
  label,
  list,
  omitEmptyValue,
  renderMenuButton,
  menuButtonProps,
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

  const renderDefaultMenuButton = useCallback(() => (
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
  ), [label, selectedValue.length]);

  const _renderMenuButton = () => (
    renderMenuButton === noop
      ? renderDefaultMenuButton()
      : renderMenuButton()
  );

  return (
    <MenuButton {...menuButtonProps}>
      {_renderMenuButton()}
    </MenuButton>
  );
};
DropdownMenuButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  omitEmptyValue: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  renderMenuButton: PropTypes.func,
  menuButtonProps: objectPropTypes,
};
DropdownMenuButton.defaultProps = {
  label: '',
  renderMenuButton: noop,
  menuButtonProps: {},
};
const DefaultMenuItem = (props) => (
  <MenuItem
    as="label"
    cursor="pointer"
    {...props}
  />
);
const DropdownMenuList = ({
  list,
  omitEmptyValue,
  onChange,
  renderMenuItem,
  renderMenuHeader,
  renderMenuFooter,
  menuListProps,
  menuItemProps,
}) => {
  const DefaultStickyItem = (defaultProps) => useCallback((props) => (
    <DefaultMenuItem
      pos="sticky"
      width="100%"
      bgColor="inherit"
      zIndex={1}
      _hover={{ bgColor: 'inherit' }}
      {...defaultProps}
      {...props}
    />
  ), []);
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

  const _renderMenuItem = useCallback((item) => (
    renderMenuItem === noop
      ? (
        <DefaultMenuItem key={item} {...menuItemProps}>
          <Checkbox value={item}>{item}</Checkbox>
        </DefaultMenuItem>
      )
      : renderMenuItem(item, DefaultMenuItem)
  ), [renderMenuItem]);

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
DropdownMenuList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  omitEmptyValue: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onChange: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuHeader: PropTypes.func,
  renderMenuFooter: PropTypes.func,
  menuListProps: objectPropTypes,
  menuItemProps: objectPropTypes,
};
DropdownMenuList.defaultProps = {
  onChange: noop,
  renderMenuItem: noop,
  renderMenuHeader: noop,
  renderMenuFooter: noop,
  menuListProps: {},
  menuItemProps: {},
};

export const Dropdown = ({
  label,
  list,
  value,
  defaultValue,
  onChange,
  renderMenuButton,
  renderMenuItem,
  renderMenuHeader,
  renderMenuFooter,
  menuButtonProps,
  menuListProps,
  menuItemProps,
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
Dropdown.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  renderMenuButton: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuHeader: PropTypes.func,
  renderMenuFooter: PropTypes.func,
  menuButtonProps: objectPropTypes,
  menuListProps: objectPropTypes,
  menuItemProps: objectPropTypes,
};
Dropdown.defaultProps = {
  label: '',
  value: null,
  defaultValue: null,
  onChange: noop,
  renderMenuButton: noop,
  renderMenuItem: noop,
  renderMenuHeader: noop,
  renderMenuFooter: noop,
  menuButtonProps: {},
  menuListProps: {},
  menuItemProps: {},
};
