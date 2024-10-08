import axios from 'axios'
import { CreatePaymentRequest, PaymentResponse, PaymentErrorResponse, PaymentResult } from './types';

const createToken = async (): Promise<string> => {
    try {
        const response = await axios.post<{ token: string }>(`/api/auth-tokens`)
        const token = response.data.token
        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error creating token:', error.message);
            throw new Error(error.message);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred while creating the token.');
        }
    }
}

const getToken = async (): Promise<string> => {
    const token = localStorage.getItem('authToken');
    if (token) return token;
    try {
        return await createToken(); 
    } catch (error) {
        console.error('Error retrieving token:', error);
        throw new Error('Could not retrieve token. Please try again.');
    }
};

const createPayment = async (paymentData: CreatePaymentRequest): Promise<PaymentResponse | PaymentErrorResponse> => {
    try {
        const token = await getToken(); 
        const response = await axios.post<PaymentResponse>('/api/payments', paymentData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        });
        
        console.log('Payment created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('API response error:', error.response.data);
            return {
                error: "true", 
                message: error.response.data.error || 'Failed to create payment'
            } as PaymentErrorResponse;
        }
        return {
            error: "true", 
            message: 'Network error occurred while creating the payment.'
        } as PaymentErrorResponse;
    }
};


const parseNote = (note: string) => {
    const [payerName, bookName] = note.split(" - ");
    return { payerName, bookName };
};

const getPastPaymentsByBook = async (bookTitle?: string): Promise<PaymentResult[] | PaymentErrorResponse> => {
    try {
        const token = await getToken();
        const response = await axios.get<PaymentResponse>('/api/payments', {
            params: {
                authToken: token,
            },
        });

        if (!response.data || !response.data.result) {
            throw new Error('No payment results found');
        }

        const paymentResults = response.data.result.map((payment) => ({
            id: payment.id,
            referenceId: payment.referenceId,
            amountPennies: payment.amountPennies, 
            amount: payment.amount,
            note: payment.note,
            status: payment.status,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        }));


        const filteredPayments = paymentResults.filter((payment: PaymentResult) => {
            const parsedNote = parseNote(payment.note || "");
            return parsedNote.bookName === bookTitle;
        });

        console.log("Filtered payments:", filteredPayments);

        return filteredPayments;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                error: "true",
                message: error.response.data.error || 'Unable to fetch past payments',
            } as PaymentErrorResponse;
        }

        return {
            error: "true",
            message: 'Unable to fetch past payments',
        } as PaymentErrorResponse;
    }
};


export { createToken, createPayment, getPastPaymentsByBook }