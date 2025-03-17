'use client';

import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCart } from '@/features/cart/model/CartContext';

const Header = () => {
    const { cart, totalPrice } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6">Магазин</Typography>
                </Link>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography>Итого: ${totalPrice}</Typography>
                    <Link href="/cart">
                        <IconButton color="inherit">
                            <Badge badgeContent={totalItems} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
