import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../context/userContext.js";
import axios from "axios";
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
} from "@chakra-ui/react";
import { FaUserNinja } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
export default function savedJobs(props) {
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  const [savedJobs, setSavedJobs] = useState([
    {
      Position: "",
      Description: "",
      Location: "",
      Link: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetcheing.................");
      const result = await axios(
        `http://localhost:3333/jobs/retrieveSavedJobs/${user._id}` //_id:1
      );
      console.log(result.data, "this is the result from jobs");

      setSavedJobs(result.data.savedJobs);
    };

    fetchData();
  }, []);
  console.log("whats saved jobs", savedJobs[0]); // error: undefined
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
              Link:{" "}
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
        Position={savedJobs[i].title}
        Description={savedJobs[i].description}
        Location={savedJobs[i].location}
        LK={savedJobs[i].url}
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
      style={{ position: "relative" }}
    >
      <Center>
        <Heading as="h1" size="4xl" pt={4}>
          Saved Jobs
        </Heading>
      </Center>

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
            onClick={() => {
              // TODO: prevent reload and clearify my state
              props.history.push("/");
              // return <Redirect push to="/" />;
              // window.location = "/";
              toast({
                title: "Keep Swiping!",
                description: `Because you did not come this far just to come this far`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            Go Swipe
          </Button>{" "}
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
