import GroupSelect from "../components/GroupSelect"
import { Button } from '@chakra-ui/react'

const PurchasePage = () => {
  return (
    <>
      <GroupSelect />
      <Button colorScheme='blue' mt="20">購入</Button>
    </>
  )
}
export default PurchasePage