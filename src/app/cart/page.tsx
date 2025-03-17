'use client';

import { useCart } from '@/features/cart/model/CartContext';
import {
    Box,
    Typography,
    IconButton,
    Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const { cart, totalPrice, updateQuantity, removeFromCart } = useCart();

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Корзина
            </Typography>

            {cart.length === 0 ? (
                <Typography>Корзина пуста</Typography>
            ) : (
                <>
                    {cart.map((item) => (
                        <Box key={item.product.id} mb={2}>
                            <Typography variant="h6">{item.product.name}</Typography>
                            <Typography>Цена за единицу: ${item.product.price}</Typography>

                            <Box display="flex" alignItems="center" gap={2} mt={1}>
                                <IconButton
                                    onClick={() =>
                                        updateQuantity(item.product.id, item.quantity - 1)
                                    }
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography>{item.quantity}</Typography>
                                <IconButton
                                    onClick={() =>
                                        updateQuantity(item.product.id, item.quantity + 1)
                                    }
                                >
                                    <AddIcon />
                                </IconButton>

                                <IconButton
                                    color="error"
                                    onClick={() => removeFromCart(item.product.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <Typography mt={1}>
                                Сумма за позицию: ${item.product.price * item.quantity}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}
                    <Typography variant="h5">Итого: ${totalPrice}</Typography>
                </>
            )}
        </Box>
    );
};

export default CartPage;
