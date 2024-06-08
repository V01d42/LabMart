// import SelectGroup from "../components/SelectGroup"
// import PurchaseConfirm from "../components/PurchaseConfirm"
// import SelectProduct from "../components/SelectProduct"
// import { StoreidStatusProvider } from "../components/StoreidStatus"

// const PurchasePage = () => {
//   return (
//     <>
//       <StoreidStatusProvider>
//         <SelectGroup />
//         <SelectProduct />
//       </StoreidStatusProvider>

//       {/* <PurchaseConfirm /> */}
//     </>
//   )
// }
// export default PurchasePage

import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import SelectGroup from '../components/SelectGroup';
import SelectProduct from '../components/SelectProduct';
import PurchaseConfirm from '../components/PurchaseConfirm';

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

const PurchasePage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(319);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGroupSelect = (group: number) => {
    setSelectedGroup(group);
  };

  const handleProductSelect = (product: SelectedProduct, quantity: number) => {
    setSelectedProducts((prevProducts) => {
      if (quantity === 0) {
        return prevProducts.filter((p) => p.id !== product.id);
      } else {
        const existingProduct = prevProducts.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity = quantity;
          return [...prevProducts];
        } else {
          return [...prevProducts, product];
        }
      }
    });
  };

  const handleConfirm = () => {
    // ここに購入後の処理を記述する (今は購入品をコンソールで表示するだけ)
    console.log('Purchased:', selectedProducts);
    {selectedProducts.map((product, index) => (
      console.log(product.name)
    ))}
    onClose();
  };

  return (
    <div>
      <SelectGroup onGroupSelect={handleGroupSelect} />
      <SelectProduct
        selectedGroup={selectedGroup}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
      />
      <Button colorScheme="blue" mt='10' onClick={onOpen}>購入</Button>
      <PurchaseConfirm
        selectedProducts={selectedProducts}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default PurchasePage;

