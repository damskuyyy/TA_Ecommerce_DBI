import { UserDataType } from "./userDataTypes";

interface OrderDataTypes {
  orderId: string,
  products: [{
    id: string,
    qty: number
  }],
  status: string,
  userId: string,
  orderDate: Date
  paymentProof: string,
  paymentMethods: string
}

export default OrderDataTypes;