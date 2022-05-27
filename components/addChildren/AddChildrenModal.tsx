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
import ChildInfo from "./ChildInfo";

interface Props {
  setModal: (item: string) => void;
}

const AddChildrenModal: React.FC<Props> = ({ setModal }) => {
  const [token, setToken] = React.useState("");
  const toast = useToast();

  React.useEffect(() => {
    if (token)
      toast({
        title: "The QR Code was succesfully scanned!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  }, [token]);

  const handleScan = (result: string) => {
    if (!token) {
      setToken(result);
    }
  };

  return (
    <>
      <Modal isOpen={true} isCentered onClose={() => setModal("NONE")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">Add Children</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!token ? (
              <>
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
              </>
            ) : (
              <ChildInfo token={token} setModal={setModal} />
            )}

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
