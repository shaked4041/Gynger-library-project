import styles from './style.module.scss'
import ReturnForm from '../../components/ReturnForm'
import { useState } from 'react';
import PastPaymentsComponent from '../../components/PaymentTable';

const FormPage = () => {

  const [bookName, setBookName] = useState<string>('');

  return (
    <div className={styles.tableContainer}>
      <div className={styles.formContainer}>
        <ReturnForm bookName={bookName} setBookName={setBookName} />
      </div>
      <div className={styles.paymentsContainer}>
        <PastPaymentsComponent bookName={bookName} />
      </div>
    </div>
  );
};

export default FormPage;
