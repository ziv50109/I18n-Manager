import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { values } from 'lodash';
import {
  Box,
  Flex,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { features } from '@/lib/routes';

const noop = () => {};

const StyledNavLink = ({ to, ...others }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Box
          px={2}
          py={1}
          rounded="md"
          _hover={{
            textDecoration: 'none',
            bg: bgColor,
          }}
          bg={isActive ? bgColor : ''}
          {...others}
        />
      )}
    </NavLink>
  );
};
const UserAvatarMenu = ({
  user,
  onSignout,
}) => {
  const name = user.displayName ?? user.email;
  const defaultAvatar = user.photoURL ?? `https://avatars.dicebear.com/api/initials/${name.charAt(0)}.svg`;

  return (
    <Menu>
      <MenuButton
        rounded="full"
        variant="link"
        cursor="pointer"
      >
        <Avatar
          size="sm"
          bg="white"
          src={defaultAvatar}
        />
      </MenuButton>
      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar
            size="2xl"
            bg="white"
            src={defaultAvatar}
          />
        </Center>
        <br />
        <Center>
          <p>{name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Account Settings</MenuItem>
        <MenuItem onClick={onSignout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};
UserAvatarMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.any,
  ])).isRequired,
  onSignout: PropTypes.func,
};
UserAvatarMenu.defaultProps = {
  onSignout: noop,
};

const ActionButtons = ({
  onSignin,
  onSignup,
}) => (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify="flexEnd"
    direction="row"
    spacing={6}
  >
    <Button
      fontSize="sm"
      fontWeight={400}
      variant="link"
      onClick={onSignin}
    >
      Sign In
    </Button>
    <Button
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="green.300"
      _hover={{
        bg: 'green.500',
      }}
      rounded="md"
      onClick={onSignup}
    >
      Sign Up
    </Button>
  </Stack>
);
ActionButtons.propTypes = {
  onSignin: PropTypes.func,
  onSignup: PropTypes.func,
};
ActionButtons.defaultProps = {
  onSignin: noop,
  onSignup: noop,
};

export const Header = ({
  user,
  onSignin,
  onSignup,
  onSignout,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const ColorModeIcon = () => (
    colorMode === 'light'
      ? <MoonIcon />
      : <SunIcon />
  );

  const renderAction = () => (
    user.uid
      ? (
        <UserAvatarMenu
          user={user}
          onSignout={onSignout}
        />
      )
      : (
        <ActionButtons
          onSignin={onSignin}
          onSignup={onSignup}
        />
      )
  );

  return (
    <Box bg={useColorModeValue('green.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box fontWeight={600}>i18n Editor</Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {values(features).map((link) => (
              <StyledNavLink key={link.path} to={link.path}>{link.name}</StyledNavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <IconButton
              rounded="full"
              onClick={toggleColorMode}
              icon={<ColorModeIcon />}
            />
            {renderAction()}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.any,
  ])).isRequired,
  onSignin: PropTypes.func,
  onSignup: PropTypes.func,
  onSignout: PropTypes.func,
};
Header.defaultProps = {
  onSignin: noop,
  onSignup: noop,
  onSignout: noop,
};
