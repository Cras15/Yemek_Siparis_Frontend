import {
    Button,
    Checkbox,
    FormControl,
    Typography,
    Radio,
    RadioGroup,
    Slider,
    Stack,
  } from '@mui/joy';
  import React from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  
  const FilterChild = ({ categorys, closeModal }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const searchParams = new URLSearchParams(location.search);
    const [sortType, setSortType] = React.useState(
      searchParams.get('sortType') || 'AKILLI'
    );
    const [categoryIds, setCategoryIds] = React.useState(
      searchParams.get('categoryIds')
        ? searchParams
            .get('categoryIds')
            .split(',')
            .map((id) => parseInt(id, 10))
        : []
    );
    const [minOrderPrice, setMinOrderPrice] = React.useState(
      Number(searchParams.get('minOrderPrice')) || 0
    );
  
    const handleCategoryChange = (e, categoryId) => {
      setCategoryIds((prevCategoryIds) =>
        e.target.checked
          ? [...prevCategoryIds, categoryId]
          : prevCategoryIds.filter((id) => id !== categoryId)
      );
    };
  
    const handleFilter = () => {
      const queryParams = new URLSearchParams();
      if (categoryIds.length)
        queryParams.append('categoryIds', categoryIds.join(','));
      if (minOrderPrice)
        queryParams.append('minOrderPrice', minOrderPrice);
      queryParams.append('sortType', sortType);
      navigate(`?${queryParams.toString()}`);
      if (closeModal) closeModal();
    };
  
    return (
      <Stack direction="column" spacing={2} sx={{ ml: 1 }}>
        <FormControl>
          <Typography level="body-sm" fontWeight="lg" mb={1}>
            Sıralama
          </Typography>
          <RadioGroup
            name="radio-buttons-group"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <Radio
              value="AKILLI"
              label="Akıllı Sıralama"
              variant="outlined"
              color="primary"
            />
            <Radio
              value="TESLIMAT_SURESI"
              label="Teslimat Süresi"
              variant="outlined"
              color="primary"
            />
            <Radio
              value="RESTORAN_PUANI"
              label="Restoran Puanı"
              variant="outlined"
              color="primary"
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Typography level="body-sm" fontWeight="lg" mb={1}>
            Mutfaklar
          </Typography>
          <div role="group">
            <Stack spacing={1}>
              {categorys?.map((category) => (
                <Checkbox
                  key={category.categoryId}
                  label={category.categoryName}
                  color="primary"
                  checked={categoryIds.includes(category.categoryId)}
                  onChange={(e) =>
                    handleCategoryChange(e, category.categoryId)
                  }
                />
              ))}
            </Stack>
          </div>
        </div>
        <div>
          <Typography level="body-sm" fontWeight="lg" mb={4}>
            Minimum Sepet Tutarı
          </Typography>
          <Slider
            valueLabelDisplay="on"
            value={minOrderPrice}
            onChange={(e, value) => setMinOrderPrice(value)}
            max={300}
            step={30}
            marks={[
              { value: 0, label: '0TL' },
              { value: 300, label: 'Tümü' },
            ]}
          />
        </div>
        <Button
          sx={{ mt: 2, borderRadius: 'lg' }}
          size="md"
          onClick={handleFilter}
          fullWidth
        >
          Filteleri Uygula
        </Button>
      </Stack>
    );
  };
  
  export default FilterChild;
  