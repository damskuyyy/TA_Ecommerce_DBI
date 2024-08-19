interface OrderDataTypes {
    id: string;
    date: string;
    customer: string;
    variant: string;
    quantity: number;
    status: "Completed" | "Processing" | "Rejected";
    amount: number;
  }