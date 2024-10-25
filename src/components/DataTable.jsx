import React, { useState, useMemo } from "react";
import {
    Box,
    Button,
    IconButton,
    Input,
    Select,
    Option,
    Sheet,
    Table,
    Typography,
    Link,
    Chip,
    Modal,
    ModalDialog,
    ModalClose,
    FormControl,
    FormLabel,
    Menu,
    MenuButton,
    MenuItem,
    List,
    ListItem,
    ListItemDecorator,
    ListItemContent,
    ListDivider,
    useTheme,
    AspectRatio,
    Grid,
    Dropdown,
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
    MoreHorizRounded,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { iconButtonClasses } from "@mui/joy/IconButton";
import PropTypes from "prop-types";

function DataTable({
    columns,
    data,
    rowKey,
    actions,
    filters,
    search = true,
    defaultOrder = "asc",
    defaultOrderBy,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
    getRowActions,
    renderDetailPanel,
    expandableRows = false, // Satırların genişletilebilir olup olmadığını kontrol eder
}) {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy || columns[0].field);
    const [openRowId, setOpenRowId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const isMobile = useMediaQuery("(max-width:600px)");

    // Filtreleri ve aramayı uygulama
    const filteredData = useMemo(() => {
        return data
            .filter((item) => {
                // Arama filtresi (Search Filter)
                const searchMatch = columns.some((column) => {
                    if (column.disableSearch) return false;
                    const value = item[column.field];
                    // Safely convert value to string or use empty string if null/undefined
                    const stringValue = value?.toString()?.toLowerCase() || "";
                    const lowerSearchTerm = searchTerm.toLowerCase();
                    return stringValue.includes(lowerSearchTerm);
                });

                // Diğer filtreler (Other Filters)
                const filterMatch = Object.keys(selectedFilters).every((key) => {
                    const filterValue = selectedFilters[key];
                    if (filterValue === "all") return true;
                    return item[key] === filterValue;
                });

                return searchMatch && filterMatch;
            })
            .sort((a, b) => {
                const valA = a[orderBy];
                const valB = b[orderBy];

                // Determine if both values are numbers
                const bothNumbers = typeof valA === "number" && typeof valB === "number";

                if (bothNumbers) {
                    return order === "desc" ? valB - valA : valA - valB;
                } else {
                    // Safely convert values to strings or use empty string if null/undefined
                    const strA = valA?.toString() || "";
                    const strB = valB?.toString() || "";
                    if (order === "desc") {
                        return strB.localeCompare(strA);
                    } else {
                        return strA.localeCompare(strB);
                    }
                }
            });
    }, [data, searchTerm, selectedFilters, order, orderBy, columns]);

    // Sayfalama
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);

    const pageCount = Math.ceil(filteredData.length / rowsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (filterKey, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterKey]: value,
        }));
        setCurrentPage(1);
    };

    const handleRowClick = (rowId) => {
        setExpandedRowId((prevId) => (prevId === rowId ? null : rowId));
    };



    return (
        <>
            {search && <>
                {/* Filtreler ve Arama */}
                < Sheet
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
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {/* Diğer filtreler mobil için modal içinde olabilir */}
                </Sheet >
            </>}
            {search &&
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
                        <FormLabel>Arama</FormLabel>
                        <Input
                            size="sm"
                            placeholder="Ara"
                            startDecorator={<SearchIcon />}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </FormControl>
                    {filters &&
                        filters.map((filter) => (
                            <FormControl size="sm" key={filter.field}>
                                <FormLabel>{filter.label}</FormLabel>
                                <Select
                                    size="sm"
                                    placeholder={filter.placeholder}
                                    value={selectedFilters[filter.field] || "all"}
                                    onChange={(e, value) =>
                                        handleFilterChange(filter.field, value)
                                    }
                                >
                                    {filter.options.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                </Box>
            }
            {
                isMobile ? (
                    // Mobil görünüm
                    <Box>
                        {paginatedData.map((row) => (
                            <MobileRow
                                key={row[rowKey]}
                                row={row}
                                columns={columns}
                                isOpen={row[rowKey] === expandedRowId}
                                onRowClick={expandableRows ? () => handleRowClick(row[rowKey]) : null}
                                actions={getRowActions ? getRowActions(row) : null}
                                renderDetailPanel={renderDetailPanel}
                            />
                        ))}
                    </Box>
                ) : (
                    // Masaüstü görünümü
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
                                "--TableRow-hoverBackground":
                                    "var(--joy-palette-background-level1)",
                                "--TableCell-paddingY": "4px",
                                "--TableCell-paddingX": "8px",
                            }}
                        >
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.field} style={{ width: column.width }}>
                                            {column.sortable ? (
                                                <SortableTableHeader
                                                    title={column.headerName}
                                                    orderByValue={column.field}
                                                    currentOrder={order}
                                                    currentOrderBy={orderBy}
                                                    setOrder={setOrder}
                                                    setOrderBy={setOrderBy}
                                                />
                                            ) : (
                                                <Typography level="body-sm" fontWeight="lg">
                                                    {column.headerName}
                                                </Typography>
                                            )}
                                        </th>
                                    ))}
                                    {expandableRows && (
                                        <th style={{ width: 48 }} /> // Expand/Kapat butonu için sütun
                                    )}
                                    {actions && <th style={{ width: 48 }} />}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row) => (
                                    <Row
                                        key={row[rowKey]}
                                        row={row}
                                        columns={columns}
                                        isOpen={row[rowKey] === expandedRowId}
                                        onRowClick={expandableRows ? () => handleRowClick(row[rowKey]) : null}
                                        actions={getRowActions ? getRowActions(row) : null}
                                        renderDetailPanel={renderDetailPanel}
                                        expandableRows={expandableRows}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                )
            }
            {/* Sayfalama */}
            <Box
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Önceki Sayfa
                </Button>
                {[...Array(pageCount)].map((_, idx) => (
                    <IconButton
                        key={idx + 1}
                        size="sm"
                        variant={idx + 1 === currentPage ? "solid" : "outlined"}
                        color="neutral"
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </IconButton>
                ))}
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                    }
                    disabled={currentPage === pageCount}
                >
                    Sonraki Sayfa
                </Button>
            </Box>
        </>
    );
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowKey: PropTypes.string.isRequired,
    actions: PropTypes.bool,
    filters: PropTypes.array,
    defaultOrder: PropTypes.oneOf(["asc", "desc"]),
    defaultOrderBy: PropTypes.string,
    rowsPerPageOptions: PropTypes.array,
    defaultRowsPerPage: PropTypes.number,
    getRowActions: PropTypes.func,
    renderDetailPanel: PropTypes.func,
};

export default DataTable;

// Yardımcı Bileşenler

const SortableTableHeader = React.memo(function SortableTableHeader({
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
});

const Row = React.memo(function Row({
    row,
    columns,
    isOpen,
    onRowClick,
    actions,
    renderDetailPanel,
    expandableRows,
}) {
    return (
        <>
            <tr>
                {columns.map((column) => (
                    <td key={column.field}>
                        {column.renderCell
                            ? column.renderCell(row)
                            : row[column.field]?.toString()}
                    </td>
                ))}
                {expandableRows && (
                    <td style={{ width: 48 }}>
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
                )}
                {actions && (
                    <td style={{ width: 48 }}>
                        <RowMenu actions={actions} />
                    </td>
                )}
            </tr>
            {isOpen && renderDetailPanel && (
                <tr>
                    <td
                        colSpan={columns.length + (actions ? 1 : 0) + (expandableRows ? 1 : 0)}
                        style={{ padding: 0 }}
                    >
                        {renderDetailPanel(row)}
                    </td>
                </tr>
            )}
        </>
    );
});

const MobileRow = React.memo(function MobileRow({
    row,
    columns,
    isOpen,
    onRowClick,
    actions,
    renderDetailPanel,
}) {
    return (
        <Sheet
            variant="outlined"
            sx={{
                mb: 2,
                borderRadius: "md",
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2 }}>
                {columns.map((column) => (
                    <Typography key={column.field} level="body-sm">
                        <strong>{column.headerName}:</strong>{" "}
                        {column.renderCell
                            ? column.renderCell(row)
                            : row[column.field]?.toString()}
                    </Typography>
                ))}
                {actions && <RowMenu actions={actions} />}
                {onRowClick && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <IconButton
                            aria-label="expand row"
                            variant="plain"
                            color="neutral"
                            size="sm"
                            onClick={onRowClick}
                        >
                            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </Box>
                )}
            </Box>
            {isOpen && renderDetailPanel && (
                <Box sx={{ p: 2 }}>{renderDetailPanel(row)}</Box>
            )}
        </Sheet>
    );
});

function RowMenu({ actions }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                    root: { variant: "plain", color: "neutral", size: "sm" },
                }}
            >
                <MoreHorizRounded />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                {actions.map((action, index) => (
                    <React.Fragment key={index}>
                        <MenuItem
                            component={action.href ? Link : MenuItem}
                            href={action.href}
                            underline="none"
                            sx={{ borderRadius: "sm", mx: 1 }}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            color={action.color}
                        >
                            {action.icon && <ListItemDecorator>{action.icon}</ListItemDecorator>}
                            {action.label}
                        </MenuItem>
                        {action.divider && <ListDivider />}
                    </React.Fragment>
                ))}
            </Menu>
        </Dropdown>
    );
}
