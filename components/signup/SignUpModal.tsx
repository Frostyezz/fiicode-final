import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const SignUpModal = ({ setModal }) => {
  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Input
                className="my-2"
                isRequired
                placeholder="Email"
                name="email"
                type="email"
              />
              <Input
                className="my-2"
                isRequired
                placeholder="Password"
                name="password"
                type="password"
              />
              <Input
                className="my-2"
                isRequired
                placeholder="Confirm Password"
                name="confirm"
                type="password"
              />
              <div className="flex flex-row">
                <Input
                  className="my-2 mr-1"
                  isRequired
                  placeholder="First Name"
                  name="name"
                  type="text"
                />
                <Input
                  className="my-2 ml-1"
                  isRequired
                  placeholder="Last Name"
                  name="last"
                  type="text"
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => setModal("NONE")}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;
