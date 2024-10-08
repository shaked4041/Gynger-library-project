import { PaymentResult } from "../../../types";

export const PaymentItem: React.FC<{ payment: PaymentResult }> = ({ payment }) => {

    const parseNote = (note: string) => {
        const parts = note.split(" - ");
        return {
            payerName: parts[0] || 'Unknown Payer',
            bookName: parts[1] || 'Unknown Book',
        };
    };
    

    const { payerName } = parseNote(payment.note || "No details available");

    return (
        <li key={payment.id}>
            {payment.note ? (
                <>
                    Payer: {payerName} -
                    Amount: ${(payment.amountPennies / 100).toFixed(2)} -
                    Status: {payment.status || 'N/A'} -
                    Date Paid: {new Date(payment.createdAt).toLocaleDateString() || 'N/A'}
                </>
            ) : (
                <span>No details available</span>
            )}
        </li>
    );
};
