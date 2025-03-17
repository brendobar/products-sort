'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/entities/product/model/types';
import { Box, Typography, CircularProgress, Button, IconButton } from '@mui/material';
import { useCart } from '@/features/cart/model/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductPage = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart, updateQuantity } = useCart();

    useEffect(() => {
        if (!id) return;
        fetch('/data/products.json')
            .then((res) => res.json())
            .then((data: Product[]) => {
                const found = data.find((p) => p.id === Number(id));
                setProduct(found || null);
                setLoading(false);
            });
    }, [id]);

    const item = cart.find((i) => i.product.id === Number(id));

    if (loading || !product) {
        return (
            <Box p={4}>
                <CircularProgress />
                <Typography ml={2}>Загрузка товара...</Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="h6" gutterBottom>Цена: ${product.price}</Typography>
            <Typography variant="body1" gutterBottom>Бренд: {product.brand}</Typography>
            <Typography variant="body2" gutterBottom>{product.description}</Typography>

            {!item ? (
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => addToCart(product)}>
                    Добавить в корзину
                </Button>
            ) : (
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => updateQuantity(product.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(product.id, item.quantity + 1)}>
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ProductPage;
