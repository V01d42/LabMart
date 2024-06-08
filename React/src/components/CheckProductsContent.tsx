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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const CheckProductsContent = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      <Card justifyContent="center" alignItems="center">
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
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td>{product.stock}</Td>
                  <Td isNumeric>{product.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default CheckProductsContent;
