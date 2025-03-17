'use client'

import { useEffect, useState } from 'react';
import SidebarFilters from '@/features/filters/ui/SidebarFilters';
import ProductList from '@/widgets/ProductList/ProductList';
import SortBar from '@/widgets/SortBar/SortBar';
import { Product } from '@/entities/product/model/types';
import {Box, Button, CircularProgress, Typography} from '@mui/material';

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 5000, isNew: false });
    const [sort, setSort] = useState({ type: 'name', order: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/products.json')
            .then(res => res.json())
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const result = products
            .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
            .filter(p => !filters.isNew || p.isNew);

        result.sort((a, b) => {
            const valA = sort.type === 'name' ? a.name : a.price;
            const valB = sort.type === 'name' ? b.name : b.price;
            return sort.order === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });

        setFiltered(result);
    }, [products, filters, sort]);

    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = currentPage * PRODUCTS_PER_PAGE;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    const handlePagination = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Box display="flex" paddingBottom={2} paddingX={2}>
            <SidebarFilters filters={filters} setFilters={setFilters} />
            <Box flexGrow={1}>
                <SortBar sort={sort} setSort={setSort} />

                {/* Лоадер, если данные загружаются */}
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                        <CircularProgress />
                    </Box>
                ) : filtered.length === 0 ? (
                    // Сообщение, если продуктов нет
                    <Typography variant="h6" color="textSecondary" align="center">
                        Продукты не найдены
                    </Typography>
                ) : (
                    // Показываем список товаров, если данные загружены
                    <ProductList products={paginatedProducts} />
                )}

                {/* Пагинация */}
                {filtered.length > 0 && (
                    <Box mt={4} display="flex" justifyContent="center" alignItems="center">
                        <Button
                            disabled={currentPage <= 1}
                            onClick={() => handlePagination(currentPage - 1)}
                        >
                            ‹
                        </Button>

                        <Typography variant="body1" sx={{ mx: 2 }}>
                            {`Страница ${currentPage} из ${totalPages}`}
                        </Typography>

                        <Button
                            disabled={currentPage >= totalPages}
                            onClick={() => handlePagination(currentPage + 1)}
                        >
                            ›
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
