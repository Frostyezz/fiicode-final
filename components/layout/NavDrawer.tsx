import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { JustifyLeft } from "react-bootstrap-icons";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
            <Link href="/">Home</Link>
            <Link href="/signUp">Get Started</Link>
            <Link href="/signIn">Log In</Link>
            <Link href="/join">Join your family</Link>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
