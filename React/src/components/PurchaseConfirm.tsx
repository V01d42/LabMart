import React from "react";
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
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface SelectedProduct {
  name: string;
  price: number;
  quantity: number;
  store_id: number;
}

interface PurchaseModalProps {
  selectedProducts: SelectedProduct[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPurchaseComplete: boolean;
}

const PurchaseConfirm: React.FC<PurchaseModalProps> = ({
  selectedProducts,
  isOpen,
  onClose,
  onConfirm,
  isPurchaseComplete,
}) => {
  const totalAmount = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {isPurchaseComplete ? (
          <>
            <ModalHeader>
              ご購入ありがとうございました！
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>商品名</Th>
                      <Th>個数</Th>
                      <Th>部屋番号</Th>
                      <Th>金額(円)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedProducts.map((product, index) => (
                      <Tr key={index}>
                        <Td>{product.name}</Td>
                        <Td>{product.quantity}</Td>
                        <Td>{product.store_id}</Td>
                        <Td>{product.price * product.quantity}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Text mt="5" textAlign="center">
                合計金額: {totalAmount} 円
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button bg={"teal.400"} color={"white"} mr={3} onClick={onClose}>
                購入を続ける
              </Button>
              <ChakraLink as={ReactRouterLink} to="/">
                <Button onClick={onClose}>
                  購入を終わる
                </Button>
              </ChakraLink>
            </ModalFooter>
          </>
        ) : (
          <>
            {selectedProducts.length === 0 ? (
              <>
                <ModalCloseButton />
                <ModalBody>
                  <Text mt="5" textAlign="center">
                    商品足りてないって。何してんのお前。
                  </Text>
                  <Text mt="5" textAlign="center">
                    厳しいって。
                  </Text>
                  <Text mt="5" textAlign="center">
                    し⚪️よ。
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="yellow" onClick={onClose}>
                    すみません戻ります...
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader>購入確認</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <TableContainer>
                    <Table size="sm" variant="simple">
                      <Thead>
                        <Tr>
                          <Th>商品名</Th>
                          <Th>個数</Th>
                          <Th>部屋番号</Th>
                          <Th>金額(円)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {selectedProducts.map((product, index) => (
                          <Tr key={index}>
                            <Td>{product.name}</Td>
                            <Td>{product.quantity}</Td>
                            <Td>{product.store_id}</Td>
                            <Td>{product.price * product.quantity}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Text mt="5" textAlign="center">
                    合計金額: {totalAmount} 円
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    bg={"teal.400"}
                    color={"white"}
                    mr={3}
                    onClick={onConfirm}
                  >
                    購入
                  </Button>
                  <Button onClick={onClose}>
                    キャンセル
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PurchaseConfirm;
