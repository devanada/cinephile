import { useState, FormEvent } from "react";

import { Layout, Layout2 } from "@/components/layout";
import Button from "@/components/button";
import Input from "@/components/input";

import {
  createSessionID,
  getDetailAccount,
  getRequestToken,
  postLogin,
} from "@/utils/apis/auth/api";
import { useToken } from "@/utils/contexts/token";

const Auth = () => {
  const { changeToken } = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      username,
      password,
      request_token: await getRequestToken(),
    };

    try {
      const result = await postLogin(body);
      const getSessionID = await createSessionID(result.request_token);
      const getUserID = await getDetailAccount(getSessionID);
      changeToken(getSessionID, getUserID);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://picsum.photos/seed/picsum/1920/1080?blur=2)`,
        }}
        className="h-full w-full bg-cover bg-center bg-no-repeat"
      >
        <Layout2>
          <form
            onSubmit={onSubmit}
            className="flex h-1/2 w-1/2 flex-col flex-wrap justify-center gap-4 rounded-lg border-2 border-zinc-800 bg-white/70 p-3 shadow-lg shadow-black dark:bg-black/70"
          >
            <Input
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button label="Submit" />
          </form>
        </Layout2>
      </div>
    </Layout>
  );
};

export default Auth;
