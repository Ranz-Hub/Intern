// pages/dashboard/list.js
import Sidebar from '../../components/Sidebar';

export default function ListData() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">List Data</h1>
        <table className="min-w-full mt-4 border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Data rows will go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}