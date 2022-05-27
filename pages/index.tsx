import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import Slideshow from "../components/swiper/Slideshow";
import SignUpModal from "../components/signup/SignUpModal";

import { useMobile } from "../hooks/mediaQueries";

const Home: NextPage = () => {
  const isMobile = useMobile();

  const [modal, setModal] = React.useState("NONE");

  return (
    <div className="flex flex-col w-screen h-screen text-center overflow-hidden">
      <div className="w-full h-full mx-auto flex flex-col-reverse md:flex-row-reverse">
        <Slideshow />
        <div className="w-1/3 h-full flex flex-col mx-auto justify-center items-center">
          {isMobile ? (
            <Image
              src="/logo-bg.png"
              width={210}
              height={70}
              layout="fixed"
              priority={true}
            />
          ) : (
            <Image
              src="/logo-bg.png"
              width={410}
              height={140}
              priority={true}
            />
          )}
          <Button onClick={() => setModal("REGISTER")} className="mb-5 mt-10">
            Get Started
          </Button>
          <Button onClick={() => setModal("JOIN")}>Join my family</Button>
          {modal === "REGISTER" && <SignUpModal setModal={setModal} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
