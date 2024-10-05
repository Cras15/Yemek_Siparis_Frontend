import React, { useEffect, useState } from "react";
import {
    IconButton, Box, Button, Chip, Divider, FormControl, FormLabel, Link, Input, Modal, ModalDialog, ModalClose, Select,
    Option, Table, Sheet, Typography, Menu, MenuButton, MenuItem, Dropdown, Stack,
    Grid,
    Textarea,
} from "@mui/joy";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    ArrowDropDown as ArrowDropDownIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    MoreHorizRounded as MoreHorizRoundedIcon,
    PlaylistAddCheckCircleOutlined,
    InfoOutlined,
    DoneOutline,
} from "@mui/icons-material";
import { iconButtonClasses } from "@mui/joy/IconButton";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { useUI } from "../utils/UIContext";

function descendingComparator(a, b, orderBy) {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
    } else {
        return valA.toString().localeCompare(valB.toString());
    }
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(b, a, orderBy)
        : (a, b) => descendingComparator(a, b, orderBy);
}

function ManagerProductTable({ products, getProducts }) {
    const { showErrorSnackbar } = useUI();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("productName");
    const [open, setOpen] = useState(false);
    const [openRowId, setOpenRowId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);
    const rowsPerPage = 5;

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.categories.some(cat => cat.categoryId === selectedCategory);
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm) ||
            product.productDesc.toLowerCase().includes(searchTerm) ||
            product.price.toString().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    const pageCount = Math.ceil(filteredProducts.length / rowsPerPage);
    const currentProducts = filteredProducts
        .sort(getComparator(order, orderBy))
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChangePage = (newPage) => setCurrentPage(newPage);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };
    const handleRowClick = (rowId) =>
        setOpenRowId(openRowId === rowId ? null : rowId);

    const getCategories = async () => {
        await axios.get("/category").then((res) => {
            setCategory(res.data);
            console.log(res.data);
        }).catch((error) => {
            showErrorSnackbar(error.message);
            setStatus('error');
        });
    }

    const handleCategoryChange = (e, newValue) => {
        setSelectedCategory(newValue);
        setCurrentPage(1);
    };


    useEffect(() => {
        getCategories();
    }
        , []);
    return (
        <>
            <Sheet
                sx={{
                    display: { xs: "flex", sm: "none" },
                    my: 1,
                    gap: 1,
                }}
            >
                <Input
                    size="sm"
                    placeholder="Ara"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filtreler
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <FormControl size="sm">
                                <FormLabel>Kategori</FormLabel>
                                <Select size="sm" placeholder="Kategori Seç" onChange={handleCategoryChange}>
                                    <Option value="all">Tümü</Option>
                                    {category?.map((option) => (
                                        <Option key={option.categoryId} value={option.categoryId}>
                                            {option.categoryName}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Uygula
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                sx={{
                    borderRadius: "sm",
                    py: 2,
                    display: { xs: "none", sm: "flex" },
                    flexWrap: "wrap",
                    gap: 1.5,
                    "& > *": {
                        minWidth: { xs: "120px", md: "160px" },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Ürünlerde ara</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Ara"
                        startDecorator={<SearchIcon />}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </FormControl>
                <FormControl size="sm">
                    <FormLabel>Kategori</FormLabel>
                    <Select size="sm" placeholder="Kategori Seç" defaultValue="all" onChange={handleCategoryChange}>
                        <Option value="all">Tümü</Option>
                        {category?.map((option) => (
                            <Option key={option.categoryId} value={option.categoryId}>
                                {option.categoryName}
                            </Option>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    display: { xs: "none", sm: "initial" },
                    width: "100%",
                    borderRadius: "md",
                    maxHeight: "55vh",
                    overflow: "auto",
                }}
            >
                <Table
                    stickyHeader
                    hoverRow
                    sx={{
                        "--TableCell-headBackground": "var(--joy-palette-background-level1)",
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
                        "--TableCell-paddingY": "4px",
                        "--TableCell-paddingX": "8px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 48, textAlign: "center" }} />
                            {["Ürün Adı", "Açıklama", "Kategoriler", "Fiyat"].map((title, idx) => (
                                <th key={idx} style={{ width: 140 }}>
                                    <SortableTableHeader
                                        title={title}
                                        orderByValue={
                                            ["productName", "productDesc", "", "price"][idx]
                                        }
                                        currentOrder={order}
                                        currentOrderBy={orderBy}
                                        setOrder={setOrder}
                                        setOrderBy={setOrderBy}
                                    />
                                </th>
                            ))}
                            <th style={{ width: 140 }} />
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((row) => (
                            <Row
                                key={row.productsId}
                                row={row}
                                category={category}
                                getProducts={getProducts}
                                isOpen={row.productsId === openRowId}
                                onRowClick={() => handleRowClick(row.productsId)}
                            />
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Önceki Sayfa
                </Button>
                <Box sx={{ flex: 1 }} />
                {[...Array(pageCount)].map((_, idx) => (
                    <IconButton
                        key={idx + 1}
                        size="sm"
                        variant={idx + 1 === currentPage ? "solid" : "outlined"}
                        color="neutral"
                        onClick={() => handleChangePage(idx + 1)}
                    >
                        {idx + 1}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={currentPage === pageCount}
                >
                    Sonraki Sayfa
                </Button>
            </Box>
        </>
    );
}

function SortableTableHeader({
    title,
    orderByValue,
    currentOrder,
    currentOrderBy,
    setOrder,
    setOrderBy,
}) {
    const handleSort = () => {
        const isAsc = orderByValue === currentOrderBy && currentOrder === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(orderByValue);
    };
    const isActive = orderByValue === currentOrderBy;
    return (
        <Link
            underline="none"
            color={isActive ? "primary" : "inherit"}
            component="button"
            onClick={handleSort}
            fontWeight="lg"
            sx={{
                "&:hover": { color: "primary.500" },
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
            }}
            endDecorator={
                isActive && (
                    <ArrowDropDownIcon
                        sx={{
                            transform: currentOrder === "desc" ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s",
                        }}
                    />
                )
            }
        >
            {title}
        </Link>
    );
}

function Row({ row, isOpen, onRowClick, getProducts, category }) {
    const { token } = useSelector((state) => state.user);
    const { showDoneSnackbar, showErrorSnackbar } = useUI();

    const EditProduct = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('categories'));
        await axios.post("/manager/products/updateProduct", {
            productsId: row.productsId,
            productName: data.get('productName'),
            productDesc: data.get('productDesc'),
            imageUrl: data.get('imageUrl'),
            price: data.get('price'),
            stock: data.get('stock'),
            categoryIds: JSON.parse(data.getAll('categories'))
        }, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            showDoneSnackbar(res.data);
        }).catch((error) => {
            showErrorSnackbar(error.message);
            setStatus('error');
        });
        await getProducts();

    }
    return (
        <>
            <tr>
                <td style={{ textAlign: "center", width: 120 }}>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={onRowClick}
                    >
                        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </td>
                <td>
                    <Typography level="body-xs">{row.productName}</Typography>
                </td>
                <td>
                    <Typography level="body-xs">{row.productDesc}</Typography>
                </td>
                <td>
                    <Typography level="body-xs">
                        {row.categories.map((category) => (
                            <Chip key={category.categoryId} color={category.categoryColor}>{category.categoryName}</Chip>
                        ))}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
                        ₺{row.price.toFixed(2)}
                    </Typography>
                </td>
                <td>
                    <RowMenu getProducts={getProducts} productsId={row.productsId} />
                </td>
            </tr>
            {isOpen && (
                <tr>
                    <td style={{ padding: 0 }} colSpan={6}>
                        <Sheet sx={{ p: 2 }}>
                            <Typography level="title-md" fontWeight="bold">
                                Ürün Bilgileri
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <form onSubmit={(e) => EditProduct(e)}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Ürün Adı</FormLabel>
                                            <Input placeholder="Ürün Adı" defaultValue={row.productName} name="productName" />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Fiyat</FormLabel>
                                            <Input type="number" placeholder="Fiyat" defaultValue={row.price} name="price" />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Stok</FormLabel>
                                            <Input type="number" placeholder="Stok" defaultValue={row.stock} name="stock" />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Resim URL</FormLabel>
                                            <Input placeholder="URL" defaultValue={row.imageUrl} name="imageUrl" />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Kategoriler</FormLabel>
                                            <Select
                                                multiple
                                                name="categories"
                                                placeholder="Kategoriler"
                                                defaultValue={row.categories.map((category) => category.categoryId)}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                                        {selected.map((selectedOption, i) => (
                                                            <Chip key={i} variant="soft" color="primary">
                                                                {selectedOption.label}
                                                            </Chip>
                                                        ))}
                                                    </Box>
                                                )}
                                                sx={{ minWidth: '15rem' }}
                                                slotProps={{
                                                    listbox: {
                                                        sx: {
                                                            width: '100%',
                                                        },
                                                    },
                                                }}
                                            >
                                                {category?.map((option) => (
                                                    <Option key={option.categoryId} value={option.categoryId}>
                                                        {option.categoryName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4}>
                                        <FormControl>
                                            <FormLabel>Ürün Açıklaması</FormLabel>
                                            <Textarea minRows={2} variant="outlined" defaultValue={row.productDesc} name="productDesc" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1 }} />
                                <Button color="primary" type="submit">Düzenle</Button>
                            </form>
                        </Sheet>
                    </td>
                </tr>
            )}
        </>
    );
}

function RowMenu({ getProducts, productsId }) {
    const { token } = useSelector((state) => state.user);
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();

    const DeleteProduct = async () => {
        await axios.post(`/manager/products/deleteProduct?productId=${productsId}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            showDoneSnackbar(res.data);
        }).catch((error) => {
            showErrorSnackbar(error.message);
            setStatus('error');
        });
        await getProducts();
    }

    const handleDelete = (productsId) => {
        openModal({
            title: 'Silme Onayı',
            body: 'Bunu silmek istediğine emin misin?',
            yesButton: 'Sil',
            noButton: 'Vazgeç',
            onAccept: () => DeleteProduct(productsId),
        });
    }

    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{
                        root: { variant: "plain", color: "neutral", size: "sm" },
                    }}
                >
                    <MoreHorizRoundedIcon />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem sx={{ borderRadius: "sm", mx: 1 }}>Görüntüle</MenuItem>
                    <MenuItem sx={{ borderRadius: "sm", mx: 1, mb: 0.5 }}>
                        Düzenle
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        sx={{ borderRadius: "sm", mx: 1, mt: 0.5 }}
                        color="danger"
                        onClick={() => handleDelete(productsId)}
                    >
                        Sil
                    </MenuItem>
                </Menu>
            </Dropdown>
        </>
    );
}

ManagerProductTable.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ManagerProductTable;
