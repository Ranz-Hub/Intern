// components/DeleteConfirmation.js
export default function DeleteConfirmation({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-bold">Are you sure you want to delete this item?</h2>
          <div className="mt-4">
            <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">Delete</button>
            <button onClick={onCancel} className="ml-2 p-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
    );
  }