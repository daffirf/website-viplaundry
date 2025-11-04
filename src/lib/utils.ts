// Format date to Indonesian
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleDateString('id-ID', options);
}

// Format date untuk estimasi
export function formatDateSimple(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return d.toLocaleDateString('id-ID', options);
}

// Validate Indonesian phone number
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[2-9][0-9]{7,11}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Format rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Get status text in Indonesian
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Menunggu',
    'processing': 'Sedang Diproses',
    'ready': 'Siap Diambil',
    'completed': 'Selesai'
  };
  return statusMap[status] || status;
}

// Get status color class
export function getStatusClass(status: string): string {
  const statusClasses: Record<string, string> = {
    'pending': 'status-pending',
    'processing': 'status-processing',
    'ready': 'status-ready',
    'completed': 'status-completed'
  };
  return statusClasses[status] || 'status-pending';
}

// Calculate estimated finish date
export function calculateEstimatedFinish(duration: number): Date {
  const estimatedFinish = new Date();
  estimatedFinish.setDate(estimatedFinish.getDate() + duration);
  return estimatedFinish;
}

