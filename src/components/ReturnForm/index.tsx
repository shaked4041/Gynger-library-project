import styles from './style.module.scss'
import React, { useState, ChangeEvent, FormEvent} from "react";
import BookNameInput from "./BookNameInput";
import PaymentForm from "./PaymentForm";
import LoadingSpinner from "./LoadingSpinner";
import books from '../../data/mockBooks';
import { CreatePaymentRequest, PaymentData, BookData, ReturnFormProps } from '../../types';
import { createPayment } from "../../api";



const ReturnForm: React.FC<ReturnFormProps> = ({ bookName, setBookName }) => {
    const [bookData, setBookData] = useState<BookData>({ bookName: '' });
    const [filteredBooks, setFilteredBooks] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        cardExpMonth: 0,
        cardExpYear: 0,
        cardCVV: '',
        cardholderName: ''
    });
    const [fee, setFee] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleChangeBookName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBookName(value);
        const filtered = books.filter(book =>
            book.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBooks(filtered);
        setShowDropdown(true);
    };

    const handleSelectBook = (name: string) => {
        setBookName(name);
        setShowDropdown(false);
    };

    const handleRestart = () => {
        setBookName('');
        setFilteredBooks([]);
        setShowDropdown(false);
        setFee(null);
        setIsClicked(false);
        setBookData({ bookName: '' });
        setPaymentData({
            cardNumber: '',
            cardExpMonth: 0,
            cardExpYear: 0,
            cardCVV: '',
            cardholderName: ''
        });
    };


    const feeToPay = (): number => {
        return Math.floor(Math.random() * 100) + 1;
    };

    const handleSubmitBookName = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setBookData({ bookName });
        let fee = feeToPay();
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setFee(fee);
        setLoading(false);
    };

    const handleSubmitPayment = async (createPaymentData: CreatePaymentRequest) => {
        try {
            console.log("Payment Data being sent:", createPaymentData);
            const result = await createPayment(createPaymentData);
            if ('error' in result) {
                console.error(result.message); 
            } else {
                console.log('Payment created successfully:', result);
            }
        } catch (error) {
            console.error('Failed to create payment:', error);
        }
    };

    return (
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmitBookName}>
                    <BookNameInput
                        bookName={bookName}
                        handleChangeBookName={handleChangeBookName}
                        filteredBooks={filteredBooks}
                        handleSelectBook={handleSelectBook}
                        showDropdown={showDropdown}
                        handleRestart={handleRestart}
                        bookData={bookData}
                        handleSubmitBookName={handleSubmitBookName}
                    />
                </form>

                {loading && <LoadingSpinner />}

                {fee !== null && !loading && !isClicked && bookData.bookName && (
                    <div className={styles.returnContainer}>
                        <div className={styles.feeContainer}>Fee to Pay: {fee}$</div>
                        <button onClick={() => setIsClicked(true)}  className={styles.returnButton}>Return Book</button>
                    </div>
                )}

                {isClicked && (
                    <PaymentForm
                        fee={fee}
                        paymentData={paymentData}
                        setPaymentData={setPaymentData}
                        handleSubmitPayment={handleSubmitPayment}
                        bookData={bookData}
                    />
                )}
            </div>
    );
};

export default ReturnForm;
