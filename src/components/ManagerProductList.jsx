/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react"
import Box from "@mui/joy/Box"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListDivider from "@mui/joy/ListDivider"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"

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
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}

export default function ManagerProductList({ listItems }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 5; // Varsayılan olarak sayfa başına 10 satır
  const pageCount = Math.ceil(listItems.length / rowsPerPage); // Toplam sayfa sayısı

  // Mevcut sayfada gösterilecek öğeleri hesaplayan kısım
  const currentListItems = listItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Sayfa değiştirme fonksiyonu
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {currentListItems.map(listItem => (
        <List key={listItem.productsId} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            <Typography fontWeight={600}>
              {listItem.productName}
            </Typography>
            <Typography level="body2">
              {listItem.productDesc}
            </Typography>
            <Typography level="body2">
              {listItem.category}
            </Typography>
            <Typography level="body2" fontWeight="bold">
              ₺{listItem.price.toFixed(2)}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
            >
              <RowMenu />
            </Box>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Sayfa {currentPage}/{pageCount}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => handleChangePage(Math.min(pageCount, currentPage + 1))}
          disabled={currentPage === pageCount}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
