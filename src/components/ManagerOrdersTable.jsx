import React, { useEffect, useState } from "react";
import {
    IconButton, Box, Button, Chip, Divider, FormControl, FormLabel, Link, Input, Modal, ModalDialog, ModalClose, Select,
    Option, Table, Sheet, Typography, Menu, MenuButton, MenuItem, Dropdown, Stack, Grid, Textarea,
    List,
    ListItem,
    ListItemDecorator,
    ListItemContent,
    ListDivider,
    useTheme,
    AspectRatio,
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
    DeleteForever,
    Done,
    Visibility,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { iconButtonClasses } from "@mui/joy/IconButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { useUI } from "../utils/UIContext";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import { OrderStatus, OrderStatusColor } from "./Utils";

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

function ManagerOrdersTable({ orders, getOrders }) {
    const { showErrorSnackbar } = useUI();
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("orderDate");
    const [open, setOpen] = useState(false);
    const [openRowId, setOpenRowId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredOrders = orders?.filter((order) => {
        const matchesCategory = selectedStatus === "all" || order.status === selectedStatus;
        const matchesSearch = order.shopName?.toLowerCase().includes(searchTerm) ||
        order.address?.toLowerCase().includes(searchTerm) ||
        order.finalPrice?.toString().includes(searchTerm) ||
        order.orderDate?.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    const pageCount = Math.ceil(filteredOrders.length / rowsPerPage);
    const currentProducts = filteredOrders
        .sort(getComparator(order, orderBy))
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChangePage = (newPage) => setCurrentPage(newPage);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };
    const handleRowClick = (rowId) =>
        setOpenRowId(openRowId === rowId ? null : rowId);

    const handleChangeOrderStatus = (e, newValue) => {
        setSelectedStatus(newValue);
        setCurrentPage(1);
    };

    return (
        <React.Fragment>
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
                    <FormLabel>Siparişlerde ara</FormLabel>
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
                    <Select size="sm" placeholder="Kategori Seç" defaultValue="all" onChange={handleChangeOrderStatus}>
                        <Option value="all">Tümü</Option>
                        <Option value="RECEIVED">Sipariş Alındı</Option>
                        <Option value="GETTING_READY">Sipariş Hazırlanıyor</Option>
                        <Option value="ON_THE_WAY">Sipariş Yolda</Option>
                        <Option value="DELIVERED">Teslim Edildi</Option>
                        <Option value="CANCELED">İptal Edildi</Option>
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
                            {["ID", "Müşteri", "Tarih", "Fiyat", "Durum"].map((title, idx) => (
                                <th key={idx} style={{ width: idx == 0 ? 50 : 140 }}>
                                    <SortableTableHeader
                                        title={title}
                                        orderByValue={
                                            ["shopName", "address", "", "finalPrice"][idx]
                                        }
                                        currentOrder={order}
                                        currentOrderBy={orderBy}
                                        setOrder={setOrder}
                                        setOrderBy={setOrderBy}
                                    />
                                </th>
                            ))}
                            <th style={{ width: 48, textAlign: "center" }} />
                            <th style={{ width: 48 }} />
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                isOpen={row.orderId === openRowId}
                                getOrders={getOrders}
                                onRowClick={() => handleRowClick(row.orderId)}
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
        </React.Fragment>
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

function Row({ row, isOpen, onRowClick, getOrders }) {
    const { token } = useSelector((state) => state.user);
    const { showDoneSnackbar, showErrorSnackbar } = useUI();
    const theme = useTheme();

    const convertDate = (date) => {
        const dates = parseISO(date); // Tarihi ISO formatÄ±ndan Date objesine Ã§evirir

        return format(dates, "d MMMM EEE HH:mm", { locale: tr });
    }
    return (
        <>
            <tr>
                <td>
                    <Typography level="body-xs">#{row.orderId}</Typography>
                </td>
                <td>
                    <Typography level="body-xs">Mert Yener</Typography>
                </td>
                <td>
                    <Typography level="body-xs">
                        {convertDate(row.orderDate)}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
                        ₺{row.finalPrice.toFixed(2)}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
                        <Chip color={OrderStatusColor[row?.status]}>
                            {OrderStatus[row?.status]}
                        </Chip>

                    </Typography>
                </td>
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
                    <RowMenu order={row} getOrders={getOrders} />
                </td>
            </tr>
            {isOpen && (
                <tr style={{ backgroundColor: 'inherit', }}>
                    <td colSpan={7} style={{ padding: 0, border: 'none' }}>
                        <Box variant="soft" sx={{ background: theme.palette.background.level1, padding: 1 }}>
                            <List variant="soft" color="" sx={{ boxShadow: 'm', background: theme.palette.background.body, minWidth: 240, borderRadius: 'sm' }}>
                                {row.orderItems?.map((data, i) => (
                                    <>
                                        <ListItem>
                                            <ListItemDecorator>
                                                <AspectRatio ratio="1" sx={{ width: '48px', borderRadius: "12px", mr: 2 }}>
                                                    <img
                                                        src={data.imageUrl}
                                                        loading="lazy"
                                                        alt=""
                                                    />
                                                </AspectRatio>
                                            </ListItemDecorator>
                                            <Grid container spacing={2} alignItems="center" sx={{ width: "100%" }}>
                                                <Grid xs={8} sm={8} md={10}>
                                                    <ListItemContent>
                                                        <Typography level="title-sm" noWrap>{data.orderDesc}</Typography>
                                                        <Typography level="body-sm" noWrap>{data.orderName}</Typography>
                                                    </ListItemContent>
                                                </Grid>
                                                <Grid xs={2} sm={2} md={1}>
                                                    <Typography level="title-sm">x{data.unit}</Typography>
                                                </Grid>
                                                <Grid xs={2} sm={2} md={1}>
                                                    <Typography level="title-sm">₺{data.price.toFixed(2)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        {row.orderItems.length - 1 !== i && <ListDivider />}
                                    </>
                                ))}
                            </List>
                        </Box>
                    </td>
                </tr >
            )
            }
        </>
    );
}

function RowMenu({ order, getOrders }) {
    const { token } = useSelector((state) => state.user);
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();

    const handleCancelOrder = async (orderId) => {
        await openModal({
            title: 'Sipariş İptali',
            body: 'Siparişi iptal etmek istediğine emin misin?',
            yesButton: 'Siparişi iptal et',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(`/orders/cancelOrder?orderId=${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar("Sipariş başarıyla iptal edildi.");
                        return response;
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message);
                    });
            },
        });
    }

    const ApproveOrder = async () => {
        await openModal({
            title: 'Sipariş Onayı',
            body: 'Siparişi onaylamak istediğinize emin misiniz?',
            yesButton: 'Onayla',
            yesButtonColor: 'success',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/approveOrder?orderId=${order.orderId}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrders()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const assignCourier = async () => {
        await openModal({
            title: 'Kurye Atama',
            body: 'Siparişin durumunu kureye teslim edildi yapmak istersiniz?',
            yesButtonColor: 'success',
            yesButton: 'Onayla',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/assignCourier?orderId=${order.orderId}&courierId=1`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrders()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const markAsDelivered = async () => {
        await openModal({
            title: 'Teslim Edildi',
            body: 'Siparişin durumunu teslim edildi yapmak istersiniz?',
            yesButtonColor: 'success',
            yesButton: 'Onayla',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/markAsDelivered?orderId=${order.orderId}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrders()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const handleDone = () => {
        if (order.status === "RECEIVED") {
            return ApproveOrder()
        } else if (order.status === "GETTING_READY") {
            return assignCourier()
        } else if (order.status === "ON_THE_WAY") {
            return markAsDelivered()
        }
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
                    <MenuItem sx={{ borderRadius: "sm", mx: 1 }}>
                        <ListItemDecorator>
                            <Visibility />
                        </ListItemDecorator>Görüntüle</MenuItem>
                    <MenuItem sx={{ borderRadius: "sm", mx: 1, mb: 0.5 }} color="success"
                        disabled={order.status === "CANCELED" || order.status === "DELIVERED"} onClick={handleDone}>
                        <ListItemDecorator>
                            <Done />
                        </ListItemDecorator>
                        {
                            order.status === "RECEIVED" ? "Onayla" :
                                order.status === "GETTING_READY" ? "Kureyeye Verildi" :
                                    order.status === "ON_THE_WAY" ? "Teslim Edildi" :
                                        order.status === "DELIVERED" ? "Teslim Edildi" : "Onayla"
                        }
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        sx={{ borderRadius: "sm", mx: 1, mt: 0.5 }}
                        color="danger"
                        disabled={order.status === "CANCELED"}
                        onClick={() => handleCancelOrder(order.orderId)}>
                        <ListItemDecorator>
                            <DeleteForever />
                        </ListItemDecorator>
                        Sipariş İptali
                    </MenuItem>
                </Menu>
            </Dropdown >
        </>
    );
}

ManagerOrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
};

export default ManagerOrdersTable;
