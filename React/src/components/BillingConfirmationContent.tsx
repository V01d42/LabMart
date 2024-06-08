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
  Heading,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../RequestWithAuth";

interface Billing {
  id: number;
  username: string;
  total_price: number;
}

const aggregateBillings = (billings: Billing[]): Billing[] => {
  const aggregated: { [key: string]: number } = {};

  billings.forEach((billing) => {
    if (aggregated[billing.username]) {
      aggregated[billing.username] += billing.total_price;
    } else {
      aggregated[billing.username] = billing.total_price;
    }
  });

  return Object.keys(aggregated).map((username, index) => ({
    id: index,
    username,
    total_price: aggregated[username],
  }));
};

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
        const aggregatedData = aggregateBillings(data);
        setBillings(aggregatedData);
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
        <Heading>請求金額の確認</Heading>
        <Card justifyContent="center" alignItems="center">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>購入者</Th>
                  <Th isNumeric>請求金額(円)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {billings.map((billing) => (
                  <Tr key={billing.id}>
                    <Td>{billing.username}</Td>
                    <Td isNumeric>{billing.total_price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
        <ChakraLink as={ReactRouterLink} to="/admin">
          <Button bg={"teal.400"} color={"white"} width="150px">
            戻る
          </Button>
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default BillingConfirmationContent;
