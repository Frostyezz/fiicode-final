import React, { SyntheticEvent } from "react";

import { UserContext } from "../../contexts/userContext";

import { useRouter } from "next/router";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

interface Props {
  setModal: (item: string) => void;
}

const SignInModal: React.FC<Props> = ({ setModal }) => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const { addUser } = React.useContext(UserContext);

  const toast = useToast();

  const signin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const { data } = await axios.post("/api/signIn", {
        email: form.email.value,
        password: form.password.value,
      });
      toast({
        title: "You succesfully logged into your account!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      addUser({...data.user,role:"USER"});
      setLoading(false);
      router.push("/activity");
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data.error,
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">Log into your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={signin}>
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
              <Button
                isLoading={loading}
                type="submit"
                colorScheme="blue"
                className="my-5 w-full"
              >
                Log in
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInModal;
