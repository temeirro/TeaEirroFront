const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedAddItems = [...state.items, action.payload];
            localStorage.setItem('cart', JSON.stringify(updatedAddItems));
            return {
                ...state,
                items: updatedAddItems,
            };

        case 'REMOVE_FROM_CART':
            const itemIdToRemove = action.payload;
            const updatedRemoveItems = state.items.filter(({id}) => id !== itemIdToRemove);
            localStorage.setItem('cart', JSON.stringify(updatedRemoveItems));
            return {
                ...state,
                items: updatedRemoveItems,
            };

        case 'UPDATE_CART_ITEM':
            const updatedCartItem = action.payload;
            const updatedItems = state.items.map(item => {
                    return item["id"] === updatedCartItem.id ? updatedCartItem : item;
                }
            );
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems,
            };
        case 'CLEAR_CART':
            localStorage.removeItem('cart'); // Optional: clear cart from localStorage
            return {
                ...state,
                items: [],
            };

        // Add other cases for updating quantities, etc.

        default:
            return state;
    }
};

export default cartReducer;

