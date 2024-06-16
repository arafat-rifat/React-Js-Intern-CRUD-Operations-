import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ show, onClose, onSubmit, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex items-center justify-between gap-2 mb-5">
          <h3 className="font-bold">Add User</h3>
          <button className="text-red-600 text-2xl" onClick={onClose}>
            <IoMdCloseCircleOutline />
          </button>
        </div>
        <div className="modal-content flex flex-col gap-2">{children}</div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
