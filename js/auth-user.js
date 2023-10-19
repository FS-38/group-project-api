const user = localStorage.getItem('user');

if(!user) {
    window.location.href = './indexLogin.html';
}