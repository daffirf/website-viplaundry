// Keyboard Shortcuts untuk LaundryPro Management System

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = new Map();
        this.init();
    }

    init() {
        this.setupShortcuts();
        this.createShortcutsHelp();
        this.bindEvents();
    }

    setupShortcuts() {
        // Navigation shortcuts
        this.shortcuts.set('1', { action: 'navigate', target: 'dashboard', description: 'Dashboard' });
        this.shortcuts.set('2', { action: 'navigate', target: 'orders', description: 'Pesanan' });
        this.shortcuts.set('3', { action: 'navigate', target: 'customers', description: 'Pelanggan' });
        this.shortcuts.set('4', { action: 'navigate', target: 'services', description: 'Layanan' });
        this.shortcuts.set('5', { action: 'navigate', target: 'reports', description: 'Laporan' });
        this.shortcuts.set('6', { action: 'navigate', target: 'settings', description: 'Pengaturan' });

        // Action shortcuts
        this.shortcuts.set('n', { action: 'new_order', description: 'Tambah Pesanan Baru' });
        this.shortcuts.set('c', { action: 'new_customer', description: 'Tambah Pelanggan Baru' });
        this.shortcuts.set('s', { action: 'new_service', description: 'Tambah Layanan Baru' });
        this.shortcuts.set('f', { action: 'focus_search', description: 'Focus ke Search Bar' });
        this.shortcuts.set('h', { action: 'show_help', description: 'Tampilkan Bantuan' });
        this.shortcuts.set('d', { action: 'toggle_dark_mode', description: 'Toggle Dark Mode' });
        this.shortcuts.set('r', { action: 'refresh_data', description: 'Refresh Data' });

        // Modal shortcuts
        this.shortcuts.set('Escape', { action: 'close_modal', description: 'Tutup Modal' });
        this.shortcuts.set('Enter', { action: 'submit_form', description: 'Submit Form' });

        // Print shortcuts
        this.shortcuts.set('p', { action: 'print_receipt', description: 'Print Receipt (jika ada order selected)' });
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Prevent shortcuts in input fields
        document.addEventListener('keydown', (e) => {
            if (this.isInputField(e.target)) {
                return;
            }
        });
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        const shortcut = this.shortcuts.get(key) || this.shortcuts.get(e.key);

        if (shortcut) {
            e.preventDefault();
            this.executeShortcut(shortcut);
        }
    }

    executeShortcut(shortcut) {
        switch (shortcut.action) {
            case 'navigate':
                this.navigateToPage(shortcut.target);
                break;
            case 'new_order':
                this.showAddOrderModal();
                break;
            case 'new_customer':
                this.showAddCustomerModal();
                break;
            case 'new_service':
                this.showAddServiceModal();
                break;
            case 'focus_search':
                this.focusSearchBar();
                break;
            case 'show_help':
                this.toggleShortcutsHelp();
                break;
            case 'toggle_dark_mode':
                this.toggleDarkMode();
                break;
            case 'refresh_data':
                this.refreshData();
                break;
            case 'close_modal':
                this.closeAllModals();
                break;
            case 'submit_form':
                this.submitActiveForm();
                break;
            case 'print_receipt':
                this.printSelectedReceipt();
                break;
        }
    }

    navigateToPage(page) {
        const navLink = document.querySelector(`[data-page="${page}"]`);
        if (navLink) {
            navLink.click();
            this.showShortcutFeedback(`Navigasi ke ${page}`);
        }
    }

    showAddOrderModal() {
        if (typeof showAddOrderModal === 'function') {
            showAddOrderModal();
            this.showShortcutFeedback('Membuka modal tambah pesanan');
        }
    }

    showAddCustomerModal() {
        if (typeof showAddCustomerModal === 'function') {
            showAddCustomerModal();
            this.showShortcutFeedback('Membuka modal tambah pelanggan');
        }
    }

    showAddServiceModal() {
        if (typeof showAddServiceModal === 'function') {
            showAddServiceModal();
            this.showShortcutFeedback('Membuka modal tambah layanan');
        }
    }

    focusSearchBar() {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.focus();
            this.showShortcutFeedback('Search bar aktif');
        }
    }

    toggleDarkMode() {
        if (window.darkModeToggle) {
            darkModeToggle.toggle();
            this.showShortcutFeedback('Dark mode diubah');
        }
    }

    refreshData() {
        location.reload();
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        this.showShortcutFeedback('Modal ditutup');
    }

    submitActiveForm() {
        const activeForm = document.querySelector('form:focus-within');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.click();
                this.showShortcutFeedback('Form disubmit');
            }
        }
    }

    printSelectedReceipt() {
        // This would need to be implemented based on selected order
        this.showShortcutFeedback('Fitur print receipt akan segera hadir');
    }

    isInputField(element) {
        const inputTypes = ['input', 'textarea', 'select'];
        return inputTypes.includes(element.tagName.toLowerCase()) || 
               element.contentEditable === 'true';
    }

    createShortcutsHelp() {
        const helpButton = document.createElement('div');
        helpButton.className = 'shortcuts-help-btn';
        helpButton.innerHTML = `
            <button onclick="keyboardShortcuts.toggleShortcutsHelp()" title="Keyboard Shortcuts (H)">
                <i class="fas fa-keyboard"></i>
            </button>
        `;

        // Add to header
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            headerRight.appendChild(helpButton);
        }
    }

    toggleShortcutsHelp() {
        const existingHelp = document.getElementById('shortcuts-help-modal');
        if (existingHelp) {
            existingHelp.remove();
        } else {
            this.showShortcutsHelp();
        }
    }

    showShortcutsHelp() {
        const helpModal = document.createElement('div');
        helpModal.id = 'shortcuts-help-modal';
        helpModal.className = 'shortcuts-help-modal';
        
        const shortcutsList = Array.from(this.shortcuts.entries())
            .map(([key, shortcut]) => `
                <div class="shortcut-item">
                    <kbd class="shortcut-key">${key}</kbd>
                    <span class="shortcut-description">${shortcut.description}</span>
                </div>
            `).join('');

        helpModal.innerHTML = `
            <div class="shortcuts-help-content">
                <div class="shortcuts-help-header">
                    <h3>🎹 Keyboard Shortcuts</h3>
                    <button class="shortcuts-help-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="shortcuts-help-body">
                    <div class="shortcuts-section">
                        <h4>📱 Navigasi</h4>
                        ${shortcutsList.slice(0, 6).join('')}
                    </div>
                    <div class="shortcuts-section">
                        <h4>⚡ Aksi Cepat</h4>
                        ${shortcutsList.slice(6, 12).join('')}
                    </div>
                    <div class="shortcuts-section">
                        <h4>🔧 Kontrol</h4>
                        ${shortcutsList.slice(12).join('')}
                    </div>
                </div>
                <div class="shortcuts-help-footer">
                    <p>💡 Gunakan keyboard shortcuts untuk navigasi yang lebih cepat!</p>
                </div>
            </div>
        `;

        document.body.appendChild(helpModal);
    }

    showShortcutFeedback(message) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        // Show feedback
        setTimeout(() => feedback.classList.add('show'), 100);
        
        // Remove feedback
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
}

// Initialize keyboard shortcuts
let keyboardShortcuts;

document.addEventListener('DOMContentLoaded', function() {
    keyboardShortcuts = new KeyboardShortcuts();
});

// Export for global use
window.keyboardShortcuts = keyboardShortcuts;
