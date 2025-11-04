// Dark Mode Toggle untuk LaundryPro Management System

class DarkModeToggle {
    constructor() {
        this.isDarkMode = false;
        this.init();
    }

    init() {
        this.loadDarkModePreference();
        this.createToggleButton();
        this.applyDarkMode();
    }

    createToggleButton() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const toggleButton = document.createElement('div');
            toggleButton.className = 'dark-mode-toggle';
            toggleButton.innerHTML = `
                <button id="dark-mode-btn" onclick="darkModeToggle.toggle()">
                    <i class="fas fa-moon" id="dark-mode-icon"></i>
                </button>
            `;
            
            // Insert setelah notification bell
            const notificationBell = headerRight.querySelector('.notification-bell');
            if (notificationBell) {
                headerRight.insertBefore(toggleButton, notificationBell.nextSibling);
            } else {
                headerRight.insertBefore(toggleButton, headerRight.firstChild);
            }
        }
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.saveDarkModePreference();
        this.applyDarkMode();
        this.updateToggleButton();
    }

    applyDarkMode() {
        const body = document.body;
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    updateToggleButton() {
        const icon = document.getElementById('dark-mode-icon');
        if (icon) {
            if (this.isDarkMode) {
                icon.className = 'fas fa-sun';
                icon.title = 'Switch to Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                icon.title = 'Switch to Dark Mode';
            }
        }
    }

    saveDarkModePreference() {
        localStorage.setItem('laundrypro_dark_mode', this.isDarkMode.toString());
    }

    loadDarkModePreference() {
        const saved = localStorage.getItem('laundrypro_dark_mode');
        if (saved !== null) {
            this.isDarkMode = saved === 'true';
        } else {
            // Auto-detect based on system preference
            this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }
}

// Initialize dark mode toggle
let darkModeToggle;

document.addEventListener('DOMContentLoaded', function() {
    darkModeToggle = new DarkModeToggle();
});

// Export for global use
window.darkModeToggle = darkModeToggle;
