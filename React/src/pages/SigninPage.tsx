import { useState } from "react";
import { useForm } from "react-hook-form";

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
} from '@chakra-ui/react';

// フォームで使用する変数の型を定義
type FormInputs = {
  username: string;
  password: string;
};

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */

const SigninPage = () => {
  const { handleSubmit, register } = useForm<FormInputs>();

  const [show, setShow] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);

    const userData = {
      email: 'ho@ge.com',
      role_id: 0,
      ...data,
    };

    console.log(userData)
    console.log(JSON.stringify(userData))

    try {
      const response = await fetch('http://127.0.0.1:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        // サーバーからエラーレスポンスが返された場合の処理
        console.error('エラーが発生しました:', response.statusText);
      } else {
        // 成功した場合の処理
        const result = await response.json();
        console.log('成功:', result);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
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
        <form onSubmit={onSubmit}>
          <VStack spacing="4" alignItems="left">
            <FormControl>
              <FormLabel htmlFor="username" textAlign="start">
                ユーザーネーム
              </FormLabel>
              <Input id="username" {...register("username")} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  {...register("password")}
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
            <Button
              as="a"
              bg="white"
              color="black"
              href="/signup"
              width="100%"
            >
              新規登録はこちら
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
}

export default SigninPage;
