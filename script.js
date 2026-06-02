// Fungsi pembaca file gambar secara aman
function prosesGambar(inputId, previewId) {
    return new Promise((resolve) => {
        const inputElement = document.getElementById(inputId);
        const previewElement = document.getElementById(previewId);

        if (inputElement && inputElement.files && inputElement.files[0]) {
            const pembaca = new FileReader();
            
            pembaca.onload = function(event) {
                previewElement.src = event.target.result;
                previewElement.style.display = 'inline-block'; // Tampilkan gambar
                resolve();
            };
            
            pembaca.readAsDataURL(inputElement.files[0]);
        } else {
            // Jika user tidak memilih gambar, sembunyikan penampungnya
            previewElement.style.display = 'none';
            resolve();
        }
    });
}

// Fungsi utama saat tombol "Generate" diklik
async function generateRaport() {
    // Ambil data teks biasa
    document.getElementById('prevNama').innerText = document.getElementById('nama').value;
    document.getElementById('prevKelas').innerText = document.getElementById('kelas').value;
    document.getElementById('prevNisn').innerText = document.getElementById('nisn').value;
    document.getElementById('prevSemester').innerText = document.getElementById('semester').value;
    document.getElementById('prevAgama').innerText = document.getElementById('agama').value;
    document.getElementById('prevdiri').innerText = document.getElementById('diri').value;
    document.getElementById('prevliterasi').innerText = document.getElementById('literasi').value;


    // Ambil data bagian bawah
    document.getElementById('prevKokurikuler').innerText = document.getElementById('kokurikuler').value;
    document.getElementById('prevSakit').innerText = document.getElementById('sakit').value || '0';
    document.getElementById('prevIzin').innerText = document.getElementById('izin').value || '0';
    document.getElementById('prevAlpa').innerText = document.getElementById('alpa').value || '0';
    document.getElementById('prevCatatan').innerText = document.getElementById('catatan').value;
    document.getElementById('prevKenaikan').innerText = document.getElementById('kenaikan').value;
    document.getElementById('prevTglCetak').innerText = document.getElementById('tglCetak').value;
    document.getElementById('prevNamaGuru').innerText = document.getElementById('namaGuru').value;
    document.getElementById('prevNamaKepsek').innerText = document.getElementById('namaKepsek').value;
    

    // PROSES KRITIKAL: Membaca Gambar 1 & Gambar 2 (Wajib ditunggu)
    await prosesGambar('inputFotojatidiri1', 'prevFotojatidiri1');
    await prosesGambar('inputFotojatidiri2', 'prevFotojatidiri2');
    await prosesGambar('inputFotoagama1', 'prevFotoagama1');
    await prosesGambar('inputFotoagama2', 'prevFotoagama2');
    await prosesGambar('inputFoto1', 'prevFoto1');
    await prosesGambar('inputFoto2', 'prevFoto2');
    
    alert("Raport Berhasil Di-generate! Silakan periksa di bagian bawah.");
}