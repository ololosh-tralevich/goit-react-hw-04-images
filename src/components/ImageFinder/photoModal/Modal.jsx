import { useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

function Modal({ closeModal, children }) {
  useEffect(() => {
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  const close = ev => {
    if (ev.code === 'Escape') {
      return closeModal();
    }
    if (ev.target === ev.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={close} className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={close} className={styles.closeModalBtn}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default memo(Modal);
