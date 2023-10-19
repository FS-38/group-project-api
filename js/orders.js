const ordersWrapper = document.getElementById("riwayat-pembayaran");
const checkUser = JSON.parse(localStorage.getItem("user"));
const userId = checkUser.id;
// console.log(userId);

const getOrders = async () => {
  try {
    let orders = await fetch(
      "https://6526bf02917d673fd76cf235.mockapi.io/api/pemesanan"
    );
    orders = await orders.json();
    return orders;
  } catch (error) {
    console.log(error);
  }
};

const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

getOrders().then((data) => {
  const dataByUserId = data.filter((item) => item.userId == userId);
//   console.log(dataByUserId);

  if (dataByUserId.length > 0) {
    dataByUserId.map((item) => {
      const row = `
                        <tr>
                            <td class="text-bold-500">${item.konselorName}</td>
                            <td>${item.tanggal} <br> @19.00-20.00</td>
                            <td class="text-bold-500">${item.metodeKonsultasi}</td>
                            <td>${rupiah(item.hargaTotal)}</td>
                            <td>${item.visibility}</td>
                            <td>
                                <button class="btn btn-primary">Mulai</button>
                            </td>
                        </tr>`;
      ordersWrapper.innerHTML += row;
    });
  } else {
    ordersWrapper.innerHTML = `<tr>
                                    <td colspan="6" class="text-center">Belum ada riwayat pembayaran</td>
                                </tr>`;
  }
});
