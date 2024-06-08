import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

// フォームで使用する変数の型を定義
type FormInputs = {
  username: string;
  password: string;
};

type SignUpInputs = {
  email: string;
  username: string;
  password: string;
};

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */

const SigninPage = () => {
  const { handleSubmit: handleSignInSubmit, register: registerSignIn } =
    useForm<FormInputs>();
  const { handleSubmit: handleSignUpSubmit, register: registerSignUp } =
    useForm<SignUpInputs>();

  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSignInSubmit = handleSignInSubmit(async (data) => {
    const request_data = new URLSearchParams({
      grant_type: "",
      username: data.username,
      password: data.password,
      scope: "",
      client_id: "",
      client_secret: "",
    }).toString();
    console.log(request_data);

    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: request_data,
      });

      if (!response.ok) {
        // サーバーからエラーレスポンスが返された場合の処理
        console.error("エラーが発生しました:", response.statusText);
      } else {
        // 成功した場合の処理
        const result = await response.json();
        console.log("成功:", result);
        localStorage.setItem("token", result.access_token);
        navigate("/purchase");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  });

  const onSignUpSubmit = handleSignUpSubmit(async (data) => {
    const userData = {
      ...data,
      role_id: 0,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // サーバーからエラーレスポンスが返された場合の処理
        console.error("エラーが発生しました:", response.statusText);
      } else {
        // 成功した場合の処理
        const result = await response.json();
        console.log("成功:", result);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  });

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing="5">
        <Heading>ログイン</Heading>
        <form onSubmit={onSignInSubmit}>
          <VStack spacing="4" alignItems="left">
            <FormControl>
              <FormLabel htmlFor="username" textAlign="start">
                ユーザーネーム
              </FormLabel>
              <Input id="username" {...registerSignIn("username")} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  {...registerSignIn("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              marginTop="4"
              color="white"
              bg="teal.400"
              type="submit"
              paddingX="auto"
            >
              ログイン
            </Button>
          </VStack>
        </form>

        <Heading>新規登録</Heading>
        <form onSubmit={onSignUpSubmit}>
          <VStack spacing="4" alignItems="left">
            <FormControl>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input id="email" {...registerSignUp("email")} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">ユーザーネーム</FormLabel>
              <Input id="username" {...registerSignUp("username")} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  {...registerSignUp("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              marginTop="4"
              color="white"
              bg="teal.400"
              type="submit"
              paddingX="auto"
            >
              新規登録
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
};

export default SigninPage;
