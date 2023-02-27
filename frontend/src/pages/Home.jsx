import {Button,Flex,Image,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text,useDisclosure,useToast,} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [dlloading, setdlloading] = useState(false);

  const getusers = async () => {
    if (loading) {
      return toast({
        position: "top",
        title: "Error!",
        description: "Please wait for the previous request to get completed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(true);
    await axios
      .get("https://heartbreaking-sheer-papyrus.glitch.me/getUsers")
      .then(() => {
        toast({
          position: "top",
          title: "Data saved in database.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteUsers = async () => {
    setdlloading(true);
    onClose();
    await axios
      .delete("https://heartbreaking-sheer-papyrus.glitch.me/getUsers")
      .then(() => {
        toast({
          position: "top",
          title: "Data deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setdlloading(false)
      })
  };

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Image w="100%" h="100%" objectFit="cover" position="absolute" src="https://i.ibb.co/7WTT1Zf/tamanna-rumee-7-OCUyev2-M9-E-unsplash.jpg" />

      <Flex  w="400px" gap="20px" zIndex="1000">
        <Flex direction="column" boxShadow="dark-lg" padding="20px" borderRadius="10px" backdropFilter="blur(2px)">
          <Text color={"teal"}>Click here to fetch 50 data</Text>
          <Button
            isLoading={loading}
            loadingText={"Fetching data"}
            onClick={getusers}
          >
            Fetch Users
          </Button>
        </Flex>

        <Flex direction="column" boxShadow="dark-lg" padding="20px" borderRadius="10px" backdropFilter="blur(2px)">
          <Text color={"teal"}>Click here to delete entire data</Text>
          <Button
            isLoading={dlloading}
            loadingText={"Deleting data"}
            bg={"red"}
            color={"white"}
            onClick={onOpen}
          >
            Delete Users
          </Button>
        </Flex>

        <Flex direction="column" boxShadow="dark-lg" padding="20px" borderRadius="10px" backdropFilter="blur(2px)">
          <Text color={"teal"}>Click here to check details</Text>
          <Button
            bg={"teal"}
            color={"white"}
            onClick={() => {
              navigate("/userDetails");
            }}
          >
            User Details
          </Button>
        </Flex>
      </Flex>

      <section>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Clicking on Delete will erase all the data. Are you sure ?
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={deleteUsers} bg={"red"} color="white">
                DELETE
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </Flex>
  );
}
