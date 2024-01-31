import { useDispatch, useSelector } from 'react-redux';
import {clearCart, deleteFromCart} from './CartActions.ts';
import { TrashIcon } from '@heroicons/react/24/outline';
import {Button, Divider, InputNumber} from "antd";
import image from "../../images/tea.png"

export default function Example() {
    const dispatch = useDispatch();
    // @ts-ignore
    const cartItems = useSelector((state) => state.cart.items);
    // @ts-ignore

    const handleRemoveFromCart = (productId) => {
        // Dispatch the action to remove item from the cart
        dispatch(deleteFromCart(productId));
    };
    const calculateTotalPrice = () => {
        // @ts-ignore
        return cartItems.reduce((total, item) => total + item.price, 0);
    };
    return (
        <>
            <div className="relative w-full mt-8 lg:mt-0 group">
                <img
                    className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover blur-sm group-hover:blur-none transition-all duration-300"
                    src={image}
                    alt=""
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4  border border-black bg-black bg-opacity-50  transition-all duration-300">
                    <h1 className="text-9xl">cart</h1>
                </div>
            </div>

            <div className="bg-white shadow-xl">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {cartItems.length === 0 ? (
                        <div className="flex items-center justify-center">
                            {/* Display centered image when cartItems is empty */}
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                alt="Centered Image"
                                className="w-48 h-48"
                            />
                        </div>
                    ) : (
                        <>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your items ({cartItems.length}) <Divider type="vertical"/> Price: {calculateTotalPrice()}₴</h2>
                            <div className={'flex gap-5 '}>

                                <Button className={'mt-5 w-auto h-10 text-center bg-yellow-100'}>
                                    Checkout [in dev]
                                </Button>
                                <Button onClick={() => dispatch(clearCart())} className={'mt-5 w-auto h-10 text-center'}>
                                    Clear cart
                                </Button>
                            </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        {cartItems.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 transition-opacity duration-300 lg:h-80">
                                    <img
                                        src={`http://teaeirro.com/upload/${product.image}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={`/tea/details/${product.teaId}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product?.weight}g - {product?.quantity} bag(-s)</p>
                                    </div>
                                    <div className="flex items-center">
                                        <InputNumber
                                            min={1}
                                            max={10}
                                            defaultValue={product.quantity}
                                            className={'mr-3'} disabled
                                        />
                                        <p className="text-sm font-medium text-gray-900">{product.price}₴</p>
                                        <button
                                            onClick={() => handleRemoveFromCart(product.id)}
                                            className="z-10 ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>


                        </> )}
                </div>
            </div>
        </>
    );
}
