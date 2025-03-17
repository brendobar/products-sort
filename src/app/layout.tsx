import type {Metadata} from "next";
import "./globals.scss";
import {CartProvider} from "@/features/cart/model/CartContext";
import Header from "@/widgets/Header/Header";


export const metadata: Metadata = {
    title: "Shop",
    description: "Sorting Products",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <CartProvider>
            <Header/>
            {children}
        </CartProvider>
        </body>
        </html>
    );
}
