import { Grid } from '@mui/material';
import ProductCard from '@/entities/product/ui/ProductCard';
import { Product } from '@/entities/product/model/types';

const ProductList = ({ products }: { products: Product[] }) => (
    <Grid container spacing={2}>
        {products.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
                <ProductCard product={p} />
            </Grid>
        ))}
    </Grid>
);

export default ProductList;
