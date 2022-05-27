import type { NextPage } from "next";
import React from "react";

import AddChildrenModal from "../../components/addChildren/AddChildrenModal";

import { Input, Button } from "@chakra-ui/react";

const Children: NextPage = () => {
  const [modal, setModal] = React.useState("NONE");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-green shadow-shadow_nav rounded md:w-1/2 flex flex-col p-5">
        <h1 className="pb-5 text-center text-5xl font-bold border-b">
          Your children
        </h1>
        <div className="flex flex-row pt-5">
          <Button onClick={() => setModal("ADD")}>Add children</Button>
          <Input
            className="w-52 bg-white ml-auto"
            placeholder="Search by name"
          />
        </div>
      </div>
      {modal === "ADD" && <AddChildrenModal setModal={setModal} />}
    </div>
  );
};

export default Children;
