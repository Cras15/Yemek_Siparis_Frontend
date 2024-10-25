// UIContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import YesNoModal from '../components/YesNoModal';
import { Button, Snackbar } from '@mui/joy';
import { Check, WarningRounded } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const UIContext = createContext();

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export const UIProvider = ({ children }) => {
    const [modalProps, setModalProps] = useState(null);
    const [snackbarProps, setSnackbarProps] = useState(null);

    const openModal = (props) => setModalProps({ ...props, isOpen: true });
    const closeModal = () => setModalProps(null);

    const showSnackbar = (props) => setSnackbarProps({ ...props, open: true });
    const hideSnackbar = () => setSnackbarProps(null);

    const showDoneSnackbar = (message = '��lem ba�ar�l�!') => {
        showSnackbar({
            children: message,
            color: 'success',
            startDecorator: <Check />,
            autoHideDuration: 3000,
        });
    };

    const showErrorSnackbar = (message = 'Bir hata olu�tu.') => {
        showSnackbar({
            children: message,
            color: 'danger',
            startDecorator: <WarningRounded />,
            autoHideDuration: 3000,
        });
    };

    return (
        <UIContext.Provider
            value={{
                openModal,
                closeModal,
                showSnackbar,
                hideSnackbar,
                showDoneSnackbar,
                showErrorSnackbar,
            }}
        >
            {children}
            {modalProps && (
                <YesNoModal
                    {...modalProps}
                    closeModal={closeModal}
                    onAccept={() => {
                        modalProps.onAccept();
                        closeModal();
                    }}
                    onCancel={() => {
                        modalProps.onCancel && modalProps.onCancel();
                        closeModal();
                    }}
                />
            )}

            {snackbarProps && (
                <Snackbar
                    variant="solid"
                    color='success'
                    open={snackbarProps.open}
                    onClose={hideSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    startDecorator={snackbarProps.color === 'success' ? <Check /> : <WarningRounded />}
                    autoHideDuration={3000}
                    {...snackbarProps}
                    endDecorator={
                        <Button
                            onClick={hideSnackbar}
                            size="sm"
                            variant="solid"
                            color={snackbarProps.color}
                        >
                            OK
                        </Button>
                    }
                    animationDuration={600}
                    sx={{
                        ml: 1,
                        animation: snackbarProps?.open
                            ? `${inAnimation} ${600}ms forwards`
                            : `${outAnimation} ${600}ms forwards`,
                    }}
                />
            )}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
