// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Text,
//   Box,
// } from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react";
// import { Product } from "./SelectProduct";

// interface Props {
//   selectedProducts: { [key: number]: number };
//   products: Product[]; // Product型の配列を受け取る
// }

// const PurchaseConfirm: React.FC<Props> = ({ selectedProducts, products }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   // 選択された商品の情報を取得する関数
//   const getSelectedProductInfo = (productId: number, stock: number) => {
//     const product = products.find(product => product.id === productId);
//     if (!product) return null;
//     return {
//       name: product.name,
//       stock: stock,
//       price: product.price,
//       total: product.price * stock
//     };
//   };

//   // 選択された商品の情報の配列を生成
//   const selectedProductInfoList = Object.entries(selectedProducts).map(([productId, stock]) => {
//     return getSelectedProductInfo(parseInt(productId), stock);
//   }).filter(info => info !== null) as { name: string, stock: number, price: number, total: number }[];

//   // 合計金額を計算
//   const totalPrice = selectedProductInfoList.reduce((total, info) => total + info.total, 0);

//   return (
//     <>
//       <Button onClick={onOpen} colorScheme='blue' mt="20">購入</Button>
      
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>購入確認</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text mb='5'>購入しますか？</Text>
//             {/* 選択された商品の情報を表示 */}
//             {selectedProductInfoList.map((info, index) => (
//               <Box key={index}>
//                 <Text>商品名: {info.name}</Text>
//                 <Text>個数: {info.stock}</Text>
//                 <Text>金額: {info.price}円</Text>
//                 <Text mb='2'>合計金額: {info.total}円</Text>
//                 <hr />
//               </Box>
//             ))}
//             {/* 合計金額を表示 */}
//             <Text mt='2'>合計支払金額: {totalPrice}円</Text>
//           </ModalBody>

//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onClose}>
//               キャンセル
//             </Button>
//             <Button colorScheme="blue">購入確定</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default PurchaseConfirm;




// import React from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Text,
//   TableContainer,
//   Table,
//   Thead,
//   Th,
//   Tbody,
//   Tr,
//   Td,
// } from "@chakra-ui/react";

// interface SelectedProduct {
//   name: string;
//   price: number;
//   quantity: number;
//   store_id: number;
// }

// interface PurchaseModalProps {
//   selectedProducts: SelectedProduct[];
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const PurchaseConfirm: React.FC<PurchaseModalProps> = ({ selectedProducts, isOpen, onClose, onConfirm }) => {
//   const totalAmount = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//   // console.log("test1")
//   // console.log(typeof selectedProducts.length)

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         {selectedProducts.length === 0 ? (
//           <>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text mt='5' textAlign='center'>商品足りてないって。</Text>
//             <Text mt='5' textAlign='center'>厳しいって。</Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme='yellow' onClick={onClose}>さっさと戻れよ。</Button>
//           </ModalFooter>
//         </>
//         ) : (
//           <>
//             <ModalHeader>購入確認</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <TableContainer>
//                 <Table variant='simple'>
//                   <Thead>
//                     <Tr>
//                       <Th>商品名</Th>
//                       <Th>個数</Th>
//                       <Th>部屋番号</Th>
//                       <Th>金額(円)</Th>
//                     </Tr>
//                   </Thead>
//                   {selectedProducts.map((product, index) => (
//                     <Tbody key={index}>
//                       <Tr>
//                         <Td>{product.name}</Td>
//                         <Td>{product.quantity}</Td>
//                         <Td>{product.store_id}</Td>
//                         <Td>{product.price * product.quantity}</Td>
//                       </Tr>
//                     </Tbody>
//                   ))}
//                 </Table>
//               </TableContainer>

//               <Text mt='5' textAlign='center'>合計金額: {totalAmount} 円</Text>
//             </ModalBody>

//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} onClick={onConfirm}>
//                 購入
//               </Button>
//               <Button variant="ghost" onClick={onClose}>キャンセル</Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// export default PurchaseConfirm;




import React from 'react';
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
} from "@chakra-ui/react";

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

const PurchaseConfirm: React.FC<PurchaseModalProps> = ({ selectedProducts, isOpen, onClose, onConfirm, isPurchaseComplete }) => {
  const totalAmount = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {isPurchaseComplete ? (
          <>
            <ModalHeader>購入ありがとうございました。購入内容は以下の通りです。</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant='simple'>
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
              <Text mt='5' textAlign='center'>合計金額: {totalAmount} 円</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                購入を続ける
              </Button>
              <Button variant="ghost" onClick={onClose}>購入を終わる</Button>
            </ModalFooter>
          </>
        ) : (
          <>
            {selectedProducts.length === 0 ? (
              <>
                <ModalCloseButton />
                <ModalBody>
                  <Text mt='5' textAlign='center'>商品足りてないって。何してんのお前。</Text>
                  <Text mt='5' textAlign='center'>厳しいって。</Text>
                  <Text mt='5' textAlign='center'>もうし⚪️よ。</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='yellow' onClick={onClose}>すみません戻ります...</Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader>購入確認</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <TableContainer>
                    <Table variant='simple'>
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
                  <Text mt='5' textAlign='center'>合計金額: {totalAmount} 円</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onConfirm}>
                    購入
                  </Button>
                  <Button variant="ghost" onClick={onClose}>キャンセル</Button>
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
