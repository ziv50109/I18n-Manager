import { NavLink } from 'react-router-dom';
import { values } from 'lodash';
import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { features } from '@/lib';

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

const ActionButtons = () => (
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
    >
      Sign Up
    </Button>
  </Stack>
);

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const ColorModeIcon = () => colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

  return (
    <Box bg={useColorModeValue('green.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box fontWeight={600}>i18n Editor</Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
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
            <ActionButtons />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
