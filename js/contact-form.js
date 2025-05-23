document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

async function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Disable submit button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        // Here you would typically send the form data to your backend
        // For demonstration, we'll simulate an API call
        await simulateFormSubmission(formData);
        
        // Show success message
        showMessage('Message sent successfully!', 'success');
        form.reset();
    } catch (error) {
        // Show error message
        showMessage('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertAdjacentElement('beforebegin', messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Simulated API call (replace with actual API endpoint)
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Object.fromEntries(formData.entries());
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}