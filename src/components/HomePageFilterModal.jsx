import { Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy'
import React from 'react'
import FilterChild from './FilterChild'

const HomePageFilterModal = ({ open, setOpen }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog layout="fullscreen">
                <ModalClose />
                <DialogTitle>Filtrele</DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <FilterChild />
                    <Button sx={{ mt: 5, borderRadius:'lg' }} size='lg'>Filteleri Uygula</Button>
                </DialogContent>
            </ModalDialog>
        </Modal>
    )
}

export default HomePageFilterModal