let dataPayment = localStorage.getItem("payment");
dataPayment = JSON.parse(dataPayment);
let user = localStorage.getItem("user");
user = JSON.parse(user);
const visibility = document.getElementById("visibility");

function confirmation() {
  const checkbox = document.getElementById("kebijakan-privacy");
  const nomorhp = document.getElementById("nomorhp");

  if (checkbox.checked == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Kamu harus menyetujui kebijakan privasi!",
    });
    return false;
  } else if (nomorhp.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nomor hp tidak boleh kosong!",
    });
    return false;
  }

  Swal.fire({
    title: "Apakah semua data sudah benar?",
    text: "Pastikan semua data sudah benar ya",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, sudah benar!",
  }).then((result) => {
    if (result.isConfirmed) {
      const paymentFull = {
        userId: user.id,
        konselorName: dataPayment.name,
        tanggal: dataPayment.tglKonseling,
        metodeKonsultasi: dataPayment.metodeKonseling,
        hargaTotal: dataPayment.hargaRP - 5000,
        visibility: visibility.value,
      };

      // post data to backend
      fetch("https://6526bf02917d673fd76cf235.mockapi.io/api/pemesanan", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentFull),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          localStorage.removeItem("payment");
          window.location.href = "./success.html";
        });
    }
  });
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

console.log(dataPayment);

const nama = document.getElementById("name");
const gambar = document.getElementById("img");
const namaKonselor = document.getElementById("namadokter");
const harga = document.getElementById("hargadokter");
const tggl = document.getElementById("tgl-konseling");
const hargaAsli = document.getElementById("harga-asli");
const hargaAfter = document.getElementById("harga-after");
const hargaAsli2 = document.getElementById("harga-asli2");
const hargaAfter2 = document.getElementById("harga-after2");

nama.value = user.username;
gambar.src = dataPayment.image;
namaKonselor.innerHTML = dataPayment.name;
harga.innerHTML = "@" + rupiah(dataPayment.hargaRP) + " / hour";
tggl.value = dataPayment.tglKonseling;
hargaAsli.innerHTML = rupiah(dataPayment.hargaRP);
hargaAfter.innerHTML = rupiah(dataPayment.hargaRP - 5000);

hargaAsli2.innerHTML = rupiah(dataPayment.hargaRP);
hargaAfter2.innerHTML = rupiah(dataPayment.hargaRP - 5000);
