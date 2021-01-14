import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaUserNinja } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { UserContext } from '../context/userContext.js';

export default function landingPage(props) {
  const toast = useToast();
  const defaultState = {
    auth: true,
    user: {},
  };
  const [state, setState] = useState(defaultState);
  const [jobs, setJobs] = useState([]);
  const { user, setUser } = useContext(UserContext);

  // console.log('what is props', props);
  // setCookies
  console.log(user.name);
  console.log(user._id);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3333/jobs/retrieveAllUnseenJobs/${user._id}` // _id:2
      );
      console.log(result.data.allJobs, 'this is the result from jobs');
      setJobs(result.data.allJobs);
    };

    fetchData();
  }, []);

  console.log('whats logged in', user.loggedIn);

  function swipe(e) {
    e.preventDefault();
    console.log('clicked on', e.target.id); // YES or NO

    // request to add job as YES/NO status
    const fetchAddJob = async () => {
      const result = await axios({
        url: `http://localhost:3333/jobs/addSavedJob`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          user_id: user._id,
          status: e.target.id,
          job_id: jobs[0].job_id,
        },
      });
    };

    fetchAddJob();
    const job = jobs.shift();
    const newJobs = jobs.map((nextJob) => nextJob);
    console.log('length', jobs.length);
    setJobs(newJobs);
    console.log('job swiped', job);
  }
  return user.loggedIn ? (
    <Box
      bg="tomato"
      w="100%"
      p={4}
      color="white"
      style={{ position: 'relative' }}
    >
      <Center>
        <Heading as="h1" size="4xl" pt={4}>
          Hi {user.name}, Swipe a Job?
        </Heading>
      </Center>

      <Box style={{ position: 'absolute', top: '30px', right: '10px' }}>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="teal"
            rightIcon={<ChevronDownIcon />}
          >
            {' '}
            <Icon as={FaUserNinja} w={10} h={10} />
            user
          </MenuButton>
          <MenuList>
            <MenuItem
              color="tomato"
              onClick={() => {
                props.history.push(`/savedJobs`);
              }}
            >
              <Text fontWeight="bold">Saved Jobs</Text>
            </MenuItem>
            <MenuItem color="tomato">
              <Text fontWeight="bold">Applied Jobs</Text>
            </MenuItem>

            <MenuItem
              color="tomato"
              onClick={() => {
                setUser({});
                toast({
                  title: 'Logged out!',
                  description: `You have logged out of your account.`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              <Text fontWeight="bold">Log Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Container maxW="max" maxH="max">
        <Center pt="20px" pb="40px">
          {/* <Heading>Software enginner</Heading>

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
            */}
          {console.log('spoon', jobs[1])}

          {jobs.map((job, i) => {
            if (i === 0)
              return (
                <Flex
                  key={`key${i}`}
                  direction="column"
                  align="center"
                  bg="white"
                  color="black"
                  width="700px"
                  borderRadius="8px"
                  padding="30px"
                  marginTop="100px"
                >
                  <Heading>{job.title}</Heading>
                  <Text
                    dangerouslySetInnerHTML={{ __html: `${job.description}` }}
                  />
                  <Link color="teal.500" href={job.url} isExternal="true">
                    Click here to get more information...
                  </Link>
                </Flex>
              );
          })}
        </Center>
        <Center pb="60px">
          <HStack spacing="50px">
            <Button
              id="N"
              variant="solid"
              size="lg"
              style={{
                borderRadius: '50%',
                color: 'black',
                height: '200px',
                width: '200px',
                fontSize: '100px',
              }}
              onClick={swipe}
            >
              ❌
            </Button>{' '}
            <Button
              id="Y"
              variant="solid"
              size="lg"
              style={{
                borderRadius: '50%',
                color: 'black',
                height: '200px',
                width: '200px',
                fontSize: '100px',
              }}
              onClick={swipe}
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
