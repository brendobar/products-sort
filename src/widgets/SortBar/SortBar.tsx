import { Select, MenuItem, Box } from '@mui/material';

type Sort = {
    type: string;
    order: string;
};

type Props = {
    sort: Sort;
    setSort: (sort: Sort) => void;
};

const SortBar = ({ sort, setSort }: Props) => (
    <Box p={2} display="flex" justifyContent="flex-end">
        <Select
            value={`${sort.type}-${sort.order}`}
            onChange={(e) => {
                const [type, order] = e.target.value.split('-');
                setSort({ type, order });
            }}
        >
            <MenuItem value="name-asc">Название ↑</MenuItem>
            <MenuItem value="name-desc">Название ↓</MenuItem>
            <MenuItem value="price-asc">Цена ↑</MenuItem>
            <MenuItem value="price-desc">Цена ↓</MenuItem>
        </Select>
    </Box>
);

export default SortBar;
