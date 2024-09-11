import { UserDataType } from "./userDataTypes";

interface OrderDataTypes {
  id: string;
  products: [];
  status: [];
  userId: string;
  xenditId: string;
  orderDate: Date;
  users: UserDataType[];
}

export default OrderDataTypes;