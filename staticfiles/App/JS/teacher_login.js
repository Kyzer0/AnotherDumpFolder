// Add at the top of your JavaScript file
console.log('Teacher login script loaded');

// Get references to DOM elements
const teacherId = document.getElementById('id_teacher_id');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const lockPassword = document.getElementById('lock-password');
const teacherIdError = document.getElementById('teacher_id_error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const submitError = document.getElementById('submit-error');

// Add event listeners for validation
teacherId.addEventListener('keyup', validateTeacherId);
email.addEventListener('keyup', validateEmail);
password.addEventListener('keyup', () => validatePassword(password.value));

// Function to validate teacher ID
function validateTeacherId() {
    const teacherIdValue = teacherId.value.trim();

    if (teacherIdValue.length == 0) {
        teacherIdError.innerHTML = '<p>Fill in your Teacher ID</p>';
        return false;
    }

    teacherIdError.innerHTML = '<p class="valid">Valid Teacher ID</p>';
    return true;
}

// Function to validate email
function validateEmail() {
    const emailValue = email.value.trim();

    if (emailValue.length == 0) {
        emailError.innerHTML = '<p>Fill in your email</p>';
        return false;
    }

    if (!emailValue.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
        emailError.innerHTML = '<p>Enter a valid email</p>';
        return false;
    }

    emailError.innerHTML = '<p class="valid">Valid email</p>';
    return true;
}

// Function to validate password
function validatePassword(passwordValue) {
    const minLength = 8;
    let isValid = true;
    let errorMessage = [];
    
    // Check password length
    if (passwordValue.length < minLength) {
        errorMessage.push("Password must be at least 8 characters long");
        isValid = false;
    }

    // Check for uppercase
    if (!/[A-Z]/.test(passwordValue)) {
        errorMessage.push("Password must contain at least one uppercase letter");
        isValid = false;
    }

    // Check for lowercase
    if (!/[a-z]/.test(passwordValue)) {
        errorMessage.push("Password must contain at least one lowercase letter");
        isValid = false;
    }

    // Check for numbers
    if (!/\d/.test(passwordValue)) {
        errorMessage.push("Password must contain at least one number");
        isValid = false;
    }

    // Check for special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
        errorMessage.push("Password must contain at least one special character");
        isValid = false;
    }

    // Update error message
    if (!isValid) {
        passwordError.innerHTML = `<p>${errorMessage.join('<br>')}</p>`;
    } else {
        passwordError.innerHTML = "<p class='valid'>Valid password</p>";
    }

    return isValid;
}

// Toggle password visibility
lockPassword.addEventListener('click', () => {
    if (password.type == "password") {
        password.type = "text"
        lockPassword.classList.remove("bxs-lock")
        lockPassword.classList.add("bxs-lock-open")
    } else {
        password.type = "password"
        lockPassword.classList.remove("bxs-lock-open")
        lockPassword.classList.add("bxs-lock")
    }
});

// Handle form submission
document.getElementById('teacherLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-tab').forEach(el => el.innerHTML = '');
    
    const formData = new FormData(this);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken
        },
        credentials: 'same-origin'
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.success) {
            console.log('Redirecting to:', data.redirect_url);
            window.location.href = data.redirect_url;
        } else {
            console.log('Login failed:', data.errors);
            // Display errors
            if (data.errors) {
                Object.entries(data.errors).forEach(([field, message]) => {
                    const errorElement = document.getElementById(`${field}_error`);
                    if (errorElement) {
                        errorElement.innerHTML = `<p>${message}</p>`;
                    }
                });
            }
            document.getElementById('submit-error').innerHTML = 
                '<p>Login failed. Please check your credentials.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('submit-error').innerHTML = 
            '<p>An error occurred. Please try again.</p>';
    });
});

// Add debug logging
password.addEventListener('keyup', () => {
    console.log('Password value:', password.value);
    console.log('Validation result:', validatePassword(password.value));
});
