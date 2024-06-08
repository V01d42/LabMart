import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const AdminContent = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <VStack justifyContent="center" alignItems="center" spacing={10}>
          <ChakraLink as={ReactRouterLink} to="add-products">
            <Button bg={"teal.400"} color={"white"} width="150px">
              商品の追加
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="check-products">
            <Button bg={"teal.400"} color={"white"} width="150px">
              在庫の確認
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="billing-confirmation">
            <Button bg={"teal.400"} color={"white"} width="150px">
              請求金額の確認
            </Button>
          </ChakraLink>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AdminContent;
