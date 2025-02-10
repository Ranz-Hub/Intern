// components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64">
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link href="/dashboard/list" className="block p-4 hover:bg-gray-700">List Data</Link>
          </li>
          <li>
            <Link href="/dashboard/add" className="block p-4 hover:bg-gray-700">Add Data</Link>
          </li>
          <li>
            <Link href="/dashboard/edit" className="block p-4 hover:bg-gray-700">Edit Data</Link>
          </li>
          <li>
            <Link href="/dashboard/delete" className="block p-4 hover:bg-gray-700">Delete Data</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}