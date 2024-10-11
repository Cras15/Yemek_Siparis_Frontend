import {
    DialogContent,
    DialogTitle,
    Modal,
    ModalClose,
    ModalDialog,
  } from '@mui/joy';
  import React from 'react';
  import FilterChild from './FilterChild';
  
  const HomePageFilterModal = ({ open, setOpen, categorys }) => {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog layout="fullscreen">
          <ModalClose />
          <DialogTitle>Filtrele</DialogTitle>
          <DialogContent sx={{ mt: 3 }}>
            <FilterChild
              categorys={categorys}
              closeModal={() => setOpen(false)}
            />
          </DialogContent>
        </ModalDialog>
      </Modal>
    );
  };
  
  export default HomePageFilterModal;
  