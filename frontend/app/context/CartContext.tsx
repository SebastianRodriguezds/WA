"use client"

import { createContext, useContext, useState, ReactNode, Children} from "react";

export type CartItem = {
    id: string | number;
    type: "cabin" | "experience" | "bundle";
    name: string;
    price: number;
    nights? : number;
    guests?: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
    };
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev)=> [...prev, item]);
    };

    const removeFromCart = (id: string | number)=> {
        setCart((prev)=> prev.filter((item)=> item.id !== id));
    };

    const total = cart.reduce((acc, item)=> acc + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total}}>
            {children}
        </CartContext.Provider>
    );
};

