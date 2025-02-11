import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="crud-python"
)
cursor = conn.cursor()

def format_rupiah(angka):
    return f"Rp {format(angka, ',').replace(',', '.')}"

def bersihkan_harga(input_harga):
    return int(input_harga.replace("Rp", "").replace(".", "").strip())

def tambah_barang(nama_barang, harga_input, stok):
    harga = bersihkan_harga(harga_input)
    sql = "INSERT INTO barang (nama_barang, harga, stok) VALUES (%s, %s, %s)"
    cursor.execute(sql, (nama_barang, harga, stok))
    conn.commit()
    print("Barang berhasil ditambahkan!")

def tampilkan_barang():
    cursor.execute("SELECT * FROM barang")
    barang_list = cursor.fetchall()
    print("\nDaftar Barang:")
    for barang in barang_list:
        harga_rupiah = format_rupiah(int(barang[2]))
        print(f"ID: {barang[0]}, Nama: {barang[1]}, Harga: {harga_rupiah}, Stok: {barang[3]}")

def perbarui_barang(id_barang, nama_barang, harga_input, stok):
    harga = bersihkan_harga(harga_input)
    sql = "UPDATE barang SET nama_barang=%s, harga=%s, stok=%s WHERE id=%s"
    cursor.execute(sql, (nama_barang, harga, stok, id_barang))
    conn.commit()
    print("Barang berhasil diperbarui!")

def hapus_barang(id_barang):
    sql = "DELETE FROM barang WHERE id=%s"
    cursor.execute(sql, (id_barang,))
    conn.commit()
    print("Barang berhasil dihapus!")

while True:
    print("\n=== MENU PENJUALAN ===")
    print("1. Tambah Barang")
    print("2. Tampilkan Barang")
    print("3. Perbarui Barang")
    print("4. Hapus Barang")
    print("5. Keluar")

    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        nama = input("Masukkan nama barang: ")
        harga = input("Masukkan harga (format: Rp 1.000.000): ")
        stok = int(input("Masukkan stok: "))
        tambah_barang(nama, harga, stok)

    elif pilihan == "2":
        tampilkan_barang()

    elif pilihan == "3":
        id_barang = int(input("Masukkan ID barang: "))
        nama = input("Masukkan nama baru: ")
        harga = input("Masukkan harga baru (format: Rp 10.000.000): ")
        stok = int(input("Masukkan stok baru: "))
        perbarui_barang(id_barang, nama, harga, stok)

    elif pilihan == "4":
        id_barang = int(input("Masukkan ID barang yang akan dihapus: "))
        hapus_barang(id_barang)

    elif pilihan == "5":
        print("Selamat Tinggal :D")
        break

    else:
        print("Pilihan tidak valid! Silakan coba lagi.")

cursor.close()
conn.close()