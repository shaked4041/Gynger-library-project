import React, { useEffect, useState } from 'react';
import { PastPaymentsComponentProps, PaymentErrorResponse, PaymentResult } from '../../types';
import { getPastPaymentsByBook } from '../../api';
import styles from './style.module.scss'
import { PaymentItem } from './PaymentItem';



const PastPaymentsComponent: React.FC<PastPaymentsComponentProps> = ({ bookName }) => {
    const [payments, setPayments] = useState<PaymentResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPayments = async () => {
        try {
            const result = await getPastPaymentsByBook(bookName);

            if ('error' in result && (result as PaymentErrorResponse).error) {
                setError((result as PaymentErrorResponse).message);
                console.log(error);
                setPayments([]);
            } else {
                const paymentResults = result as PaymentResult[];
                setPayments(paymentResults);
                setError(null);
            }
        } catch (err) {
            setError('Failed to fetch payments');
            console.error(err);
        }
    };

    useEffect(() => {
        if (bookName) {
            fetchPayments();
        }
    }, [bookName]);


    return (
        <div className={styles.tableContainer}>
            {payments.length > 0 ? (
                <ul>
                    <h4>Past Payments for "{bookName}":</h4>
                    {payments.map((payment) => (
                        <PaymentItem key={payment.id} payment={payment} />
                    ))}
                </ul>
            ) : (
                <p>No payments found</p>
            )}
        </div >
    );
};

export default PastPaymentsComponent;
