import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import { listProduct, searchFilters } from '../api/product'
import _ from 'lodash'
//ใช้ zustand เพื่อจัดระเบียบ API จัดในรูปแบบ Globa State

const ecomStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    logout: () => {
        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },
    //เพิ่มสินค้าในตะกร้า
    actionAddtoCart: (product) => {
        const carts = get().carts
        const existingItem = carts.find((cartItem) => cartItem.id === product.id)

        if (existingItem) {
            set({
                carts: carts.map((item) =>
                    item.id === product.id
                        ? { ...item, count: item.count + 1 }
                        : item
                )
            })
        } else {
            set({ carts: [...carts, { ...product, count: 1 }] })
        }
    },
    actionAddtoCartV2: (product, qua) => {
        const quantity = Number(qua) || 1; // กำหนดค่าเริ่มต้นเป็น 1
        const carts = get().carts;
        const existingItem = carts.find((cartItem) => cartItem.id === product.id);

        if (existingItem) {
            set({
                carts: carts.map((item) =>
                    item.id === product.id
                        ? { ...item, count: item.count + quantity }
                        : item
                ),
            });
        } else {
            set({ carts: [...carts, { ...product, count: quantity }] });
        }
    },
    actionUpdateQuantity: (productId, newQuantity) => {
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, Number(newQuantity) || 1) }
                    : item
            )
        }))
    },
    actionRemovePeoduct: (productId) => {
        //console.log('remove na',productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== productId
            )
        }))

    },
    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:5001/api/login', form)
        //console.log(res.data.token)
        set({
            user: res.data.payload,
            token: res.data.token,
        })
        return res
    },
    actionSignInGoogle: async (idToken) => {
        try {
            // ส่ง idToken ไปยัง Backend สำหรับการตรวจสอบ
            const res = await axios.post('http://localhost:5001/api/signin-google', { token: idToken });

            // เก็บข้อมูลผู้ใช้และ token ใน Zustand store
            set({
                user: res.data.user,
                token: res.data.token,
            });

            return res;
        } catch (err) {
            console.log('Google Sign-In failed:', err);
            throw err;
        }
    },  
    getCategory: async () => {
        try {
            const res = await listCategory()
            set({ categories: res.data })

        } catch (err) {
            console.log(err);

        }
    },
    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            set({ products: res.data })
        } catch (err) {
            console.log(err);

        }
    },
    actionSearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg)
            set({ products: res.data })
        } catch (err) {
            console.log(err);

        }
    },
    clearCart: () => {
        set({ carts: [] })
    }
})

const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, usePersist), {})

export default useEcomStore