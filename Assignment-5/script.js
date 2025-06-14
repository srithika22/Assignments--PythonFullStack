document.getElementById('signupBtn').addEventListener('click', signup);
document.getElementById('loginBtn').addEventListener('click', login);

function showMessage(msg, isSuccess = false) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.className = "message" + (isSuccess ? " success" : "");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    showMessage("Please fill all fields.");
    return;
  }

  let users = getUsers();

  if (users.some(user => user.email === email)) {
    showMessage("Email already registered.");
    return;
  }

  users.push({ name, email, password });
  setUsers(users);

  showMessage("Signup successful. Please login.", true);
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = getUsers();

  const found = users.find(user => user.email === email && user.password === password);

  if (found) {
    showMessage(`Welcome, ${found.name}! Login successful.`, true);
  } else {
    showMessage("Invalid credentials.");
  }
}