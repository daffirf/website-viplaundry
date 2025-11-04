import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: number;
  unit: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  totalOrders: number;
  registeredDate: string;
  status: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  serviceId: number;
  serviceName: string;
  weight: number;
  totalPrice: number;
  estimatedFinish: string;
  notes?: string;
  status: 'pending' | 'processing' | 'ready' | 'completed';
  orderDate: string;
}

interface LaundryState {
  orders: Order[];
  customers: Customer[];
  services: Service[];
  
  // Actions
  addOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status'>) => Order;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByCustomer: (phone: string) => Order[];
  
  addCustomer: (customer: Omit<Customer, 'id' | 'totalOrders' | 'registeredDate' | 'status'>) => Customer;
  getCustomerByPhone: (phone: string) => Customer | undefined;
  
  getServices: () => Service[];
  initializeDefaultData: () => void;
}

// Default services
const defaultServices: Service[] = [
  {
    id: 1,
    name: 'Cuci Reguler',
    price: 5000,
    description: 'Layanan cuci standar dengan waktu pengerjaan 2-3 hari',
    duration: 3,
    unit: 'per kg'
  },
  {
    id: 2,
    name: 'Cuci Express',
    price: 8000,
    description: 'Layanan cuci cepat dengan waktu pengerjaan 1 hari',
    duration: 1,
    unit: 'per kg'
  },
  {
    id: 3,
    name: 'Cuci Premium',
    price: 12000,
    description: 'Layanan cuci premium dengan detergen khusus dan pewangi',
    duration: 2,
    unit: 'per kg'
  },
  {
    id: 4,
    name: 'Setrika Saja',
    price: 3000,
    description: 'Layanan setrika dan lipat rapi',
    duration: 1,
    unit: 'per kg'
  }
];

export const useLaundryStore = create<LaundryState>()(
  persist(
    (set, get) => ({
      orders: [],
      customers: [],
      services: defaultServices,

      initializeDefaultData: () => {
        const { services } = get();
        if (services.length === 0) {
          set({ services: defaultServices });
        }
      },

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
          orderDate: new Date().toISOString(),
          status: 'pending' as const
        };

        set((state) => ({
          orders: [...state.orders, newOrder]
        }));

        // Update or create customer
        get().addCustomer({
          name: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail,
          address: order.customerAddress
        });

        return newOrder;
      },

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates } : order
          )
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id)
        }));
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      getOrdersByCustomer: (phone) => {
        return get().orders.filter((order) => order.customerPhone === phone);
      },

      addCustomer: (customer) => {
        const { customers } = get();
        const existing = customers.find((c) => c.phone === customer.phone);

        if (existing) {
          // Update existing customer
          set((state) => ({
            customers: state.customers.map((c) =>
              c.phone === customer.phone
                ? {
                    ...c,
                    name: customer.name,
                    email: customer.email || c.email,
                    address: customer.address || c.address,
                    totalOrders: c.totalOrders + 1
                  }
                : c
            )
          }));
          return existing;
        } else {
          // Add new customer
          const newCustomer: Customer = {
            id: 'CUST' + Date.now(),
            ...customer,
            totalOrders: 1,
            registeredDate: new Date().toISOString(),
            status: 'active'
          };

          set((state) => ({
            customers: [...state.customers, newCustomer]
          }));

          return newCustomer;
        }
      },

      getCustomerByPhone: (phone) => {
        return get().customers.find((c) => c.phone === phone);
      },

      getServices: () => {
        return get().services;
      },
    }),
    {
      name: 'viplaundry-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

