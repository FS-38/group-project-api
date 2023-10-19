document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("password"); 
    const confirm = document.getElementById("confirm"); 
    const passwordToggle = document.getElementById("password-toggle");
    const confirmToggle = document.getElementById("confirm-toggle");
  
    passwordToggle.addEventListener("click", function() {
        togglePasswordVisibility(password, passwordToggle);
    });
  
    confirmToggle.addEventListener("click", function() {
        togglePasswordVisibility(confirm, confirmToggle);
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
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;
  
     // Input validation
    let validationFailed = false;
    if (!name) {
      validationFailed = true;
      validateInput("username", name, "Masukkan username valid");
    }
  
    if(!email) {
      validationFailed = true;
      validateInput("email", email, "Masukkan email valid");
    }
  
    if(!password) {
      validationFailed = true;
      validateInput("password", password, "Masukkan minimal 8 karakter dengan nomor, simbol, huruf kecil dan besar");
    }
  
    if(!confirm) {
      validationFailed = true;
      validateInput("confirm", confirm, "Konfirmasi password harus diisi");
    }
  
    if (validationFailed) {
      console.log('Gagal: Harap isi semua bidang');
      return;
    }
  
    let userData = {
        name: name,
        email: email,
        password: password, 
        confirm: confirm, 
    };
  
    fetch('https://6526adf4917d673fd76cc91f.mockapi.io/api/users', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then((res) => res.json())
    .then(data => {
        console.log('Registrasi berhasil:', data);
        // Redirect to counselling page
        window.location.href = './indexLogin.html';
    })
    .catch(error => {
        console.error('Registrasi gagal:', error);
    });
  
  
  function validateInput(inputId, value, errorMessage) {
    const errorElement = document.querySelector(`.error.${inputId}`);
  
    if(!value) {
      errorElement.style.display = "flex";
      errorElement.querySelector(".error-text").textContent = errorMessage;
    } else {
    errorElement.style.display = "none";
    }
  }
  });  