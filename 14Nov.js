function validateSignup() {
  let isValid = true;

  document.getElementById("signup-email-error").textContent = "";
  document.getElementById("signup-password-error").textContent = "";
  document.getElementById("signup-confirm-password-error").textContent = "";

  const email = document.getElementById("signup-email").value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    document.getElementById("signup-email-error").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  const password = document.getElementById("signup-password").value;
  if (password.length < 6) {
    document.getElementById("signup-password-error").textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }

  const confirmPassword = document.getElementById("signup-confirm-password").value;
  if (password !== confirmPassword) {
    document.getElementById("signup-confirm-password-error").textContent = "Passwords do not match.";
    isValid = false;
  }

  if (isValid) {
    const userData = {
      email: email,
      password: password
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    Swal.fire({
      icon: 'success',
      title: 'Signup Successful!',
      text: 'You can now log in.',
      confirmButtonText: 'Okay'
    });
  }

  return isValid;
}

function validateLogin() {
  let isValid = true;

  document.getElementById("login-email-error").textContent = "";
  document.getElementById("login-password-error").textContent = "";

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (!storedUserData) {
    Swal.fire({
      icon: 'error',
      title: 'No User Found',
      text: 'Please sign up first.',
      confirmButtonText: 'Okay'
    });
    isValid = false;
  } else {
    if (email !== storedUserData.email) {
      document.getElementById("login-email-error").textContent = "Email does not match.";
      isValid = false;
    }
    if (password !== storedUserData.password) {
      document.getElementById("login-password-error").textContent = "Incorrect password.";
      isValid = false;
    }
  }

  if (isValid && storedUserData.email === email && storedUserData.password === password) {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome back!',
      confirmButtonText: 'Proceed'
    });
  } else if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Credentials',
      text: 'Please check your email and password.',
      confirmButtonText: 'Okay'
    });
  }

  return false; 
}
