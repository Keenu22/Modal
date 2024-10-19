import { useRef, useState } from "react";
import Form from "./Form";
import "./Modals.css"; // Assuming you have a CSS file for styling the Modal

export default function Modal() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  function handleForm() {
    if (modalRef.current) {
      modalRef.current.open();
      setIsModalOpen(true);
    }
  }

  // Function to handle closing the modal
  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <div className={isModalOpen ? "blur" : ""}>
        <h1 className="heading">User Details Modal</h1>
        <button onClick={handleForm} className="style">Open Form</button>
        <Form ref={modalRef} onClose={handleCloseModal} />
      </div>
    </>
  );
}
