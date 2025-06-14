document.getElementById('togglePassword').addEventListener('change', function() {
    const pwd = document.getElementById('password');
    pwd.type = this.checked ? 'text' : 'password';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');
    errorMsg.textContent = '';
    successMsg.textContent = '';
    if (!username || !password) {
        errorMsg.textContent = 'Please enter both username and password.';
        return;
    }
    // Simulate login success
    successMsg.textContent = 'Login successful!';
    // Optionally, clear the form
    // document.getElementById('loginForm').reset();
});