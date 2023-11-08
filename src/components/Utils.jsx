export const etcString = (str, maxChar) => {
    return (str.length <= maxChar ? str : (str.substr(0, maxChar) + "..."))
}

export const OrderStatus = {
    RECEIVED: "Sipariş alındı",
    ACCEPTED: "Sipariş kabul edildi",
    ON_THE_WAY: "Yolda",
    DELIVERED: "Teslim edildi",
    AT_ADDRESS: "Adreste",
    CANCELED: "Sipariş iptal edildi"
};

export const OrderStatusColor = {
    RECEIVED: "success",
    ACCEPTED: "success",
    ON_THE_WAY: "warning",
    DELIVERED: "success",
    AT_ADDRESS: "success",
    CANCELED: "danger"
};