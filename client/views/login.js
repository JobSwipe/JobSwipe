import React from 'react';
import {
  Image,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  ButtonGroup,
  Container,
  Header,
  useToast,
  CloseButton,
  InputRightElement,
  HStack,
} from '@chakra-ui/react';
import { FaGooglePlusSquare, FaGithubSquare } from 'react-icons/fa';

import { Icon } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Box bg="tomato" w="100%" p={4} color="white">
      <Center>
        <Heading as="h1" size="4xl" pt={4}>
          Welcome to JobSwipe
        </Heading>
      </Center>
      <Container maxW="max" maxH="max">
        <Center pt="40px" pb="450px">
          <Flex
            direction="column"
            align="center"
            bg="white"
            color="black"
            width="500px"
            borderRadius="8px"
            padding="30px"
            marginTop="100px"
          >
            <Heading>Log In</Heading>

            <Image
              src="https://github.com/lijiaxingogo/RUshrift/blob/main/js.png?raw=true"
              fallbackSrc="https://via.placeholder.com/150"
            />
            <Text>Don't have an account? Log in with</Text>
            <HStack spacing="24px">
              <Button>
                <Icon as={FaGooglePlusSquare} w={6} h={6} />
                Google
              </Button>
              <Button>
                <Icon as={FaGithubSquare} w={6} h={6} />
                Github
              </Button>
            </HStack>
          </Flex>
        </Center>
      </Container>
    </Box>
  );
}
