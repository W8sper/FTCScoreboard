async function loginUser(event) {
    event.preventDefault();
    const login = document.querySelector('input[name="login"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Check local storage for user credentials
    const storedUser = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUser.find(user => (user.username === login || user.email === login) && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', user.username); // Store logged in user
        alert('Login successful!');
        window.location.href = 'scoreboard.html'; // Redirect to scoreboard
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Store user data in local storage
    const storedUser = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = storedUser.find(user => user.username === username || user.email === email);

    if (!existingUser) {
        storedUser.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(storedUser));
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        alert('Username or email already exists.');
    }
}