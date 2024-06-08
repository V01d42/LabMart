// import React, { useEffect, useState } from "react";
// import { useStore } from "./StoreidStatus";
// import { Card, CardBody, Text, Select, Button } from "@chakra-ui/react";
// import PurchaseConfirm from "./PurchaseConfirm";

// export interface Product {
//   name: string;
//   description: string;
//   store_id: number;
//   price: number;
//   stock: number;
//   id: number;
//   admin_id: number;
//   created_at: string;
//   updated_at: string;
// }

// const SelectProduct: React.FC = () => {
//   const { selectedStoreId } = useStore();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [selectedProducts, setSelectedProducts] = useState<{
//     [key: number]: number;
//   }>({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/products");
//         const data: Product[] = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching the products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const filtered = products.filter(
//       (product) => product.store_id === selectedStoreId
//     );
//     setFilteredProducts(filtered);
//   }, [products, selectedStoreId]);

//   const handleQuantityChange = (productId: number, quantity: number) => {
//     setSelectedProducts({ ...selectedProducts, [productId]: quantity });
//   };

//   const handleRemoveProduct = (productId: number) => {
//     const updatedSelectedProducts = { ...selectedProducts };
//     delete updatedSelectedProducts[productId];
//     setSelectedProducts(updatedSelectedProducts);
//   };

//   return (
//     <>
//       <Text mt="5">購入したい商品を選んでください</Text>

//       {filteredProducts.map((product) => (
//         <Card key={product.id} mt="5">
//           <CardBody>
//             <Text>
//               <Text>
//                 {product.name} {product.price}円 残り{product.stock}個
//               </Text>
//               <Select
//                 placeholder="購入数"
//                 onChange={(e) =>
//                   handleQuantityChange(product.id, parseInt(e.target.value))
//                 }
//               >
//                 {Array.from({ length: product.stock }, (_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1}
//                   </option>
//                 ))}
//               </Select>
//               <Button
//                 colorScheme="red"
//                 onClick={() => {
//                   handleRemoveProduct(product.id);
//                   handleQuantityChange(product.id, 0); // 購入数を空にする
//                 }}
//               >
//                 削除
//               </Button>
//             </Text>
//           </CardBody>
//         </Card>
//       ))}

//       <PurchaseConfirm
//         selectedProducts={selectedProducts}
//         products={products}
//       />
//     </>
//   );
// };

// export default SelectProduct;


import { Card } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

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
}

const SelectProduct: React.FC<ProductListProps> = ({ selectedGroup, selectedProducts, onProductSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://127.0.0.1:8000/products');
      const data = await response.json();
      const filteredProducts = data.filter(
        (product: Product) => product.store_id === selectedGroup
      );
      setProducts(filteredProducts);
    };

    fetchProducts();
  }, [selectedGroup]);

  const handleQuantityChange = (product: Product, quantity: number) => {
    onProductSelect({ ...product, quantity }, quantity);
  };

  return (
    <div>
      {products.map((product) => {
        const selectedProduct = selectedProducts.find((p) => p.id === product.id);
        const initialQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <Card key={product.id} mt='5'>
            <span>{product.name}</span>
            <select
              value={initialQuantity}
              onChange={(e) => handleQuantityChange(product, parseInt(e.target.value, 10))}
            >
              {[...Array(product.stock + 1).keys()].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </Card>
        );
      })}
    </div>
  );
};

export default SelectProduct;
