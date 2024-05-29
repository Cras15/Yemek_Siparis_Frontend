/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react"

import IconButton, { iconButtonClasses } from "@mui/joy/IconButton"

import FilterAltIcon from "@mui/icons-material/FilterAlt"
import SearchIcon from "@mui/icons-material/Search"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import {
    Avatar, Box, Button, Chip, Divider, FormControl, FormLabel, Link, Input, Modal, ModalDialog, ModalClose,
    Select, Option, Table, Sheet, Checkbox, Typography, Menu, MenuButton, MenuItem, Dropdown, Stack
} from "@mui/joy"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import FloatingLabelInput from "./FloatingLabelInput"

function descendingComparator(a, b, orderBy) {
    if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
        // Sayısal değerler için karşılaştırma
        return a[orderBy] - b[orderBy];
    } else if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
        // String değerler için karşılaştırma
        return a[orderBy].localeCompare(b[orderBy]);
    } else {
        // Diğer durumlar için varsayılan bir değer döndür
        return 0;
    }
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(b, a, orderBy) // Tersten sıralama için b ve a'nın yerini değiştiriyoruz.
        : (a, b) => descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function SortableTableHeader({ title, orderByValue, currentOrder, currentOrderBy, setOrder, setOrderBy }) {
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
                '&:hover': {
                    color: 'primary.500',
                },
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
            }}
            endDecorator={isActive && <ArrowDropDownIcon
                sx={{
                    transform: currentOrder === "desc" ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s"
                }}
            />}
        >
            {title}
        </Link>
    );
}

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem sx={{ borderRadius: 'sm', mx: 1 }}>Görüntüle</MenuItem>
                <MenuItem sx={{ borderRadius: 'sm', mx: 1, mb: 0.5 }}>Düzenle</MenuItem>
                <Divider />
                <MenuItem sx={{ borderRadius: 'sm', mx: 1, mt: 0.5 }} color="danger">Sil</MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default function ManagerProductTable({ products }) {
    const [order, setOrder] = React.useState("asc")
    const [orderBy, setOrderBy] = React.useState("productName");
    const [open, setOpen] = React.useState(false)
    const [openRowId, setOpenRowId] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 5; // Varsayılan olarak sayfa başına 10 satır

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm) ||
        product.productDesc.toLowerCase().includes(searchTerm) ||
        // product.category.toLowerCase().includes(searchTerm) ||
        product.price.toString().includes(searchTerm)
    );
    const pageCount = Math.ceil(filteredProducts.length / rowsPerPage);

    const currentProducts = stableSort(filteredProducts, getComparator(order, orderBy))
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1);
    };
    const handleRowClick = rowId => {
        setOpenRowId(openRowId === rowId ? null : rowId);
    };

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Kategori</FormLabel>
                <Select
                    size="sm"
                    placeholder="Kategori Seç"
                    slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                >
                    <Option value="paid">Döner</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
            {/* <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="refund">Refund</Option>
                    <Option value="purchase">Purchase</Option>
                    <Option value="debit">Debit</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Customer</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="olivia">Olivia Rhye</Option>
                    <Option value="steve">Steve Hampton</Option>
                    <Option value="ciaran">Ciaran Murray</Option>
                    <Option value="marina">Marina Macdonald</Option>
                    <Option value="charles">Charles Fulton</Option>
                    <Option value="jay">Jay Hoper</Option>
                </Select>
            </FormControl> */}
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: "flex", sm: "none" },
                    my: 1,
                    gap: 1
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
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: "sm",
                    py: 2,
                    display: { xs: "none", sm: "flex" },
                    flexWrap: "wrap",
                    gap: 1.5,
                    "& > *": {
                        minWidth: { xs: "120px", md: "160px" }
                    }
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
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: "none", sm: "initial" },
                    width: "100%",
                    borderRadius: "md",
                    maxHeight: '55vh',
                    flexShrink: 1,
                    overflow: "auto",
                    minHeight: 0
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        "--TableCell-headBackground":
                            "var(--joy-palette-background-level1)",
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableRow-hoverBackground":
                            "var(--joy-palette-background-level1)",
                        "--TableCell-paddingY": "4px",
                        "--TableCell-paddingX": "8px"
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{ width: 48, textAlign: "center", padding: "12px 6px" }} />
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                <SortableTableHeader
                                    title="Ürün Adı"
                                    orderByValue="productName"
                                    currentOrder={order}
                                    currentOrderBy={orderBy}
                                    setOrder={setOrder}
                                    setOrderBy={setOrderBy}
                                />
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                <SortableTableHeader
                                    title="Açıklama"
                                    orderByValue="productDesc"
                                    currentOrder={order}
                                    currentOrderBy={orderBy}
                                    setOrder={setOrder}
                                    setOrderBy={setOrderBy}
                                />
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>Kategoriler</th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                <SortableTableHeader
                                    title="Fiyat"
                                    orderByValue="price"
                                    currentOrder={order}
                                    currentOrderBy={orderBy}
                                    setOrder={setOrder}
                                    setOrderBy={setOrderBy}
                                />
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((row, index) => (
                            <Row key={row.productsId} row={row} isOpen={row.productsId === openRowId}
                                onRowClick={() => handleRowClick(row.productsId)} />
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
                    display: {
                        xs: "none",
                        md: "flex"
                    }
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
                {pageNumbers.map(page => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={page === currentPage ? "solid" : "outlined"}
                        color="neutral"
                        onClick={() => handleChangePage(page)}
                    >
                        {page}
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
        </React.Fragment>
    )
}

function Row(props) {
    const { row, isOpen, onRowClick } = props;

    return (
        <React.Fragment>
            <tr key={row.productsId}>
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
                    <Typography level="body-xs"><Chip color="primary">{'Döner'}</Chip></Typography>
                </td>
                <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>₺{row.price.toFixed(2)}</Typography>
                    </Box>
                </td>
                <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <RowMenu />
                    </Box>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {isOpen && (
                        <Sheet
                            variant=""
                            sx={{ p: 1, pl: 2, pr: 2, pt: 2 }}
                        >
                            <Typography level="title-md" fontWeight='bold' component="div">
                                Ürün Bilgileri
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Stack direction='row' spacing={3}>
                                <FloatingLabelInput placeholder='' label='Ürün Adı' width={150} defaultValue={row.productName} />
                                <FloatingLabelInput placeholder='' label='Ürün Açıklaması' defaultValue={row.productDesc}/>
                            </Stack>
                        </Sheet>
                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}

Row.propTypes = {
    initialOpen: PropTypes.bool,
    row: PropTypes.shape({
        productName: PropTypes.string.isRequired,
        productDesc: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};