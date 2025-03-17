import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '../model/types';
import Link from 'next/link';
import {useCart} from "@/features/cart/model/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const item = cart.find(i => i.product.id === product.id);

    return (
        <Card>
            <CardContent>
                <Link href={`/product/${product.id}`}>
                    <Typography variant="h6">{product.name}</Typography>
                </Link>
                <Typography>Цена: ${product.price}</Typography>
                <Typography>Бренд: {product.brand}</Typography>
                {!item ? (
                    <Button onClick={() => addToCart(product)} variant="contained">Добавить</Button>
                ) : (
                    <Box display="flex" alignItems="center" mt={1}>
                        <IconButton onClick={() => updateQuantity(product.id, item.quantity - 1)}><RemoveIcon /></IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(product.id, item.quantity + 1)}><AddIcon /></IconButton>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;
