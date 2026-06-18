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
    document.getElementById('prevlahir').innerText = document.getElementById('lahir').value;
    document.getElementById('prevInduk').innerText = document.getElementById('induk').value;
    document.getElementById('prevSemester').innerText = document.getElementById('semester').value;
    document.getElementById('prevpendahuluan').innerText = document.getElementById('pendahuluan').value;
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
    await prosesGambar('inputFotoagama1', 'prevFotoAgama1');
    await prosesGambar('inputFotoagama2', 'prevFotoAgama2');
    await prosesGambar('inputFoto1', 'prevFoto1');
    await prosesGambar('inputFoto2', 'prevFoto2');
    
    alert("Raport Berhasil Di-generate! Silakan periksa di bagian bawah.");
}

function exportKeWord() {
    // 1. Ambil seluruh isi HTML dari wadah rapot Anda
    const isiRaport = document.getElementById('raport').innerHTML;

    // 2. Template khusus Microsoft Word dengan pengunci warna (Anti-Dark Mode)
    const templateWord = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
        <meta charset="utf-8">
        <title>Raport Siswa</title>
        <style>
            /* KUNCI UTAMA: Paksa warna kertas selalu PUTIH dan teks HITAM di Word */
            body { 
                background-color: #ffffff !important; 
                color: #000000 !important; 
                font-family: 'Arial', 'Segoe UI', sans-serif;
                padding: 20px;
            }
            table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 15px; 
                background-color: #ffffff !important;
            }
            th, td { 
                border: 1px solid #000000 !important; 
                padding: 8px; 
                color: #000000 !important;
                vertical-align: top;
            }
            th { 
                background-color: #f2f2f2 !important; 
                font-weight: bold; 
                text-align: center; 
            }
            .text-isi-raport { 
                text-align: justify; 
                text-indent: 40px; 
                font-size: 11pt; 
                line-height: 1.5; 
                color: #000000 !important;
            }
            .photo-container-center { 
                text-align: center; 
                padding: 10px; 
            }
            /* Batasi ukuran gambar logo sekolah agar tidak raksasa di Word */
            img { 
                max-width: 120px; 
                height: auto; 
            }
        </style>
    </head>
    <body>
        <div style="background-color: #ffffff !important; color: #000000 !important;">
            ${isiRaport}
        </div>
    </body>
    </html>`;

    // 3. Proses konversi menjadi file dokumen Word
    const blob = new Blob(['\ufeff' + templateWord], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const linkUnduh = document.createElement('a');
    linkUnduh.href = url;
    
    // Nama file rapot saat diunduh
    linkUnduh.download = 'Raport_Siswa_TK.doc'; 
    
    document.body.appendChild(linkUnduh);
    linkUnduh.click();
    document.body.removeChild(linkUnduh);
}