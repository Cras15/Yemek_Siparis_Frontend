import { Alert, Box, LinearProgress } from '@mui/joy';
import { DataGrid, GridActionsCell, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GRID_EDITED_LOCALE_TEXT } from '../../components/GridLocaleText';
import { Snackbar } from '@mui/material';
import React from 'react';
import { Delete, Edit } from '@mui/icons-material';

const ManagerShopEditPage = () => {
    const [shop, setShop] = React.useState([]);
    const [status, setStatus] = React.useState('');
    const [snackbar, setSnackbar] = React.useState(null);

    const { id } = useParams();

    const handleCloseSnackbar = () => setSnackbar(null);

    const getShopsById = async (shopId) => {
        await setStatus('pending');
        await axios.get(`/shop/getProducts?shopId=${shopId}`).then((res) => {
            console.log(res);
            setShop(res.data);
            setStatus('success');
        }).catch((error) => {
            setStatus('error');
        })
    }

    React.useEffect(() => {
        getShopsById(id);
    }, []);


    const processRowUpdate = async (newRow, oldRow) => {
        //const updatedRow = { ...newRow, isNew: false };
        //setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        if (JSON.stringify(newRow) != JSON.stringify(oldRow)) {
            setStatus('pending');
            await axios.post("/manager/products/updateProduct", newRow, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => {
                getShopsById(id);
                setStatus('success')
                setSnackbar({ children: res.data, color: 'success' });
            }).catch((error) => {
                setSnackbar({ children: res.data, color: 'danger' });
                //console.log(error);
            });
        }
        return newRow;
    };


    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, color: 'danger' });
        console.log(error);
    }, []);



    return (
        <div className='w-10/12 m-auto mt-5'>
            <Box sx={{ height: 400, width: '100%' }}>
                {shop != "" &&
                    <DataGrid
                        rows={shop.products}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        //checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row) => (row.productsId)}
                        localeText={GRID_EDITED_LOCALE_TEXT}
                        editMode="row"
                        slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                csvOptions: { delimiter: ';', utf8WithBom: true, },
                                printOptions: { hideToolbar: true, hideFooter: true }
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
                    />
                }
                {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={4000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
            </Box>
        </div>
    )
}
const columns = [
    { field: 'productsId', headerName: 'ID', width: 60, editable: true, type: 'number' },
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
            <GridActionsCellItem key={params.row.productsId} icon={<Delete />} label="Sil" />,
        ],
    }
];



export default ManagerShopEditPage