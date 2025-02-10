/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { HomeIcon, ChartBarIcon, CogIcon } from "@heroicons/react/outline";

export default function AdminDashboard() {
  const [barangs, setBarangs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [newBarang, setNewBarang] = useState({ nama_barang: "", harga: "", stok: "" });
  const [editBarang, setEditBarang] = useState(null);

  useEffect(() => {
    fetchBarangs();
  }, [search, page]);

  const fetchBarangs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/barang`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const filteredData = data.filter((item) =>
          item.nama_barang.toLowerCase().includes(search.toLowerCase())
        );

        setTotalPages(Math.ceil(filteredData.length / limit));
        setBarangs(filteredData.slice((page - 1) * limit, page * limit));
      } else {
        setBarangs([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddBarang = async () => {
    if (!newBarang.nama_barang || !newBarang.harga || !newBarang.stok) {
      alert("Harap isi semua kolom!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/barang`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBarang),
      });

      if (response.ok) {
        setNewBarang({ nama_barang: "", harga: "", stok: "" });
        fetchBarangs();
        alert("Barang berhasil ditambahkan!");
      } else {
        console.error("Gagal menambahkan barang.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditBarang = (barang) => {
    setEditBarang({ ...barang }); // Simpan data barang yang dipilih untuk diedit
  };

  const handleUpdateBarang = async () => {
    if (!editBarang || !editBarang.id) {
      alert("Pilih barang yang akan diupdate!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/barang/${editBarang.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_barang: editBarang.nama_barang,
          harga: parseFloat(editBarang.harga),
          stok: parseInt(editBarang.stok, 10),
        }),
      });

      if (response.ok) {
        setEditBarang(null);
        fetchBarangs();
        alert("Barang berhasil diperbarui!");
      } else {
        console.error("Gagal memperbarui barang.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteBarang = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) return;

    try {
      const response = await fetch(`http://localhost:5000/barang/${id}`, { method: "DELETE" });

      if (response.ok) {
        fetchBarangs();
        alert("Barang berhasil dihapus!");
      } else {
        console.error("Gagal menghapus barang.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
  <div className="flex flex-col min-h-screen bg-orange-900">
    <div className="flex min-h-screen bg-orange-900">
      {/* SIDEBAR */}
      <div className= "w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4 text-center">
          <img src="/pic/input-onlinepngtools.png" alt="Logo" className="w-6 h-6 mr-2" />
          Admin Panel
        </h2>
        <div className="space-y-4">
          <p className="flex items-center p-2 hover:bg-blue-700">
          <img src="/pic/icon-dashboard.png" alt="Dashboard" className="w-6 h-6 mr-2" />
            Dashboard
          </p>
          <p className="flex items-center p-2 hover:bg-blue-700">
            <img src="/pic/icon-laporan.png" alt="Laporan" className="w-2 h-2 mr-2" />
            Laporan
          </p>
          <p className="flex items-center p-2 hover:bg-blue-700">
            <img src="/pic/icon-setting.png" alt="Pengaturan" className="w-6 h-6 mr-2" />
            Pengaturan
          </p>
          <button className="bg-red-500 text-white w-full py-2 rounded">Logout</button>
        </div>
      </div>
      {/* CONTENT */}
      <div className="flex-1 p-6">
        <div className="bg-green-500 shadow-md p-4 flex rounded-lg mt-4 justify-between items-center">
          <h1 className="text-2xl font-bold text-center">Welcome</h1>"
        </div>

        {/* FORM TAMBAH / EDIT BARANG */}
        <div className="bg-yellow-500 p-4 shadow-md rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">{editBarang ? "Edit Barang" : "Tambah Barang"}</h2>
          <input
            type="text"
            placeholder="Nama Barang"
            value={editBarang?.nama_barang || newBarang.nama_barang}
            onChange={(e) =>
              editBarang
                ? setEditBarang({ ...editBarang, nama_barang: e.target.value })
                : setNewBarang({ ...newBarang, nama_barang: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Harga"
            value={editBarang?.harga || newBarang.harga}
            onChange={(e) =>
              editBarang
                ? setEditBarang({ ...editBarang, harga: e.target.value })
                : setNewBarang({ ...newBarang, harga: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Stok"
            value={editBarang?.stok || newBarang.stok}
            onChange={(e) =>
              editBarang
                ? setEditBarang({ ...editBarang, stok: e.target.value })
                : setNewBarang({ ...newBarang, stok: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={editBarang ? handleUpdateBarang : handleAddBarang}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editBarang ? "Update Barang" : "Tambah Barang"}
          </button>
          {editBarang && (
            <button onClick={() => setEditBarang(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              Batal Edit
            </button>
          )}
        </div>

        {/* TABLE BARANG */}
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg justify-between items-center">
          <div className="bg-white p-2 flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Daftar Barang</h2>
            <input
              type="text"
              placeholder="Cari barang...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded"
            />
            <br></br>
          </div>
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">No</th>
                <th className="border p-2">Nama Barang</th>
                <th className="border p-2">Harga</th>
                <th className="border p-2">Stok</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barangs.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{(page - 1) * limit + index + 1}</td>
                  <td className="border p-2">{item.nama_barang}</td>
                  <td className="border p-2 text-center">Rp {item.harga}</td>
                  <td className="border p-2 text-center">{item.stok}</td>
                  <td className="border p-2 text-center">
                    <button onClick={() => handleEditBarang(item)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteBarang(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>©2025 Randy Febrian. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
