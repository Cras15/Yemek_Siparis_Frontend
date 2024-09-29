import { WarningRounded } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy'
import React from 'react'

const YesNoModal = ({isOpen, closeModal, title, body, yesButton, noButton, onAccept, onCancel}) => {
    return (
        <Modal open={isOpen} onClose={closeModal}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRounded />
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {body}
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={onAccept}>
                        {yesButton}
                    </Button>
                    <Button variant="plain" color="neutral" onClick={onCancel}>
                        {noButton}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
}

export default YesNoModal