import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  AspectRatio,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Textarea,
  Typography
} from '@mui/joy'
import { format, parseISO } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { OrderStatus, OrderStatusColor } from './Utils'
import {
  ArrowDownward,
  LocationOnOutlined,
  StarBorderRounded,
  StarRounded
} from '@mui/icons-material'
import { Rating, styled } from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useUI } from '../utils/UIContext'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#4393E4',
  },
  '& .MuiRating-iconHover': {
    color: '#06B6BCB',
  },
});

const OrderCard = ({ data, getOrders }) => {
  const [ratingOpen, setRatingOpen] = React.useState(false);
  const { token } = useSelector((state) => state.user);
  const { showDoneSnackbar, showErrorSnackbar } = useUI();

  const convertDate = (date) => {
    const dates = parseISO(date); // Tarihi ISO formatından Date objesine çevirir
    return format(dates, "d MMMM EEE HH:mm", { locale: tr });
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await axios.post(`/reviews/order/${data.orderId}`, {
      serviceRating: formData.get('serviceRating'),
      tasteRating: formData.get('tasteRating'),
      deliveryRating: formData.get('deliveryRating'),
      comment: formData.get('comment')
    }, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      if (res.status === 200) {
        showDoneSnackbar("Yorumunuz gönderildi.");
        getOrders();
      }
      else
        showErrorSnackbar(res.data);
    }).catch((error) => {
      showErrorSnackbar(error.response.data);
    });
  }

  return (
    <>
      <Card
        variant="outlined"
        orientation="vertical"
        key={data.orderId * 10}
        sx={{
          minWidth: 220,
          width: 'auto',
          m: 'auto',
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <AspectRatio
            ratio="1"
            sx={{ width: { xs: '100%', sm: 120, borderRadius:10 } }}
          >
            <img
              src={data.shopImageUrl}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent sx={{ flex: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography level="title-lg" id="card-description">
                {data.shopName}
              </Typography>
              <Typography
                level="title-lg"
                aria-describedby="card-description"
                mb={1}
                sx={{ fontWeight: 'bold' }}
              >
                {(data.finalPrice - data.discount).toFixed(2)} TL
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                {data.deliveryDate
                  ? `${convertDate(data.deliveryDate)} tarihinde teslim edildi.`
                  : `${convertDate(data.orderDate)} tarihinde sipariş edildi.`}
              </Typography>
              <Chip
                variant="soft"
                color={OrderStatusColor[data.status] || "danger"}
                size="md"
                sx={{ pointerEvents: 'none', ml: { xs: 0, sm: 'auto' }, mt: { xs: 1, sm: 0 }, height: 20 }}
              >
                {OrderStatus[data.status] || "Durum bilinmiyor"}
              </Chip>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <div>
                {data.orderItems.slice(0, 3).map((item, i) => (
                  <Typography
                    level="body-md"
                    aria-describedby="card-description"
                    key={i * item.unit}
                  >
                    {item.unit} x {item.orderName} {(i === 2 && data.orderItems.length !== i + 1) && "..."}
                  </Typography>
                ))}
              </div>
              {data.status === "DELIVERED" && (
                <Button
                  variant="soft"
                  disabled={data.review !== null}
                  startDecorator={<StarRounded />}
                  size='sm'
                  sx={{ ml: { xs: 0, sm: 'auto' }, mt: { xs: 1, sm: 0 }, borderRadius: 'xl', height: 25 }}
                  onClick={() => setRatingOpen(true)}
                >
                  Değerlendir
                </Button>
              )}
            </Stack>
          </CardContent>
        </Stack>
        <Divider />
        <AccordionGroup disableDivider>
          <Accordion>
            <AccordionSummary>Ayrıntıları Gör</AccordionSummary>
            <AccordionDetails>
              <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
              >
                <div className='grid-flow-row gap-0 hidden md:grid'>
                  <LocationOnOutlined color='primary' />
                  <Divider
                    orientation="vertical"
                    sx={{
                      mx: 'auto',
                      height: 'auto',
                      bgcolor: 'var(--variant-plainColor, rgba(var(--joy-palette-primary-mainChannel, 11 107 203) / 1))'
                    }}
                  />
                  <LocationOnOutlined color='primary' sx={{ mt: 'auto' }} />
                </div>
                <div>
                  <Typography level="body-xs" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                    Siparişin Verildiği Yer:
                  </Typography>
                  <Typography level="body-md" aria-describedby="card-description">
                    {data.shopName}
                  </Typography>
                  <ArrowDownward sx={{ mt: 1, ml: 'auto', width: 100 }} color='primary' />
                  <Typography level="body-xs" aria-describedby="card-description" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Teslim edildiği yer:
                  </Typography>
                  <Typography level="body-md" aria-describedby="card-description">
                    {data.address}
                  </Typography>
                </div>
              </Stack>
              <Divider sx={{ my: 1 }} />
              {data.orderItems.map((item, i) => (
                <Stack direction="row" key={i * 13}>
                  <Typography level="body-sm" aria-describedby="card-description">
                    {item.unit} x {item.orderName}
                  </Typography>
                  <Typography level="body-sm" aria-describedby="card-description" sx={{ ml: 'auto' }}>
                    {(item.price * item.unit).toFixed(2)} TL
                  </Typography>
                </Stack>
              ))}
              <Divider sx={{ my: 1 }} />
              <Stack direction="row">
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                  Ara Toplam:
                </Typography>
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                  {(data.finalPrice).toFixed(2)} TL
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                  İndirim:
                </Typography>
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                  {(data.discount).toFixed(2)} TL
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                  Toplam:
                </Typography>
                <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                  {(data.finalPrice - data.discount).toFixed(2)} TL
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 350,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <form onSubmit={handleReviewSubmit}>
            <Typography
              id="modal-title"
              level="title-lg"
              textColor="inherit"
              fontWeight="lg"
              pr={4}
              mb={1}
            >
              {data.shopName} için değerlendirme yapın
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary" mt={3}>
              Servis:<br />
              <StyledRating
                name="serviceRating"
                defaultValue={1}
                size='large'
                getLabelText={(value) => `${value} Puan`}
                icon={<StarRounded fontSize="inherit" />}
                emptyIcon={<StarBorderRounded fontSize="inherit" />}
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary" mt={2}>
              Lezzet:<br />
              <StyledRating
                name="tasteRating"
                defaultValue={1}
                size='large'
                getLabelText={(value) => `${value} Puan`}
                icon={<StarRounded fontSize="inherit" />}
                emptyIcon={<StarBorderRounded fontSize="inherit" />}
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary" mt={2}>
              Teslimat:<br />
              <StyledRating
                name="deliveryRating"
                mb={2}
                defaultValue={1}
                size='large'
                getLabelText={(value) => `${value} Puan`}
                icon={<StarRounded fontSize="inherit" />}
                emptyIcon={<StarBorderRounded fontSize="inherit" />}
              />
            </Typography>
            <Textarea
              sx={{ mt: 2 }}
              minRows={3}
              placeholder="Yorumunuz..."
              variant="outlined"
              name='comment'
            />
            <Button
              variant="solid"
              type='submit'
              fullWidth
              color="primary"
              sx={{ mt: 2, ml: 'auto', borderRadius: 'xl', height: 25 }}
            >
              Gönder
            </Button>
          </form>
        </Sheet>
      </Modal>
    </>
  )
}

export default OrderCard;
