// pages/dashboard/edit.js
import Sidebar from '../../components/Sidebar';

export default function EditData() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">Edit Data</h1>
        <form className="mt-4">
          <div>
            <label className="block">Name</label>
            <input type="text" className="border rounded p-2 w-full" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      </div>
    </div>
  );
}