import {
  Box,
  VStack,
  Button,
  Link as ChakraLink,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../RequestWithAuth";

interface Billing {
  id: number;
  user_id: string;
  total_price: number;
}

const BillingConfirmationContent = () => {
  const [billings, setBillings] = useState<Billing[]>([]);
  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await requestWithAuth(
          "http://localhost:8000/purchases/sold"
        );
        if (!response.ok) {
          throw new Error("請求情報の取得に失敗しました");
        }
        const data = await response.json();
        setBillings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBillings();
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack justifyContent="center" alignItems="center" spacing={10}>
        <Card justifyContent="center" alignItems="center">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>購入者</Th>
                  <Th isNumeric>請求金額</Th>
                </Tr>
              </Thead>
              <Tbody>
                {billings.map((billing) => (
                  <Tr key={billing.id}>
                    <Td>{billing.user_id}</Td>
                    <Td isNumeric>{billing.total_price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
        <ChakraLink as={ReactRouterLink} to="/admin">
          <Button colorScheme="blue" width="150px">
            戻る
          </Button>
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default BillingConfirmationContent;
