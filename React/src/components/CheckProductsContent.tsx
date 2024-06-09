import {
  Card,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  store_id: number;
  price: number;
  stock: number;
}

const CheckProductsContent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const storeIds = [319, 324, 405];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
          throw new Error("商品の取得に失敗しました");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack justifyContent="center" alignItems="center" spacing={10}>
        <Heading>在庫の確認</Heading>
        <Card justifyContent="center" alignItems="center">
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList>
              {storeIds.map((id) => (
                <Tab key={id}>Store {id}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {storeIds.map((id) => (
                <TabPanel key={id}>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>商品名</Th>
                          <Th>個数</Th>
                          <Th isNumeric>金額</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {products
                          .filter((product) => product.store_id === id)
                          .map((product) => (
                            <Tr key={product.id}>
                              <Td>{product.name}</Td>
                              <Td>{product.stock}</Td>
                              <Td isNumeric>{product.price}</Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Card>
        <ChakraLink as={ReactRouterLink} to="/admin">
          <Button colorScheme="gray" width="150px">
            戻る
          </Button>
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default CheckProductsContent;
