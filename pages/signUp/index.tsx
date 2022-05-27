import type { NextPage } from "next";
import Link from "next/link";

const SignUp: NextPage = () => {
  return (
    <div>
      <Link href="/signIn">Sign in</Link>
      <Link href="/signUp">Sign up</Link>
    </div>
  );
};

export default SignUp;
