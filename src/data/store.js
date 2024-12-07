import { create } from 'zustand';

export const useStore = create((set, get) => ({
  products: [
    {
      id: '1',
      name: 'Example Product',
      price: 19.99,
      quantity: 100,
      imageUrl: 'https://picsum.photos/id/16/300/300',
      description: 'This is an example product',
      inStock: true,
      category: 'Category 1',
    },
  ],
  users: [],
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now().toString() }],
  })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id),
  })),
  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: Date.now().toString() }],
  })),
  getUser: (email, password) => get().users.find(
    (user) => user.email === email && user.password === password
  ),
}));

