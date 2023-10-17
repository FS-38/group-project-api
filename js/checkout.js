function confirmation() {
  const checkbox = document.getElementById("kebijakan-privacy");
  const nomorhp = document.getElementById("nomorhp");

  if (checkbox.checked == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Kau harus menyetujui kebijakan privasi!",
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
    text: "Kamu tidak bisa kembali lagi!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, semua sudah benar!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href('./success.html')
    }
  });
}
