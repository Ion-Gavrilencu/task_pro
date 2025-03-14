import React, { useState, useContext } from "react";
import { updateColumn } from "../../../services/api";
import styles from "./EditColumnModal.module.css";
import sprite from "../../../assets/icons/icons.svg";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";

function EditColumnModal({ column, onClose, onColumnUpdated }) {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState(column.title || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const columnData = { title };
  
      //updateColumn cu boardId si columnId
      const response = await updateColumn(token, column.boardId, column._id, columnData);
  
      if (onColumnUpdated) {
        onColumnUpdated(response.data);
      }
      onClose();
    } catch (err) {
      setError("Failed to update column. Please try again.");
      console.error("Error updating column:", err);
    }
  };
  
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} style = {{background: theme.sidebarBackground}}>
        <div className={styles.modalHeader}>
          <h2 style = {{color: theme.h2}}>Edit column</h2>
          <button className={styles.closeButton} style={{color: theme.text}} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-close`}></use>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter column title"
              className={styles.input} style = {{background: theme.inputBackground, color: theme.text}}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton} style = {{background: theme.inputBackground, color: theme.text}} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditColumnModal;
