import { Box, Slider, Typography, FormControlLabel, Switch } from '@mui/material';

interface Filters {
    minPrice: number;
    maxPrice: number;
    isNew: boolean;
}

interface Props {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

const SidebarFilters = ({ filters, setFilters }: Props) => (
    <Box width={200} paddingX={3} paddingY={2} flex='0 0 auto'>
        <Typography>Цена</Typography>
        <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={5000}
            step={100}
            onChange={(_, newVal) => setFilters({ ...filters, minPrice: (newVal as number[])[0], maxPrice: (newVal as number[])[1] })}
            valueLabelDisplay="auto"
        />
        <FormControlLabel
            control={<Switch checked={filters.isNew} onChange={(e) => setFilters({ ...filters, isNew: e.target.checked })} />}
            label="Только новинки"
        />
    </Box>
);

export default SidebarFilters;
