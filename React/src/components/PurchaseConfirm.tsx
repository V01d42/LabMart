import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Product } from "./SelectProduct";

interface Props {
  selectedProducts: { [key: number]: number };
  products: Product[]; // Product型の配列を受け取る
}

const PurchaseConfirm: React.FC<Props> = ({ selectedProducts, products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 選択された商品の情報を取得する関数
  const getSelectedProductInfo = (productId: number, quantity: number) => {
    const product = products.find(product => product.id === productId);
    if (!product) return null;
    return {
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: product.price * quantity
    };
  };

  // 選択された商品の情報の配列を生成
  const selectedProductInfoList = Object.entries(selectedProducts).map(([productId, quantity]) => {
    return getSelectedProductInfo(parseInt(productId), quantity);
  }).filter(info => info !== null) as { name: string, quantity: number, price: number, total: number }[];

  // 合計金額を計算
  const totalPrice = selectedProductInfoList.reduce((total, info) => total + info.total, 0);

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' mt="20">購入</Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>購入確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='5'>購入しますか？</Text>
            {/* 選択された商品の情報を表示 */}
            {selectedProductInfoList.map((info, index) => (
              <Box key={index}>
                <Text>商品名: {info.name}</Text>
                <Text>個数: {info.quantity}</Text>
                <Text>金額: {info.price}円</Text>
                <Text mb='2'>合計金額: {info.total}円</Text>
                <hr />
              </Box>
            ))}
            {/* 合計金額を表示 */}
            <Text mt='2'>合計支払金額: {totalPrice}円</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="blue">購入確定</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PurchaseConfirm;
