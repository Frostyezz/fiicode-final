import type { NextPage } from "next";
import React from "react";

import AddChildrenModal from "../../components/addChildren/AddChildrenModal";

import { Button, CircularProgress, Avatar } from "@chakra-ui/react";

import { UserContext } from "../../contexts/userContext";

import useSWR, { mutate } from "swr";
import axios from "axios";

const Children: NextPage = () => {
  const [modal, setModal] = React.useState("NONE");
  const [loading, setLoading] = React.useState("");

  const { user } = React.useContext(UserContext);

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/family/children/${user?._id}`, fetcher, {
    refreshInterval: 60000,
  });

  const onDelete = async (id: string) => {
    setLoading(id);
    try {
      await axios.delete(`/api/family/children/${id}`);
      mutate(
        `/api/family/children/${user?._id}`,
        fetch(`/api/family/children/${user?._id}`).then((res) => res.json())
      );
    } catch (error) {
      console.log(error);
    }
    setLoading("");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-green shadow-shadow_nav rounded md:w-1/2 flex flex-col p-5">
        <h1 className="pb-5 text-center text-5xl font-bold border-b">
          Your children
        </h1>
        <div className="flex flex-row py-5">
          <Button onClick={() => setModal("ADD")}>Add children</Button>
        </div>
        {data ? (
          <ul className="flex flex-col">
            {data.children.map((child: any) => (
              <li
                className="my-2 w-full bg-white flex flex-row items-center p-3 rounded"
                key={child._id}
              >
                <Avatar name={child.name} src={child?.avatar} />
                <b className="text-xl ml-2">{child.name}</b>
                <Button
                  isLoading={loading === child.id}
                  onClick={() => onDelete(child.id)}
                  colorScheme="red"
                  className="ml-auto"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <CircularProgress isIndeterminate className="py-20 mx-auto" />
        )}
      </div>
      {modal === "ADD" && <AddChildrenModal setModal={setModal} />}
    </div>
  );
};

export default Children;
