import React, { useState, useEffct, useContext } from 'react';
import { UserContext } from '../context/userContext.js';
import {
  Image,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Input,
  Center,
  Link,
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
  Wrap,
  WrapItem,
  VStack,
  StackDivider,
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
} from '@chakra-ui/react';
import { FaUserNinja } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
export default function savedJobs() {
  const { user, setUser } = useContext(UserContext);
  const [savedJobs, setSavedJobs] = useState([
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },

    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },

    {
      Position: 'software engineer',
      Description:
        'fdsafjdsoafhd fds afdhsaofhdsaofdhsiaofhdsoafhdsaofhdosafhodsahfsodafhsdoafhdsoahfdsoahfdsoa',
      Location: 'Newport, NJ',
      Link: 'https://google.com',
    },
  ]);
  // axios.get => [{}]
  const Cards = ({ Position, Description, Location, LK }) => {
    return (
      <WrapItem>
        <Container
          w="320px"
          h="320px"
          bg="red.200"
          rounded="md"
          boxShadow="dark-lg"
        >
          <VStack
            w="100%"
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
          >
            <Box w="100%" pt="20px">
              Position: {Position}
            </Box>
            <Box w="100%">Description: {Description}</Box>
            <Box w="100%">Location: {Location}</Box>
            <Box w="100%" pb="20px">
              Link:{' '}
              <Link color="teal.700" href={LK}>
                {LK}
              </Link>
            </Box>
          </VStack>
        </Container>
      </WrapItem>
    );
  };
  const savedJobList = [];
  for (let i = 0; i < savedJobs.length; i++) {
    savedJobList.push(
      <Cards
        key={`jobs${i}`}
        Position={savedJobs[i].Position}
        Description={savedJobs[i].Description}
        Location={savedJobs[i].Location}
        LK={savedJobs[i].Link}
      />
    );
  }
  //[{},{},{}]
  return (
    <Box
      bg="tomato"
      w="100%"
      h="100%"
      p={4}
      color="white"
      style={{ position: 'relative' }}
    >
      <Center>
        <Heading as="h1" size="4xl" pt={4}>
          Saved Jobs
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
            <MenuItem color="tomato">
              <Text fontWeight="bold">Applied Jobs</Text>
            </MenuItem>

            <MenuItem color="tomato">
              {' '}
              <Text fontWeight="bold">Log Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Container maxW="max" maxH="max">
        <Wrap pt="100px" pb="100px">
          {savedJobList}
        </Wrap>
        <Center pb="60px">
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            colorScheme="teal"
            borderColor="green.500"
            color="white"
          >
            Go Swipe
          </Button>{' '}
        </Center>
      </Container>
    </Box>
  );
}
/**
 * <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
//////////
 <Button colorScheme="teal">
          <Icon as={FaUserNinja} w={10} h={10} />
          user
        </Button>
 */
