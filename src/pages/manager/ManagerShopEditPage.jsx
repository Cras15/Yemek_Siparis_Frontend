import { Alert, Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, LinearProgress, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { DataGrid, GridActionsCell, GridActionsCellItem, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GRID_EDITED_LOCALE_TEXT } from '../../components/GridLocaleText';
import { Snackbar } from '@mui/material';
import React from 'react';
import { Add, Delete, DeleteForever, Edit, WarningRounded } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../redux/snackbarSlice';

const ManagerShopEditPage = () => {
    const columns = [
        { field: 'productsId', headerName: 'ID', width: 60, editable: false, type: 'number' },
        {
            field: 'productName',
            headerName: 'Ürün adı',
            width: 150,
            editable: true,
        },
        {
            field: 'productDesc',
            headerName: 'Ürün açıklaması',
            width: 300,
            editable: true,
        },
        {
            field: 'imageUrl',
            headerName: 'Ürün resmi',
            sortable: false,
            width: 200,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Fiyat',
            type: 'number',
            width: 100,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Araçlar',
            sortable: false,
            width: 200,
            editable: false,
            renderCell: (params) => [
                <GridActionsCellItem key={params.row.productsId} icon={<Delete />} label="Sil" onClick={() => handleDetele(params.row.productsId)} />,
            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button size="md" variant='plain' startDecorator={<Add />} onClick={() => setOpenAddModal(true)}>
                    Yeni Kayıt
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <GridToolbarQuickFilter sx={{ ml: 'auto', mr: 2 }} />
            </GridToolbarContainer>
        );
    }

    const [shop, setShop] = React.useState([]);
    const [status, setStatus] = React.useState('');
    //const [snackbar, setSnackbar] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [lastSelect, setLastSelect] = React.useState(null);

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const inputRef = React.useRef(null);

    const { id } = useParams();

    const getShopsById = async (shopId) => {
        setStatus('pending');
        await axios.get(`/shop/getProducts?shopId=${shopId}`).then((res) => {
            console.log(res);
            setShop(res.data);
            setStatus('success');
        }).catch((error) => {
            setStatus('error');
        })
    }

    const handleDetele = (id) => {
        setLastSelect(id);
        setOpen(true)
    }

    const handleModalDelete = async () => {
        setOpen(false);
        setStatus('pending');
        await axios.post(`/manager/products/deleteProduct?productId=${lastSelect}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            getShopsById(id);
            dispatch(setSnackbar({ children: res.data, color: 'success' }));
            setStatus('success');
        }).catch((error) => {
            dispatch(setSnackbar({ children: error.message, color: 'danger' }));
            setStatus('error');
            //console.log(error);
        });
    }

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setOpenAddModal(false);
        setStatus('pending');
        await axios.post(`/manager/products/addProducts?shopId=${shop.shopId}`, {
            productName: data.get('productName'),
            productDesc: data.get('productDesc'),
            imageUrl: data.get('imageUrl'),
            price: data.get('price'),
            stock: 9999
        }, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            getShopsById(id);
            dispatch(setSnackbar({ children: res.data, color: 'success' }));
            setStatus('success');
        }).catch((error) => {
            dispatch(setSnackbar({ children: error.message, color: 'danger' }));
            setStatus('error');
        });
    }


    const processRowUpdate = async (newRow, oldRow) => {
        if (JSON.stringify(newRow) != JSON.stringify(oldRow)) {
            setStatus('pending');
            await axios.post("/manager/products/updateProduct", newRow, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                getShopsById(id);
                setStatus('success')
                console.log(res.data);
                dispatch(setSnackbar({ children: res.data, color: 'success' }));
            }).catch((error) => {
                console.log(error);
                dispatch(setSnackbar({ children: error.message, color: 'danger' }));
                setStatus('error');
            });
        }
        return newRow;
    };


    const handleProcessRowUpdateError = React.useCallback((error) => {
        dispatch(setSnackbar({ children: error.message, color: 'danger' }));
        console.log(error);
    }, []);

    React.useEffect(() => {
        getShopsById(id);
    }, []);


    return (
        <div className='w-10/12 m-auto mt-5'>
            <Box sx={{ height: 'auto', width: '100%' }}>
                {shop != "" ?
                    <DataGrid
                        rows={shop.products}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSize={5}
                        pageSizeOptions={[5, 10, 25]}
                        rowsPerPageOptions={[5]}

                        //checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row) => (row.productsId)}
                        localeText={GRID_EDITED_LOCALE_TEXT}
                        editMode="row"
                        slots={{ toolbar: CustomToolbar, loadingOverlay: LinearProgress, noRowsOverlay: CustomNoRowsOverlay }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                csvOptions: { delimiter: ';', utf8WithBom: true, },
                                printOptions: { hideToolbar: true, hideFooter: true },

                            },
                        }}
                        loading={status == "pending"}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        autoHeight {...shop.products}
                        autosizeOptions={{
                            includeOutliers: true,
                            includeHeaders: true,
                        }}
                        sx={{ '--DataGrid-overlayHeight': '300px' }}
                    />
                    : <CircularProgress
                        sx={{
                            m: 'auto',
                            width: '100%',
                            height: '60vh',
                            "--CircularProgress-size": "200px",
                            "--CircularProgress-trackThickness": "20px",
                            "--CircularProgress-progressThickness": "20px"
                        }}
                    />
                }
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Onay
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Bunu silmek istediğine emin misin ?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={handleModalDelete}>
                            Sil
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => { setOpen(false); setLastSelect(null); }}>
                            İptal
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <ModalDialog>
                    <div className='overflow-y-auto '>
                        <DialogTitle sx={{ mb: 3 }}>Ürün Ekle</DialogTitle>
                        <form onSubmit={(e) => handleAddFormSubmit(e)}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Ürün Adı {requiredIc()}</FormLabel>
                                    <Input autoFocus required placeholder='Lahmacun...' name='productName' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Ürün Açıklaması {requiredIc()}</FormLabel>
                                    <Input required placeholder='Salatalık...' name='productDesc' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Ürün Resim Linki</FormLabel>
                                    <Input placeholder='imgur.com...' name='imageUrl' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Fiyat {requiredIc()}</FormLabel>
                                    <Input required placeholder='100.0' type='number' name='price'
                                        slotProps={{
                                            input: {
                                                ref: inputRef,
                                                min: 1,
                                                max: 10000,
                                                step: 0.5,
                                            },
                                        }} />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </div>
                </ModalDialog>
            </Modal>
        </div>
    )
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: '#aeb8c2'
    },
    '& .ant-empty-img-2': {
        fill: '#f5f5f7'
    },
    '& .ant-empty-img-3': {
        fill: '#dce0e6'
    },
    '& .ant-empty-img-4': {
        fill: '#fff'
    },
    '& .ant-empty-img-5': {
        fillOpacity: '0.8',
        fill: '#f5f5f5'
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                style={{ flexShrink: 0 }}
                width="240"
                height="200"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>Sonuç yok</Box>
        </StyledGridOverlay>
    );
}

function requiredIc() {
    return <Typography color='danger'>*</Typography>
}

export default ManagerShopEditPage