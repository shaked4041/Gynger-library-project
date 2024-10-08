import React, { ChangeEvent } from "react";
import { CreatePaymentRequest, PaymentFormProps } from '../../../types';
import styles from './style.module.scss'


const PaymentForm: React.FC<PaymentFormProps> = ({
    fee,
    paymentData,
    setPaymentData,
    handleSubmitPayment,
    bookData
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const createPaymentData: CreatePaymentRequest = {
            referenceId: `${bookData.bookName}-${Date.now()}`,
            amount: fee ?? 0,
            cardNumber: paymentData.cardNumber,
            cardExpMonth: paymentData.cardExpMonth,
            cardExpYear: paymentData.cardExpYear,
            cardholderName: paymentData.cardholderName,
            note: `${paymentData.cardholderName} - ${bookData.bookName}`,
            processAt: "now"
        };
        handleSubmitPayment(createPaymentData);
    };

    return (
        <div className={styles.mainFormContainer}>
        <form onSubmit={handleSubmit} className={styles.inputGroup}>
            <input
                type="text"
                name="cardholderName"
                placeholder="Payer Name"
                value={paymentData.cardholderName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (xxxx xxxx xxxx xxxx)"
                value={paymentData.cardNumber}
                onChange={handleChange}
                maxLength={16}
            />
            <input
                type="text"
                name="cardExpMonth"
                placeholder="Expiration Month (MM)"
                value={paymentData.cardExpMonth.toString()}
                onChange={handleChange}
                maxLength={2}
            />
            <input
                type="text"
                name="cardExpYear"
                placeholder="Expiration Year (YYYY)"
                value={paymentData.cardExpYear.toString()}
                onChange={handleChange}
                maxLength={4}
            />
            <input
                type="text"
                name="cardCVV"
                placeholder="CVV"
                value={paymentData.cardCVV}
                onChange={handleChange}
                maxLength={3}
            />
            <button className={styles.payButton} type="submit">Pay {fee}$</button>
        </form>
        </div>
    );
};

export default PaymentForm;
