// pages/dashboard/delete.js
import Sidebar from '../../components/Sidebar';
import DeleteConfirmation from '../../components/DeleteConfirmation';

export default function DeleteData() {
  const handleDelete = () => {
    // Logic for deleting data
  };

  const handleCancel = () => {
    // Logic for canceling delete
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">Delete Data</h1>
        <DeleteConfirmation onConfirm={handleDelete} onCancel={handleCancel} />
      </div>
    </div>
  );
}