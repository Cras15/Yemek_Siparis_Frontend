export const etcString = (str, maxChar) => {
    return (str.length <= maxChar ? str : (str.substr(0, maxChar) + "..."))
}