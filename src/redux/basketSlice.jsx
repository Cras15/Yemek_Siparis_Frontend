import { createSlice, current } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        baskets: []
    },
    reducers: {
        addBasket(state, action) {
            if (state.baskets.some(item => action.payload.productsId === item.productsId))
                state.baskets = state.baskets.map(item => {
                    if (item.productsId === action.payload.productsId)
                        return { ...item, unit: item?.unit + 1 };
                    return item;
                })
            else {
                if (action.payload.unit == null || action.payload.unit == undefined)
                    action.payload.unit = 1;
                state.baskets.push(action.payload);
            }
            console.log((state.baskets));
        },
        removeBasket(state, action) {
            if (state.baskets.some(item => action.payload.productsId === item.productsId))
                if (action.payload.unit > 1)
                    state.baskets = state.baskets.map(item => {
                        if (item.productsId === action.payload.productsId)
                            return { ...item, unit: item?.unit - 1 };
                        return item;
                    })
                else
                    state.baskets = state.baskets.filter(item => item.productsId !== action.payload.productsId)
        }
    }
});

export const { addBasket, removeBasket } = basketSlice.actions
export default basketSlice.reducer;