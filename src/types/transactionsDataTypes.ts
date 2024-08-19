import { ReactElement } from "react";

export interface TransactionsData {
    title: string;
    value: string | number;
    description: string;
    descriptionColor: 'text-green-500' | 'text-red-500' | 'text-yellow-500';
    icon?: ReactElement; // Optional icon prop
  }