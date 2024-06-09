import {
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface Product {
  name: string;
  description: string;
  store_id: number;
  price: number;
  stock: number;
  id: number;
}

interface SelectedProduct extends Product {
  quantity: number;
}

interface ProductListProps {
  selectedGroup: number;
  selectedProducts: SelectedProduct[];
  onProductSelect: (product: SelectedProduct, quantity: number) => void;
  products: Product[];
}

const SelectProduct: React.FC<ProductListProps> = ({
  selectedGroup,
  selectedProducts,
  onProductSelect,
  products,
}) => {
  const handleQuantityChange = (product: Product, quantity: number) => {
    onProductSelect({ ...product, quantity }, quantity);
  };

  return (
    <>
      <TableContainer mt="10">
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>商品名</Th>
              <Th>金額(円)</Th>
              <Th>購入数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => {
              const selectedProduct = selectedProducts.find(
                (p) => p.id === product.id
              );
              const initialQuantity = selectedProduct
                ? selectedProduct.quantity
                : 0;

              return (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                  <Select
                    size="sm"
                    value={initialQuantity}
                    onChange={(e) =>
                      handleQuantityChange(product, parseInt(e.target.value, 10))
                    }
                    focusBorderColor="teal.400"
                  >
                      {[...Array(product.stock + 1).keys()].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </Select>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SelectProduct;
