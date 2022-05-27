import React from "react";

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

import { QrReader } from "react-qr-reader";

interface Props {
  setModal: (item: string) => void;
}

const AddChildrenModal: React.FC<Props> = ({ setModal }) => {
  const toast = useToast();

  const handleScan = (token: string) => {
    console.log(token);
  };

  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">Add Children</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="info">
              <AlertIcon />
              Scan your child&#39;s QR Code!
            </Alert>
            {/*@ts-ignore */}
            <QrReader
              onResult={(result: any, error: any) => {
                if (!!result) {
                  handleScan(result.text);
                }
              }}
            />
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

export default AddChildrenModal;
