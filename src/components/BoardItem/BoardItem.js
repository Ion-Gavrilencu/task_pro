import React, { useContext, useState } from 'react';
import { BoardContext } from '../../context/BoardContext';
import styles from './BoardItem.module.css';
import ModalEditBoard from '../ModalEditBoard/ModalEditBoard';

function BoardItem({ board, isActive, onSelect }) {
    const { deleteBoard } = useContext(BoardContext);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        deleteBoard(board._id);
    };

    return (
        <div
            className={`${styles.boardItem} ${isActive ? styles.active : ''}`}
            onClick={() => onSelect(board._id)}
        >
            <span className={styles.boardName}>{board.name}</span>

            <div className={styles.actions}>
                <button className={styles.editBtn} onClick={handleEditClick}>
                    +
                </button>
                <button className={styles.deleteBtn} onClick={handleDeleteClick}>
                    x
                </button>
            </div>

            {showEditModal && (
                <ModalEditBoard
                    board={board}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
}

export default BoardItem;
