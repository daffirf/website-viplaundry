// Notification System untuk LaundryPro Management System

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.soundEnabled = true;
        this.init();
    }

    init() {
        this.createNotificationContainer();
        this.loadNotifications();
        this.setupAutoRefresh();
    }

    createNotificationContainer() {
        // Buat container notifikasi
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);

        // Buat notification bell di header
        this.createNotificationBell();
    }

    createNotificationBell() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const notificationBell = document.createElement('div');
            notificationBell.className = 'notification-bell';
            notificationBell.innerHTML = `
                <i class="fas fa-bell"></i>
                <span class="notification-count" id="notification-count">0</span>
            `;
            notificationBell.onclick = () => this.toggleNotificationPanel();
            
            // Insert sebelum user profile
            const userProfile = headerRight.querySelector('.user-profile');
            headerRight.insertBefore(notificationBell, userProfile);
        }
    }

    addNotification(type, title, message, data = null) {
        const notification = {
            id: Date.now(),
            type: type, // 'info', 'success', 'warning', 'error'
            title: title,
            message: message,
            data: data,
            timestamp: new Date(),
            read: false
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        this.updateNotificationCount();
        this.showToast(notification);
        
        // Play sound if enabled
        if (this.soundEnabled) {
            this.playNotificationSound(type);
        }

        return notification.id;
    }

    showToast(notification) {
        const toast = document.createElement('div');
        toast.className = `notification-toast notification-${notification.type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <i class="fas ${this.getIconForType(notification.type)}"></i>
                <strong>${notification.title}</strong>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="toast-body">
                ${notification.message}
            </div>
        `;

        const container = document.getElementById('notification-container');
        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);

        // Add slide-in animation
        setTimeout(() => toast.classList.add('show'), 100);
    }

    getIconForType(type) {
        const icons = {
            'info': 'fa-info-circle',
            'success': 'fa-check-circle',
            'warning': 'fa-exclamation-triangle',
            'error': 'fa-times-circle'
        };
        return icons[type] || 'fa-bell';
    }

    playNotificationSound(type) {
        // Create audio context for notification sounds
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Different frequencies for different notification types
            const frequencies = {
                'info': 800,
                'success': 1000,
                'warning': 600,
                'error': 400
            };

            oscillator.frequency.setValueAtTime(frequencies[type] || 800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    toggleNotificationPanel() {
        const panel = document.getElementById('notification-panel');
        if (panel) {
            panel.remove();
        } else {
            this.createNotificationPanel();
        }
    }

    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notification-panel';
        panel.className = 'notification-panel';
        
        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        panel.innerHTML = `
            <div class="panel-header">
                <h3>Notifikasi (${unreadCount})</h3>
                <button class="panel-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="panel-body">
                ${this.notifications.length === 0 ? 
                    '<p class="no-notifications">Tidak ada notifikasi</p>' : 
                    this.renderNotificationList()
                }
            </div>
            <div class="panel-footer">
                <button class="btn btn-sm btn-secondary" onclick="notificationSystem.markAllAsRead()">
                    Tandai Semua Dibaca
                </button>
                <button class="btn btn-sm btn-danger" onclick="notificationSystem.clearAll()">
                    Hapus Semua
                </button>
            </div>
        `;

        document.body.appendChild(panel);
        
        // Position panel below notification bell
        const bell = document.querySelector('.notification-bell');
        if (bell) {
            const rect = bell.getBoundingClientRect();
            panel.style.top = (rect.bottom + 10) + 'px';
            panel.style.right = '20px';
        }
    }

    renderNotificationList() {
        return this.notifications.map(notification => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
                 onclick="notificationSystem.markAsRead(${notification.id})">
                <div class="notification-icon">
                    <i class="fas ${this.getIconForType(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
                </div>
                <button class="notification-delete" onclick="notificationSystem.deleteNotification(${notification.id}, event)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit yang lalu`;
        if (hours < 24) return `${hours} jam yang lalu`;
        if (days < 7) return `${days} hari yang lalu`;
        
        return timestamp.toLocaleDateString('id-ID');
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationCount();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.updateNotificationCount();
        this.refreshNotificationPanel();
    }

    deleteNotification(notificationId, event) {
        event.stopPropagation();
        if (confirm('Hapus notifikasi ini?')) {
            this.notifications = this.notifications.filter(n => n.id !== notificationId);
            this.saveNotifications();
            this.updateNotificationCount();
            this.refreshNotificationPanel();
        }
    }

    clearAll() {
        if (confirm('Hapus semua notifikasi?')) {
            this.notifications = [];
            this.saveNotifications();
            this.updateNotificationCount();
            this.refreshNotificationPanel();
        }
    }

    refreshNotificationPanel() {
        const panel = document.getElementById('notification-panel');
        if (panel) {
            this.createNotificationPanel();
        }
    }

    updateNotificationCount() {
        const countElement = document.getElementById('notification-count');
        if (countElement) {
            const unreadCount = this.notifications.filter(n => !n.read).length;
            countElement.textContent = unreadCount;
            countElement.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    saveNotifications() {
        localStorage.setItem('laundrypro_notifications', JSON.stringify(this.notifications));
    }

    loadNotifications() {
        const saved = localStorage.getItem('laundrypro_notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
            this.updateNotificationCount();
        }
    }

    setupAutoRefresh() {
        // Refresh notifications every 30 seconds
        setInterval(() => {
            this.checkForNewNotifications();
        }, 30000);
    }

    checkForNewNotifications() {
        // Check for orders that need attention
        const pendingOrders = window.orders?.filter(o => o.status === 'pending') || [];
        const processingOrders = window.orders?.filter(o => o.status === 'processing') || [];
        
        // Add notifications for orders that have been pending too long
        pendingOrders.forEach(order => {
            const orderDate = new Date(order.orderDate);
            const hoursSinceOrder = (Date.now() - orderDate.getTime()) / 3600000;
            
            if (hoursSinceOrder > 2 && !this.hasNotification(`order_pending_${order.id}`)) {
                this.addNotification(
                    'warning',
                    'Pesanan Pending',
                    `Pesanan #${order.id} dari ${order.customerName} masih pending lebih dari 2 jam`,
                    { orderId: order.id, type: 'order_pending' }
                );
            }
        });

        // Add notifications for orders that are ready
        processingOrders.forEach(order => {
            const estimatedFinish = new Date(order.estimatedFinish);
            const now = new Date();
            
            if (now >= estimatedFinish && !this.hasNotification(`order_ready_${order.id}`)) {
                this.addNotification(
                    'success',
                    'Pesanan Siap',
                    `Pesanan #${order.id} dari ${order.customerName} sudah siap diambil`,
                    { orderId: order.id, type: 'order_ready' }
                );
            }
        });
    }

    hasNotification(key) {
        return this.notifications.some(n => n.data?.type === key);
    }

    // Public methods for external use
    notifyOrderCreated(order) {
        this.addNotification(
            'success',
            'Pesanan Baru',
            `Pesanan #${order.id} dari ${order.customerName} berhasil dibuat`,
            { orderId: order.id, type: 'order_created' }
        );
    }

    notifyOrderStatusChanged(order, oldStatus, newStatus) {
        this.addNotification(
            'info',
            'Status Pesanan Berubah',
            `Pesanan #${order.id} berubah dari ${this.getStatusText(oldStatus)} ke ${this.getStatusText(newStatus)}`,
            { orderId: order.id, type: 'status_changed' }
        );
    }

    notifyCustomerAdded(customer) {
        this.addNotification(
            'success',
            'Pelanggan Baru',
            `Pelanggan ${customer.name} berhasil ditambahkan`,
            { customerId: customer.id, type: 'customer_added' }
        );
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pending',
            'processing': 'Dalam Proses',
            'ready': 'Siap Diambil',
            'completed': 'Selesai'
        };
        return statusMap[status] || status;
    }
}

// Initialize notification system
let notificationSystem;

document.addEventListener('DOMContentLoaded', function() {
    notificationSystem = new NotificationSystem();
});

// Export for global use
window.notificationSystem = notificationSystem;
