// Intersection Observer configuration
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Animation classes map
const animationClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-in': 'animate-slide-in',
    'scale-in': 'animate-scale-in'
};

// Animation queue to manage staggered animations
let animationQueue = [];
let isProcessingQueue = false;

// Create the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add to animation queue with delay
            animationQueue.push({
                element: entry.target,
                delay: index * 150 // 150ms delay between each animation
            });
            
            // Start processing queue if not already processing
            if (!isProcessingQueue) {
                processAnimationQueue();
            }
            
            // Optional: Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Process animation queue
function processAnimationQueue() {
    if (animationQueue.length === 0) {
        isProcessingQueue = false;
        return;
    }
    
    isProcessingQueue = true;
    const item = animationQueue.shift();
    
    setTimeout(() => {
        const animationType = item.element.dataset.animate;
        if (animationType && animationClasses[animationType]) {
            item.element.classList.add(animationClasses[animationType]);
        }
        processAnimationQueue();
    }, item.delay);
}

// Initialize animations
function initScrollAnimations() {
    // Reset animation state
    animationQueue = [];
    isProcessingQueue = false;
    
    // Select all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', initScrollAnimations);