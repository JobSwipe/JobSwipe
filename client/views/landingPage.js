import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
  Spacer,
} from '@chakra-ui/react';
import { FaUserNinja } from 'react-icons/fa';

import { Icon } from '@chakra-ui/react';
export default function landingPage(props) {
  const defaultState = {
    auth: true,
    user: {},
  };
  const [state, setState] = useState(defaultState);
  // console.log('what is props', props);
  // setCookies
  return state.auth ? (
    <Box
      bg="tomato"
      w="100%"
      p={4}
      color="white"
      style={{ position: 'relative' }}
    >
      <Center>
        <Heading as="h1" size="4xl" pt={4}>
          Swipe a Job?
        </Heading>
      </Center>

      <Box style={{ position: 'absolute', top: '30px', right: '10px' }}>
        <Button colorScheme="teal">
          <Icon as={FaUserNinja} w={10} h={10} />
          user
        </Button>
      </Box>
      <Container maxW="max" maxH="max">
        <Center pt="20px" pb="40px">
          <Flex
            direction="column"
            align="center"
            bg="white"
            color="black"
            width="700px"
            borderRadius="8px"
            padding="30px"
            marginTop="100px"
          >
            <Heading>Software enginner</Heading>

            <Text>J.P. Morgan</Text>
            <Text>
              Description: As an experienced Java Development Lead or Software
              Engineer Lead, your mission will be to join our inspiring team of
              innovators and technologists creating innovative modern software
              to advance our business. We are looking for people who are
              passionate about solving business problems through the delivery of
              high quality cloud-centric software embracing modern software
              practices and technology. We embrace a culture of experimentation
              and constantly strive for improvement and learning. You’ll work in
              a collaborative, trusting, thought-provoking environment—one that
              encourages diversity of thought and creative solutions that are in
              the best interests of our customers globally. This role requires a
              wide variety of strengths and capabilities, including: Significant
              experience in Java software development leading small local
              development teams primarily from Java and React backgrounds.
              Experience in design, build and troubleshooting large scale
              distributed systems based on Java. Experience using Agile
              practices like Scrum, Jira, TDD, BDD, DevOps or Continuous
              Integration. Experience with new and emerging technologies such as
              Cloud Computing. Experience with highly scalable and highly
              available systems. Ability to work in large, collaborative global
              teams to achieve organisational goals. Desire to learn new
              technologies like Machine Learning/AI. *You must be able to work
              in the US without sponsorship If you're a good fit for this
              position please email me your resume or you can apply to this
              position on JPMC Careers website job # 210052698. I look forward
              to speaking with you soon!
            </Text>
          </Flex>
        </Center>
        <Center pb="60px">
          <HStack spacing="50px">
            <Button
              variant="solid"
              size="lg"
              style={{
                borderRadius: '50%',
                color: 'black',
                height: '200px',
                width: '200px',
                fontSize: '100px',
              }}
            >
              ❌
            </Button>{' '}
            <Button
              variant="solid"
              size="lg"
              style={{
                borderRadius: '50%',
                color: 'black',
                height: '200px',
                width: '200px',
                fontSize: '100px',
              }}
            >
              ✔️
            </Button>
          </HStack>
        </Center>
      </Container>
    </Box>
  ) : (
    <Redirect to="/login" />
  );
}
