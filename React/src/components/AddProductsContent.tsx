import {
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  VStack,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link as ChakraLink,
  RadioGroup,
  Stack,
  Radio,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { requestWithAuth } from "../RequestWithAuth";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  stock: number;
  onAddProduct: () => void;
  isAdded: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  productName,
  price,
  stock,
  onAddProduct,
  isAdded,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{isAdded ? "追加完了" : "確認"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {isAdded ? (
          <p>商品を追加しました</p>
        ) : (
          <>
            <p>追加しますか？</p>
            <p>商品名: {productName}</p>
            <p>価格: {price}</p>
            <p>数量: {stock}</p>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {isAdded ? (
          <>
            <ChakraLink as={ReactRouterLink} to="/admin">
              <Button colorScheme="gray" mr={3}>
                追加を終わる
              </Button>
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/admin/add-products">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                追加を続ける
              </Button>
            </ChakraLink>
          </>
        ) : (
          <>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onAddProduct}>
              追加
            </Button>
          </>
        )}
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const AddProductsContent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [value, setValue] = useState<string>("319");

  const handleProductNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductName(e.target.value);
    },
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(e.target.value);
    },
    []
  );

  const handleStockChange = useCallback((valueString: string) => {
    setStock(Number(valueString));
  }, []);

  const handleAddProduct = useCallback(async () => {
    // APIを叩いて商品を追加する処理
    const productData = {
      name: productName,
      description: "",
      store_id: value,
      price: Number(price),
      stock: stock,
      admin_id: 1,
    };

    try {
      const response = await requestWithAuth("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      // レスポンスの処理
      if (!response.ok) {
        throw new Error("商品の追加に失敗しました");
      }

      const result = await response.json();
      console.log("商品が正常に追加されました:", result);

      // 入力フィールドをリセット
      setProductName("");
      setPrice("");
      setStock(1);
      setIsAdded(true);
    } catch (error) {
      console.error(error);
    }
  }, [productName, price, stock, value]);

  const handleClose = useCallback(() => {
    // モーダルを閉じるときに追加完了ステートをリセット
    setIsAdded(false);
    onClose();
  }, [onClose]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <VStack justifyContent="center" alignItems="center" spacing={10}>
          <Heading>商品追加</Heading>
          <RadioGroup onChange={setValue} value={value} colorScheme="teal">
            <Stack direction="row">
              <Radio value="319">319</Radio>
              <Radio value="324">324</Radio>
              <Radio value="405">405</Radio>
            </Stack>
          </RadioGroup>
          <Input
            placeholder="商品名"
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
          <Input
            placeholder="価格"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <NumberInput
            defaultValue={1}
            min={1}
            value={stock}
            onChange={handleStockChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box>
            <ChakraLink as={ReactRouterLink} to="/admin">
              <Button bg={"teal.400"} color={"white"} width="100px" mr={2}>
                戻る
              </Button>
            </ChakraLink>
            <Button
              bg={"teal.400"}
              color={"white"}
              width="100px"
              onClick={onOpen}
              ml={2}
            >
              追加
            </Button>
          </Box>
        </VStack>
      </Flex>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        productName={productName}
        price={price}
        stock={stock}
        onAddProduct={handleAddProduct}
        isAdded={isAdded}
      />
    </Box>
  );
};

export default AddProductsContent;
