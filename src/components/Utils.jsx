export const etcString = (str, maxChar) => {
    return (str.length <= maxChar ? str : (str.substr(0, maxChar) + "..."))
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const OrderStatus = {
    RECEIVED: "Sipariş alındı",
    GETTING_READY: "Sipariş hazırlanıyor",
    ON_THE_WAY: "Sipariş yolda",
    DELIVERED: "Teslim edildi",
    CANCELED: "Sipariş iptal edildi"
};

export const OrderStatusColor = {
    RECEIVED: "success",
    GETTING_READY: "success",
    ON_THE_WAY: "warning",
    DELIVERED: "success",
    CANCELED: "danger"
};