// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const messages = [
        "Preparing your mindful space...",
        "Setting up your mindful journey...",
        "Almost ready to bloom..."
    ];
    
    // Show loading screen
    if (loadingScreen) {
        loadingScreen.classList.add('active');
        
        // Rotate messages
        let messageIndex = 0;
        const messageElement = document.getElementById('loadingMessage');
        
        if (messageElement) {
            const messageInterval = setInterval(() => {
                messageElement.style.opacity = '0';
                
                setTimeout(() => {
                    messageIndex = (messageIndex + 1) % messages.length;
                    messageElement.textContent = messages[messageIndex];
                    messageElement.style.opacity = '1';
                }, 300);
            }, 2000);
            
            // Store interval ID to clear later
            loadingScreen.dataset.messageInterval = messageInterval;
        }
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        // Clear message rotation
        if (loadingScreen.dataset.messageInterval) {
            clearInterval(loadingScreen.dataset.messageInterval);
        }
        
        // Hide loading screen
        loadingScreen.classList.remove('active');
    }
}

// Password Toggle Function
function addPasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        if (input.parentElement.querySelector('.password-toggle')) {
            return;
        }
        
        const wrapper = input.parentElement;
        const toggleBtn = document.createElement('span');
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 15px;
            top: 40px;
            cursor: pointer;
            opacity: 0.6;
            font-size: 18px;
            user-select: none;
        `;
        
        toggleBtn.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '👁️‍🗨️';
                this.style.opacity = '0.8';
            } else {
                input.type = 'password';
                this.innerHTML = '👁️';
                this.style.opacity = '0.6';
            }
        });
        
        wrapper.style.position = 'relative';
        wrapper.appendChild(toggleBtn);
    });
}

// Input Effects Function
function initInputEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.borderColor = 'var(--purple)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--baby-pink)';
        });
    });
}

// LOGIN PAGE

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            const loginBtn = document.querySelector('.login-btn');
            const originalText = loginBtn.textContent;
            
            // Show loading state
            loginBtn.textContent = 'Signing in...';
            loginBtn.style.opacity = '0.8';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show loading screen
                showLoadingScreen();
                
                // After 3 seconds, show success and hide loading
                setTimeout(() => {
                    hideLoadingScreen();
                    alert('Login successful! Welcome to Digi Bloom.');
                    
                    // Reset button
                    loginBtn.textContent = originalText;
                    loginBtn.style.opacity = '1';
                    loginBtn.disabled = false;
                    
                    // Clear form
                    loginForm.reset();

                    window.location.href = 'intro.html';

                }, 2000);

            }, 1000);
    });

        // Initialize input effects for login page
        initInputEffects();
    }
    
    // SIGNUP PAGE

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                document.getElementById('confirmPassword').focus();
                return;
            }
            
            // Password strength check
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert('Password must be at least 8 characters with one uppercase letter, one number, and one special character');
                return;
            }
            
            // Email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show loading state on button
            const signupBtn = document.querySelector('.signup-btn');
            const originalText = signupBtn.textContent;
            signupBtn.textContent = 'Creating Account...';
            signupBtn.style.opacity = '0.8';
            signupBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show loading screen
                showLoadingScreen();
                
                // After 3 seconds, show success and hide loading
                setTimeout(() => {
                    hideLoadingScreen();
                    alert(`Welcome to Digi Bloom, ${firstName}! Your mindful journey begins now.`);
                    
                    // Reset button
                    signupBtn.textContent = originalText;
                    signupBtn.style.opacity = '1';
                    signupBtn.disabled = false;
                    
                    // Clear form
                    signupForm.reset();
                    
                }, 3000);
                
            }, 1000); 
        });
        
        // Add password toggle for signup page
        addPasswordToggle();
        
        // Initialize input effects for signup page
        initInputEffects();
    }
    
    // SHARED INITIALIZATION
    console.log('Digi Bloom JavaScript loaded successfully!');
});

// UTILITY FUNCTIONS

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengths = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };
    
    const score = Object.values(strengths).filter(Boolean).length;
    
    return {
        score: score,
        isStrong: score >= 4,
        feedback: {
            length: strengths.length,
            uppercase: strengths.uppercase,
            number: strengths.number,
            special: strengths.special
        }
    };
}
