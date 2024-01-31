export const addToCart = (item) => ({
    type: 'ADD_TO_CART',
    payload: item,
});
export const deleteFromCart = (item) => ({
    type: 'REMOVE_FROM_CART',
    payload: item,
});

export const updateCartItem = (item) => ({
    type: 'UPDATE_CART_ITEM',
    payload: item,
});

export const clearCart = () => {
    return {
        type: 'CLEAR_CART',
    };
};