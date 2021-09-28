import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { CurrentModal, Overlay, Img, CloseBtn } from "./Modal.styled";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, src }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeModal = () => {
    onClose();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <CurrentModal>
        <Img src={src} width="1000px" />
        <CloseBtn type="button" onClick={closeModal}>
          <MdClose size="2em" />
        </CloseBtn>
      </CurrentModal>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
