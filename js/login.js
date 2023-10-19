document.addEventListener("DOMContentLoaded", function () {
  const password = document.getElementById("password");
  const passwordToggle = document.getElementById("password-toggle");

  passwordToggle.addEventListener("click", function () {
    togglePasswordVisibility(password, passwordToggle);
  });

  function togglePasswordVisibility(input, toggle) {
    if (input.type === "password") {
      input.type = "text";
      toggle.innerHTML = '<i class="bx bx-hide"></i>';
    } else {
      input.type = "password";
      toggle.innerHTML = '<i class="bx bx-show"></i>';
    }
  }
});

let submitForm = document.getElementById("submit-form");

submitForm.addEventListener("click", (event) => {
  event.preventDefault();

  // Get value from input
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Input validation
  let validationFailed = false;

  // Email validation
  const emailErrorElement = document.querySelector(".error.email");
  if (!email) {
    validationFailed = true;
    emailErrorElement.style.display = "flex";
    emailErrorElement.querySelector(".error-text").textContent =
      "Masukkan email yang valid";
  } else {
    emailErrorElement.style.display = "none";
  }

  // Password validation
  const passwordErrorElement = document.querySelector(".error.password");
  if (!password) {
    validationFailed = true;
    passwordErrorElement.style.display = "flex";
    passwordErrorElement.querySelector(".error-text").textContent =
      "Masukkan minimal 8 karakter dengan nomor, simbol, huruf kecil dan besar";
  } else {
    passwordErrorElement.style.display = "none";
  }

  // delete error messages
  const errorMessageElement = document.getElementById("error-message");
  if (errorMessageElement) {
    errorMessageElement.style.display = "none";
    errorMessageElement.textContent = "";
  }

  if (validationFailed) {
    return;
  }

  fetch("https://6526adf4917d673fd76cc91f.mockapi.io/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal melakukan permintaan.");
      }
      return response.json();
    })

    .then((data) => {
      // Filter data by email and password
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const matchingUser = data.find(
        (user) => user.email === email && user.password === password
      );

      if (matchingUser) {
        // Display the corresponding data
        console.log("Data yang ditemukan:", matchingUser);

        // Save login status
        localStorage.setItem("user", JSON.stringify(matchingUser));
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);

        // // Redirect to counseling page
        window.location.href = "./index.html";
      } else {
        console.log("Tidak ada data yang cocok");
        // Emaill or password not found
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "block";
        errorMessageElement.textContent =
          "Email atau password salah. Silakan coba lagi!";
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan", error);
    });
});
