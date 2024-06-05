import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const PurchaseConfirm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' mt="20">購入</Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>購入確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>購入しますか？</p>
            <p>---購入内容表示---</p>
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
