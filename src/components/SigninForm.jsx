import { useForm } from 'react-hook-form';
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  Checkbox,
  Link,
} from '@chakra-ui/react';

export const SigninForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="3xl">Sign In</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={6}
            w={{ base: 'sm', sm: 'lg' }}
            p={{ base: 5, sm: 6 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <VStack spacing={0} w="100%">
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  placeholder="Email Address"
                  defaultValue="test@i18n.editor"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  defaultValue="1234qwer"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
