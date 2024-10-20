import React, { useMemo } from "react";
import DataTable from "./DataTable"; // DataTable bileşenini içe aktarın
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useUI } from "../utils/UIContext";
import {
  Typography,
  Chip,
  Box,
  List,
  ListItem,
  ListItemDecorator,
  ListItemContent,
  ListDivider,
  Grid,
  AspectRatio,
} from "@mui/joy";
import {
  Visibility,
  Done,
  DeleteForever,
} from "@mui/icons-material";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import { OrderStatus, OrderStatusColor } from "./Utils";

function ManagerOrdersTable({ orders, getOrders }) {
  const { token } = useSelector((state) => state.user);
  const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();

  // Kolon tanımları
  const columns = [
    {
      field: "orderId",
      headerName: "ID",
      width: 50,
      sortable: true,
      renderCell: (row) => (
        <Typography level="body-xs">#{row.orderId}</Typography>
      ),
    },
    {
      field: "name",
      headerName: "Müşteri Ad Soyad",
      width: 140,
      sortable: true,
      renderCell: (row) => (
        <Typography level="body-xs">
          {row.name} {row.surname}
        </Typography>
      ),
    },
    {
      field: "orderDate",
      headerName: "Sipariş Tarihi",
      width: 140,
      sortable: true,
      renderCell: (row) => (
        <Typography level="body-xs">{convertDate(row.orderDate)}</Typography>
      ),
    },
    {
      field: "finalPrice",
      headerName: "Toplam Sipariş Tutarı",
      width: 140,
      sortable: true,
      renderCell: (row) => (
        <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
          ₺{row.finalPrice.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Sipariş Durumu",
      width: 140,
      sortable: true,
      renderCell: (row) => (
        <Chip color={OrderStatusColor[row.status]}>
          {OrderStatus[row.status]}
        </Chip>
      ),
    },
  ];

  // Filtre tanımları
  const filters = [
    {
      field: "status",
      label: "Kategori",
      placeholder: "Kategori Seç",
      options: [
        { value: "all", label: "Tümü" },
        { value: "RECEIVED", label: "Sipariş Alındı" },
        { value: "GETTING_READY", label: "Sipariş Hazırlanıyor" },
        { value: "ON_THE_WAY", label: "Sipariş Yolda" },
        { value: "DELIVERED", label: "Teslim Edildi" },
        { value: "CANCELED", label: "İptal Edildi" },
      ],
    },
  ];

  // Satır eylemleri
  const getRowActions = (row) => [
    {
      label: "Görüntüle",
      icon: <Visibility />,
      divider: true,
      onClick: () => {
        // Sipariş detay sayfasına yönlendirme
        window.location.href = `/manager/siparisler/${row.orderId}`;
      },
    },
    {
      label:
        row.status === "RECEIVED"
          ? "Onayla"
          : row.status === "GETTING_READY"
          ? "Kuryeye Verildi"
          : row.status === "ON_THE_WAY"
          ? "Teslim Edildi"
          : "Onayla",
      icon: <Done />,
      color: "success",
      disabled: row.status === "CANCELED" || row.status === "DELIVERED",
      onClick: () => handleOrderAction(row),
    },
    {
      label: "Sipariş İptali",
      icon: <DeleteForever />,
      color: "danger",
      disabled: row.status === "CANCELED",
      onClick: () => handleCancelOrder(row.orderId),
    },
  ];

  // Sipariş işlemleri
  const handleOrderAction = async (order) => {
    if (order.status === "RECEIVED") {
      // Siparişi onaylama işlemi
      await openModal({
        title: "Sipariş Onayı",
        body: "Siparişi onaylamak istediğinize emin misiniz?",
        yesButton: "Onayla",
        yesButtonColor: "success",
        noButton: "Vazgeç",
        onAccept: () => {
          axios
            .post(
              `/orders/approveOrder?orderId=${order.orderId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              showDoneSnackbar(res.data);
              getOrders();
            })
            .catch((error) => {
              showErrorSnackbar(error.message);
            });
        },
      });
    } else if (order.status === "GETTING_READY") {
      // Kurye atama işlemi
      await openModal({
        title: "Kurye Atama",
        body: "Siparişin durumunu 'kuryeye teslim edildi' yapmak ister misiniz?",
        yesButtonColor: "success",
        yesButton: "Onayla",
        noButton: "Vazgeç",
        onAccept: () => {
          axios
            .post(
              `/orders/assignCourier?orderId=${order.orderId}&courierId=1`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              showDoneSnackbar(res.data);
              getOrders();
            })
            .catch((error) => {
              showErrorSnackbar(error.message);
            });
        },
      });
    } else if (order.status === "ON_THE_WAY") {
      // Teslim edildi işlemi
      await openModal({
        title: "Teslim Edildi",
        body: "Siparişin durumunu 'teslim edildi' yapmak ister misiniz?",
        yesButtonColor: "success",
        yesButton: "Onayla",
        noButton: "Vazgeç",
        onAccept: () => {
          axios
            .post(
              `/orders/markAsDelivered?orderId=${order.orderId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              showDoneSnackbar(res.data);
              getOrders();
            })
            .catch((error) => {
              showErrorSnackbar(error.message);
            });
        },
      });
    }
  };

  // Sipariş iptal işlemi
  const handleCancelOrder = async (orderId) => {
    await openModal({
      title: "Sipariş İptali",
      body: "Siparişi iptal etmek istediğine emin misin?",
      yesButton: "Siparişi iptal et",
      noButton: "Vazgeç",
      onAccept: () => {
        axios
          .post(`/orders/cancelOrder?orderId=${orderId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            showDoneSnackbar("Sipariş başarıyla iptal edildi.");
            getOrders();
            return response;
          })
          .catch((error) => {
            showErrorSnackbar(error.message);
          });
      },
    });
  };

  // Detay paneli (sipariş ürünleri)
  const renderDetailPanel = (row) => (
    <OrderItemsList orderItems={row.orderItems} />
  );

  return (
    <DataTable
      columns={columns}
      data={orders}
      rowKey="orderId"
      filters={filters}
      defaultOrderBy="orderDate"
      defaultOrder="desc"
      actions
      getRowActions={getRowActions}
      renderDetailPanel={renderDetailPanel}
      expandableRows 
    />
  );
}

ManagerOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
};

export default ManagerOrdersTable;

const OrderItemsList = ({ orderItems }) => (
  <Box
    sx={{
      padding: 1,
    }}
  >
    <List
      variant="soft"
      sx={{
        minWidth: 240,
        borderRadius: "sm",
      }}
    >
      {orderItems?.map((data, i) => (
        <React.Fragment key={i}>
          <ListItem>
            <ListItemDecorator>
              <AspectRatio
                ratio="1"
                sx={{
                  width: "48px",
                  borderRadius: "12px",
                  mr: 2,
                }}
              >
                <img src={data.imageUrl} loading="lazy" alt="" />
              </AspectRatio>
            </ListItemDecorator>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid xs={8}>
                <ListItemContent>
                  <Typography level="title-sm" noWrap>
                    {data.orderDesc}
                  </Typography>
                  <Typography level="body-sm" noWrap>
                    {data.orderName}
                  </Typography>
                </ListItemContent>
              </Grid>
              <Grid xs={2}>
                <Typography level="title-sm">x{data.unit}</Typography>
              </Grid>
              <Grid xs={2}>
                <Typography level="title-sm">
                  ₺{data.price.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          {orderItems.length - 1 !== i && <ListDivider />}
        </React.Fragment>
      ))}
    </List>
  </Box>
);

const convertDate = (date) => {
  const dates = parseISO(date);
  return format(dates, "d MMMM EEE HH:mm", { locale: tr });
};
