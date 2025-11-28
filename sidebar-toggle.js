// Sidebar toggle functionality
const sidebar = document.querySelector('aside');
const toggleButton = document.querySelector('aside button'); // The chevron button
const mainContent = document.querySelector('.flex-1.transition-all.duration-300.ml-64');
const sidebarTexts = document.querySelectorAll('aside nav button span, aside nav button a');
const logo = document.querySelector('aside .p-4.border-b span');

let isCollapsed = false;

// Function to toggle sidebar
function toggleSidebar() {
    isCollapsed = !isCollapsed;
    
    if (isCollapsed) {
        // Collapse sidebar
        sidebar.classList.remove('w-64');
        sidebar.classList.add('w-16');
        
        // Adjust main content margin
        mainContent.classList.remove('ml-64');
        mainContent.classList.add('ml-16');
        
        // Hide all text labels
        sidebarTexts.forEach(text => {
            text.style.display = 'none';
        });
        
        // Hide logo text
        if (logo) {
            logo.style.display = 'none';
        }
        
        // Rotate chevron icon
        const chevronIcon = toggleButton.querySelector('svg');
        if (chevronIcon) {
            chevronIcon.style.transform = 'rotate(180deg)';
        }
        
        // Center the icons in collapsed state
        const navButtons = document.querySelectorAll('aside nav button');
        navButtons.forEach(btn => {
            btn.classList.add('justify-center');
            btn.classList.remove('gap-3');
        });
        
    } else {
        // Expand sidebar
        sidebar.classList.remove('w-16');
        sidebar.classList.add('w-64');
        
        // Adjust main content margin
        mainContent.classList.remove('ml-16');
        mainContent.classList.add('ml-64');
        
        // Show all text labels
        sidebarTexts.forEach(text => {
            text.style.display = '';
        });
        
        // Show logo text
        if (logo) {
            logo.style.display = '';
        }
        
        // Rotate chevron icon back
        const chevronIcon = toggleButton.querySelector('svg');
        if (chevronIcon) {
            chevronIcon.style.transform = 'rotate(0deg)';
        }
        
        // Restore button layout
        const navButtons = document.querySelectorAll('aside nav button');
        navButtons.forEach(btn => {
            btn.classList.remove('justify-center');
            btn.classList.add('gap-3');
        });
    }
}

// Auto-collapse on smaller screens
function handleResize() {
    if (window.innerWidth <= 500 && !isCollapsed) {
        toggleSidebar();
    } else if (window.innerWidth > 500 && isCollapsed) {
        toggleSidebar();
    }
}

// Add click event to toggle button
if (toggleButton) {
    toggleButton.addEventListener('click', toggleSidebar);
}

// Listen for window resize
window.addEventListener('resize', handleResize);

// Initial check on page load
handleResize(); 