import React, { SyntheticEvent } from "react";

import { UserContext } from "../../contexts/userContext";

import Upload from "../upload/Upload";

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
  AlertIcon,
  Alert,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

interface Props {
  setModal: (item: string) => void;
}

const SignUpModal: React.FC<Props> = ({ setModal }) => {
  const [avatar, setAvatar] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const { addUser } = React.useContext(UserContext);

  const toast = useToast();

  const signup = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const { data } = await axios.post("/api/signUp", {
        email: form.email.value,
        password: form.password.value,
        //@ts-ignore
        name: form.name.value,
        last: form.last.value,
        avatar: avatar ? avatar : null,
      });
      toast({
        title: "Account created successfully!",
        description: "You are logged into your new account.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      addUser(data.user);
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

  const sendProfileImg = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fiicode");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`,
      formData
    );
    setAvatar(data.url);
  };

  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={signup}>
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
              {avatar ? (
                <Alert status="success">
                  <AlertIcon className="rounded animate__animated animate__fadeInDown animate__faster" />
                  Imaginea a fost încărcată cu succes!
                </Alert>
              ) : (
                <Upload
                  text="Drag and drop or click to upload a profile picture"
                  onFileAccepted={sendProfileImg}
                />
              )}
              <Button
                isLoading={loading}
                type="submit"
                colorScheme="blue"
                className="my-5 w-full"
              >
                Sign Up
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;
