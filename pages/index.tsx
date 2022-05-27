import type { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const signup = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    try {
      const { data } = await axios.post("/api/signUp", {
        email: form.email.value,
        password: form.password.value,
        username: form.username.value,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    try {
      const { data } = await axios.post("/api/signIn", {
        email: form.email.value,
        password: form.password.value,
      });
      setLoggedIn(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await axios.post("/api/logOut");
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    return <Button onClick={logOut}>Log Out</Button>;
  }

  return (
    <div className="flex flex-row w-100 justify-between">
      <form onSubmit={signin}>
        <Input placeholder="email" name="email" type="email" />
        <Input placeholder="password" name="password" type="password" />
        <Button type="submit">Sign in</Button>
      </form>
      <form onSubmit={signup}>
        <Input placeholder="email" name="email" type="email" />
        <Input placeholder="username" name="username" type="text" />
        <Input placeholder="password" name="password" type="password" />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default Home;
