import { Card, CardBody, Select, Text } from "@chakra-ui/react";
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
  products
}) => {
  const handleQuantityChange = (product: Product, quantity: number) => {
    onProductSelect({ ...product, quantity }, quantity);
  };

  return (
    <div>
      {products.map((product) => {
        const selectedProduct = selectedProducts.find(
          (p) => p.id === product.id
        );
        const initialQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <Card key={product.id} mt="5">
            <CardBody>
              <Text>{product.name}</Text>
              <Select
                size="sm"
                value={initialQuantity}
                onChange={(e) =>
                  handleQuantityChange(product, parseInt(e.target.value, 10))
                }
              >
                {[...Array(product.stock + 1).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default SelectProduct;
