import React, { SyntheticEvent } from "react";

import { useChannel } from "../../hooks/useChannel";

import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import Upload from "../upload/Upload";

import { UserContext } from "../../contexts/userContext";

import axios from "axios";

interface Props {
  token: string;
  setModal: (item: string) => void;
}

const ChildInfo: React.FC<Props> = ({ token, setModal }) => {
  const [loading, setLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const { user } = React.useContext(UserContext);

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

  const [channel, ably] = useChannel(token, (data: any) => {});

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const { data } = await axios.post("/api/family/children", {
        id: user._id,
        //@ts-ignore
        name: form.name.value,
      });
      //@ts-ignore
      channel?.publish({ name: "qr-scanned", data });
      setModal("NONE");
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col animate__animated animate__fadeIn"
    >
      <h1 className="text-lg font-bold mb-5">You&#39;re almost there!</h1>
      <Input
        name="name"
        isRequired
        className="mb-5"
        placeholder="What's your child's name?"
      />
      {avatar ? (
        <Alert status="success">
          <AlertIcon className="rounded animate__animated animate__fadeInDown animate__faster" />
          Image successfully uploaded!
        </Alert>
      ) : (
        <Upload
          text="Drag and drop or click to upload a picture of your child (optional)"
          onFileAccepted={sendProfileImg}
        />
      )}
      <Button
        isLoading={loading}
        className="my-5"
        type="submit"
        colorScheme="blue"
      >
        Submit
      </Button>
    </form>
  );
};

export default ChildInfo;
