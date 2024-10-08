import React from "react";
import styles from './style.module.scss'
import { IoIosClose, IoMdSearch } from "react-icons/io";
import { BookNameInputProps } from "../../../types";



const BookNameInput: React.FC<BookNameInputProps> = ({
    bookName,
    handleChangeBookName,
    filteredBooks,
    handleSelectBook,
    showDropdown,
    handleRestart,
    bookData,
    handleSubmitBookName
}) => {
    return (
        <div className={styles.bookNameContainer}>
            <div className={styles.inputRow}>
                {bookData.bookName ? (
                    <div>
                        <span>{bookData.bookName}</span>
                    </div>
                ) : (
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={bookName}
                            onChange={handleChangeBookName}
                            placeholder="Enter book name"
                        />
                        <button onClick={handleSubmitBookName} className={styles.searchButton} type="submit"><IoMdSearch /></button>
                    </div>
                )}
                <button onClick={handleRestart} className={styles.closeButton} type="button"><IoIosClose /></button>
            </div>
            {showDropdown && !bookData.bookName && (
                <ul className={styles.dropdown}>
                    {filteredBooks.map((book) => (
                        <li key={book} onClick={() => handleSelectBook(book)}>
                            {book}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookNameInput;
