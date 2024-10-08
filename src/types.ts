import { ChangeEvent, FormEvent } from "react";

export interface BookData {
    bookName: string;
}

export interface PaymentData {
    cardNumber: string;
    cardExpMonth: number;
    cardExpYear: number;
    cardCVV: string;
    cardholderName: string;
}

export interface PaymentResult {
    id: string;
    referenceId: string;
    amount: number;
    amountPennies: number;
    note?: string;
    status: 'Created' | 'Pending' | 'Failed' | 'Successful';
    createdAt: string;
    updatedAt: string;
}

export interface PaymentResponse {
    result: PaymentResult[];
}

export interface PaymentErrorResponse {
    error: string;
    message: string;
}

export interface CreatePaymentRequest {
    referenceId: string;
    amount: number;
    cardNumber: string;
    cardExpMonth: number;
    cardExpYear: number;
    cardholderName?: string;
    note?: string;
    processAt?: string;
}


export interface PaymentFormProps {
    fee: number | null;
    paymentData: PaymentData;
    setPaymentData: React.Dispatch<React.SetStateAction<PaymentData>>;
    handleSubmitPayment: (createPaymentData: CreatePaymentRequest) => Promise<void>;
    bookData: BookData;
}


export interface BookNameInputProps {
    bookName: string;
    handleChangeBookName: (event: ChangeEvent<HTMLInputElement>) => void;
    filteredBooks: string[];
    handleSelectBook: (name: string) => void;
    showDropdown: boolean;
    handleRestart: () => void;
    bookData: BookData;
    handleSubmitBookName: (e: FormEvent) => Promise<void>; 
}


export interface PaymentFormProps {
    fee: number | null;
    paymentData: PaymentData;
    setPaymentData: React.Dispatch<React.SetStateAction<PaymentData>>;
    handleSubmitPayment: (createPaymentData: CreatePaymentRequest) => Promise<void>;
    bookData: BookData;
}

export interface ReturnFormProps {
    bookName: string;
    setBookName: React.Dispatch<React.SetStateAction<string>>;
}

export interface PastPaymentsComponentProps {
    bookName: string; 
}