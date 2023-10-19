var carouselWidth = $(".carousel-inner")[0].scrollWidth;
var cardWidth = $(".carousel-item").width();
var scrollPosition = 0;

$(".carousel-control-next").on("click", function () {
  // if (scrollPosition < carouselWidth - cardWidth * 4) {
  //check if you can go any further
  scrollPosition += cardWidth; //update scroll position
  $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600); //scroll left
  // }
});

$(".carousel-control-prev").on("click", function () {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
  }
});

var multipleCardCarousel = document.querySelector("#carouselExampleControls");
if (window.matchMedia("(min-width: 768px)").matches) {
  //rest of the code
  var carousel = new bootstrap.Carousel(multipleCardCarousel, {
    interval: false,
    wrap: false,
  });
} else {
  $(multipleCardCarousel).addClass("slide");
}

// DOM KONSELOR
async function getKonselor() {
  try {
    const response = await fetch(
      "https://6526bf02917d673fd76cf235.mockapi.io/api/konselor"
    );
    const data = await response.json();
    return data.slice(0, 10);
  } catch (error) {
    console.log(error);
    return error;
  }
}

function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];
  return item;
}

function getFormattedDateAfterDays(days) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + days);

  const dd = String(targetDate.getDate()).padStart(2, "0");
  const mm = String(targetDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = targetDate.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

// ubah tanggal menjadi h+1 - h+4
document.getElementById("tgl1").innerHTML = getFormattedDateAfterDays(0);
document.getElementById("tgl2").innerHTML = getFormattedDateAfterDays(1);
document.getElementById("tgl3").innerHTML = getFormattedDateAfterDays(2);
document.getElementById("tgl4").innerHTML = getFormattedDateAfterDays(3);
// ubah tanggal

function clickCard(data) {
  localStorage.setItem("konselor", JSON.stringify(data));
  window.location.href = "/detail-konselor.html";
  // console.log(data);
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

let konselorWrapper = document.querySelector(".carousel-inner");

getKonselor()
  .then((data) => {
    konselorWrapper.innerHTML = "";
    // console.log(data);
    data.map((konselor, index) => {
      const konselorImage = [
        "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg",
        "https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=ais",
        "https://st2.depositphotos.com/3889193/8015/i/450/depositphotos_80150956-Confident-female-doctor-at-office-desk.jpg",
      ];

      const image = getRandomItem(konselorImage);

      const dataWithImage = { image, ...konselor };

      const carouselKonselor = `
                  <div class="carousel-item ${
                    index === 0 ? "active " : ""
                  }" style="cursor: pointer;">
                    <div class="card" onclick='clickCard(${JSON.stringify(
                      dataWithImage
                    )})'>
                      <div class="card-content">
                        <img
                          src="${image}"
                          class="card-img-top px-3 pt-3 rounded-5 ratio-1x1 object-fit-contain"
                          alt="singleminded"
                          width="50"
                        />
                        <div class="card-body">
                          <h5 class="card-title">${konselor.name}</h5>
                          <p class="card-text">${rupiah(
                            Math.round(konselor.harga * 100)
                          )} / hour</p>
                          <div class="rating">
                          ${(() => {
                            let b = Math.floor(Math.random() * 5);
                            if (b > 5) {
                              return '<i class="bi bi-star-fill"></i>'.repeat(
                                b
                              );
                            } else {
                              return (
                                '<i class="bi bi-star-fill"></i>'.repeat(b) +
                                '<i class="bi bi-star"></i>'.repeat(5 - b)
                              );
                            }
                          })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  `;

      konselorWrapper.innerHTML += carouselKonselor;
    });
  })
  .catch((error) => {
    console.log(error);
  });

let konselorData = localStorage.getItem("konselor");
konselorData = JSON.parse(konselorData);

if (!konselorData) {
  window.location.href = "/index.html";
}

// console.log(konselorData);
let konselorImg = document.getElementById("img-utama");
let konselorNama = document.getElementById("nama-konselor");
let konselorHarga = document.getElementById("harga-konselor");
konselorImg.src = konselorData.image;
konselorNama.innerHTML = konselorData.name;
konselorHarga.innerHTML = rupiah(konselorData.harga * 100) + " / hour";

// click modal
let konselor = localStorage.getItem("konselor");
konselor = JSON.parse(konselor);

let modal = document.getElementById("lanjutkan");

modal.addEventListener("click", function () {
  let tglKonseling = localStorage.getItem("tglKonseling");

  let metodeKonseling = document.querySelector(
    "input[name=metode_konsultasi]:checked"
  );

  if (metodeKonseling == null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please choose your consultation method!",
    });
  } else {
    let payment = {
      tglKonseling,
      ...konselor,
      metodeKonseling: metodeKonseling.value,
      hargaRP: konselor.harga * 100,
    };
    localStorage.setItem("payment", JSON.stringify(payment));
    localStorage.removeItem("tglKonseling");
    window.location.href = "./checkout.html";

    // console.log(metodeKonseling.value);
  }
});

const simpanTanggal = (event) => {
  const id = event.target.id;
  let tgl;
  if (id === "pesan1") {
    tgl = document.getElementById("tgl1").innerHTML;
  } else if (id === "pesan2") {
    tgl = document.getElementById("tgl2").innerHTML;
  } else if (id === "pesan3") {
    tgl = document.getElementById("tgl3").innerHTML;
  } else if (id === "pesan4") {
    tgl = document.getElementById("tgl4").innerHTML;
  }
  localStorage.setItem("tglKonseling", tgl);
};
