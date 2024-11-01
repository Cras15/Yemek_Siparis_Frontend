// src/components/SupportTicketView.jsx
import { SendRounded } from '@mui/icons-material';
import { Box, Button, FormControl, Textarea, Typography, Avatar, Sheet, Stack, IconButton } from '@mui/joy';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const SupportTicketView = ({ HeaderComponent }) => {
    const { id } = useParams();
    const [supportTicket, setSupportTicket] = useState({});
    const [messageValue, setMessageValue] = useState('');
    const { user, token } = useSelector((state) => state.user);
    const messagesEndRef = useRef(null);

    const getSupportTicket = async () => {
        try {
            const response = await axios.get(`/support-tickets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSupportTicket(response.data);
            scrollToBottom();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleSendMessage = async () => {
        if (!messageValue.trim()) return;
        try {
            await axios.post(`/support-tickets/${id}/messages`, { message: messageValue }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessageValue('');
            getSupportTicket();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        getSupportTicket();
        // eslint-disable-next-line
    }, []);

    return (
        <Sheet
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.level1',
            }}
        >
            {/* Header Bileşeni */}
            {HeaderComponent && <HeaderComponent supportTicket={supportTicket} />}

            {/* Mesaj Listesi */}
            <Box
                sx={{
                    flex: 1,
                    px: 3,
                    py: 2,
                    overflowY: 'auto',
                    backgroundColor: 'background.level2',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack spacing={2}>
                    {supportTicket?.messages?.map((message, index) => {
                        const isYou = message?.sender?.userId === user?.userId;
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ justifyContent: isYou ? 'flex-end' : 'flex-start' }}
                            >
                                {!isYou && (
                                    <Avatar src={message.sender.avatar} alt={message.sender.name} />
                                )}
                                <Box
                                    sx={{
                                        maxWidth: '70%',
                                        padding: 2,
                                        borderRadius: 'md',
                                        backgroundColor: isYou ? 'primary.100' : 'background.surface',
                                        color: 'text.primary',
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <Typography>{message.content}</Typography>
                                    <Typography level="body-xs" color="text.secondary" sx={{ mt: 0.5, textAlign: 'right' }}>
                                        {format(new Date(message.sentAt), "d MMMM yyyy, HH:mm:ss", { locale: tr })}
                                    </Typography>
                                </Box>
                            </Stack>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </Stack>
            </Box>

            {/* Mesaj Yazma Kutusu */}
            <Box
                sx={{
                    px: 3,
                    py: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.body',
                    flexShrink: 0,
                }}
            >
                <FormControl>
                    {(supportTicket.status === "CLOSED" && user.role !== "ADMIN") ?
                        <Typography color='danger' textAlign="center" level='body-lg'>Talebin <Typography fontWeight="bold" color='primary'>{supportTicket?.assignee?.firstname} {supportTicket?.assignee?.lastname}</Typography> adlı yetkili tarafından kapatılmış.</Typography> :
                        <Textarea
                            placeholder="Bir şeyler yazın…"
                            aria-label="Mesaj"
                            onChange={(event) => setMessageValue(event.target.value)}
                            value={messageValue}
                            minRows={2}
                            maxRows={6}
                            endDecorator={
                                <Button
                                    size="sm"
                                    color="primary"
                                    sx={{ borderRadius: 'md', ml: 'auto' }}
                                    endDecorator={<SendRounded />}
                                    onClick={handleSendMessage}
                                    disabled={!messageValue.trim()}
                                >
                                    Gönder
                                </Button>
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                                    handleSendMessage();
                                }
                            }}
                            sx={{
                                '& textarea': {
                                    resize: 'none',
                                    borderRadius: 'md',
                                    padding: 2,
                                },
                            }}
                        />
                    }
                </FormControl>
            </Box>
        </Sheet>
    );
};

SupportTicketView.propTypes = {
    HeaderComponent: PropTypes.elementType,
};

export default SupportTicketView;
