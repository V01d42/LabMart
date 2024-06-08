import { useState, useEffect } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
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
  const [isManager, setIsManager] = useState<boolean>(false);
  const navigate = useNavigate();
  // Clear token when the component mounts
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const onSignInSubmit = async (data: FormInputs) => {
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
        // role_idが1の場合は管理者画面に遷移
        if (result.role_id === 1) {
          navigate("/admin");
        } else {
          navigate("/purchase");
        }
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const onSignUpSubmit = handleSignUpSubmit(async (data) => {
    const userData = {
      ...data,
      role_id: isManager ? 1 : 0,
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

        // ユーザーが作成された後にサインインを実行
        await onSignInSubmit({
          username: data.username,
          password: data.password,
        });
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
        <Heading>LabMart</Heading>
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList justifyContent="center">
            <Tab>ログイン</Tab>
            <Tab>新規登録</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={handleSignInSubmit(onSignInSubmit)}>
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
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
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
            </TabPanel>
            <TabPanel>
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
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormLabel mt="3">管理者として登録する</FormLabel>
                    <Switch
                      id="manager"
                      ml="9"
                      sx={{
                        ".chakra-switch__track": {
                          bg: "gray.200", // オフの時の色
                        },
                        "&[data-checked] .chakra-switch__track": {
                          bg: "teal.400", // オンの時の色
                        },
                      }}
                      onChange={(e) => setIsManager(e.target.checked)}
                    />
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Flex>
  );
};

export default SigninPage;
