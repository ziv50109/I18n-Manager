import { Link } from 'react-router-dom';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';

export const SignupForm = () => (
  <Container maxW="7xl" p={{ base: 5, md: 10 }}>
    <Center>
      <Stack spacing={4}>
        <Stack align="center">
          <Heading fontSize="3xl">Sign Up</Heading>
        </Stack>
        <VStack as="form" spacing={6} w={{ base: 'sm', sm: 'lg' }} p={{ base: 5, sm: 6 }}>
          <VStack spacing={2} w="100%">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                rounded="md"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Email Address"
                rounded="md"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                rounded="md"
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Text fontSize={{ base: 'md', sm: 'md' }}>
              Already a member?
              <ChakraLink as="span" ml={1}><Link to="/signin">Login</Link></ChakraLink>
            </Text>
            <Button
              bg="green.300"
              color="white"
              _hover={{
                bg: 'green.500',
              }}
              rounded="md"
              w="100%"
            >
              Sign Up
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Center>
  </Container>
);
