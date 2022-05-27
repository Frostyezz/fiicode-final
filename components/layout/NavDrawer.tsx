import React from "react";

import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { UserContext } from "../../contexts/userContext";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Avatar,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

import { JustifyLeft } from "react-bootstrap-icons";

import axios from "axios";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  const { user, removeUser } = React.useContext(UserContext);

  const logout = async () => {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      return toast({
        title: "An error ocurred!",
        description: "Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    removeUser();
    toast({
      title: "You succesfully logged out!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    Router.push("/");
  };

  return (
    <>
      <nav
        ref={btnRef.current}
        onClick={onOpen}
        className={`fixed top inset-y-5 text-5xl bg-white z-50 w-max h-max rounded-r-xl shadow-shadow_nav cursor-pointer`}
      >
        <JustifyLeft />
      </nav>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Image src="/logo-bg.png" width={210} height={70} priority={true} />
          </DrawerHeader>

          <DrawerBody className="flex flex-col text-xl font-bold max-h-72 justify-evenly">
            <Link href="/">Location feed</Link>
            <Link href="/signUp">Children</Link>
            <Link href="/signIn">My family</Link>
            <Link href="/join">Scan a QR code</Link>
          </DrawerBody>

          <DrawerFooter className="bg-green flex flex-row mt-auto justify-between px-3 shadow-shaodow_nav">
            <Avatar
              name={user.name + " " + user.last}
              src="https://bit.ly/dan-abramov"
            />
            <h1 className="text-lg font-bold">{user.name}</h1>
            <Button colorScheme="gray" onClick={logout}>
              Log Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
