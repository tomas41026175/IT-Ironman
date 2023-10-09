import React, { useState } from "react";
import { createPortal } from "react-dom";

// Modal component
const Modal = ({ children, isVisible, close }) => {
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center">
      <div className="w-1/2 min-w-[300px] bg-white p-5 rounded-[4px]">
        <div className="w-full text-center">
          {children}
          <button
            onClick={close}
            className=" bg-red-500 text-white py-1 px-2 rounded-md"
          >
            關閉
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};``

// useModal hook
const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }) => (
    <Modal isVisible={isVisible} close={hide}>
      {children}
    </Modal>
  );

  return {
    // isVisible,
    show,
    hide,
    RenderModal,
  };
};

export default useModal;
