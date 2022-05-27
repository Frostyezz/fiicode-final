import React from "react";
import { useRouter } from "next/router";

import { useChannel } from "../../hooks/useChannel";

import { UserContext } from "../../contexts/userContext";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import QRCode from "react-qr-code";

interface Props {
  setModal: (item: string) => void;
}

const JoinFamilyModal: React.FC<Props> = ({ setModal }) => {
  const { addUser } = React.useContext(UserContext);
  const token = uuidv4();
  const toast = useToast();
  const [channel, ably] = useChannel(token, async (data: any) => {
    try {
      await axios.post("/api/family/children/activate", data.data);
      addUser(data.data);
      toast({
        title: "You joined the family successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occured!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  });
  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">Join your family</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="info">
              <AlertIcon />
              Ask your parent to scan this QR Code!
            </Alert>
            <QRCode className="mx-auto my-5" value={token} />
            <Button
              colorScheme="gray"
              className="w-full mb-5"
              onClick={() => setModal("NONE")}
            >
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinFamilyModal;
