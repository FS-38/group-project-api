const konselorWrapper = document.getElementById("konselor-wrapper");

async function getKonselor() {
  try {
    const response = await fetch(
      "https://6526bf02917d673fd76cf235.mockapi.io/api/konselor"
    );
    const data = await response.json();
    return data;
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

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

function clickCard(data) {
  localStorage.setItem("konselor", JSON.stringify(data));
  window.location.href = "./detail-konselor.html";
  // console.log(data);
}

let konselor = localStorage.getItem("konselor");
if (konselor) {
  localStorage.removeItem("konselor");
}

getKonselor().then((data) => {
  data.map((konselor) => {
    const konselorImage = [
      "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg",
      "https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=ais",
      "https://st2.depositphotos.com/3889193/8015/i/450/depositphotos_80150956-Confident-female-doctor-at-office-desk.jpg",
    ];

    const image = getRandomItem(konselorImage);

    const dataWithImage = { image, ...konselor };

    const konselorCard = `
            <div class="col-12 col-md-3">
              <div class="card shadow-lg" style="cursor: pointer;" onclick='clickCard(${JSON.stringify(
                dataWithImage
              )})'>
                <div class="card-content">
                  <img
                    src="${image}"
                    class="card-img-top px-3 pt-3 rounded-5 ratio-1x1 object-fit-contain"
                    alt="singleminded"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-truncate">${konselor.name}</h5>
                    <p class="card-text">${rupiah(
                      Math.round(konselor.harga * 100)
                    )} / hour</p>
                    <div class="rating">
                    ${(() => {
                      let b = Math.floor(Math.random() * 5);
                      if (b > 5) {
                        return '<i class="bi bi-star-fill"></i>'.repeat(b);
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

    konselorWrapper.innerHTML += konselorCard;
  });
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./indexLogin.html";
});
