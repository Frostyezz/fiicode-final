import React from "react";
import { useRouter } from "next/router";

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
  const token = uuidv4();
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
