import SelectGroup from "../components/SelectGroup"
import PurchaseConfirm from "../components/PurchaseConfirm"
import SelectProduct from "../components/SelectProduct"
import { StoreidStatusProvider } from "../components/StoreidStatus"

const PurchasePage = () => {
  return (
    <>
      <StoreidStatusProvider>
        <SelectGroup />
        <SelectProduct />
      </StoreidStatusProvider>

      {/* <PurchaseConfirm /> */}
    </>
  )
}
export default PurchasePage