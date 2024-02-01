/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import {useEffect, useState} from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import {useParams} from "react-router-dom";
import axios from "axios";
import {Image} from "antd";
import {addToCart, updateCartItem} from './CartActions.ts';
import {useDispatch, useSelector} from "react-redux"; // Adjust the path
import { v4 as uuidv4 } from 'uuid';


const product = {
    breadcrumbs: [
        { id: 1, name: 'Tea', href: '/' },
    ],
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const dispatch = useDispatch();
    // @ts-ignore
    const cartItems = useSelector((state) => state.cart.items);

    const [selectedQuantity, setSelectedQuantity] = useState(100); // Default quantity is 100g
        const { Id } = useParams();
        const [tea, setTea] = useState();

        const apiUrl = 'http://teaeirro.com/api/getTea/' + Id;

        useEffect(() => {
            axios
                .get(apiUrl)
                .then((resp) => {
                    setTea(resp.data);
                    console.log(resp.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

        const handleQuantityChange = (e) => {
            setSelectedQuantity(parseFloat(e.target.value));
        };

        const calculatePrice = () => {
            // Update the price based on the selected quantity
            // @ts-ignore
            return `${(selectedQuantity / 100) * parseFloat(tea?.price.replace('$', '')).toFixed(2)}₴`;

        };


    const handleAddToCart = () => {
        const existingCartItem = cartItems.find(
            item => item.teaId === tea?.["id"] && item.weight === selectedQuantity
        );
        if (existingCartItem) {
            // If the tea is already in the cart, update its quantity
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1, // Increment the quantity by 1
                weight: existingCartItem.weight + selectedQuantity,
                price: existingCartItem.price + existingCartItem.price,
            };
            dispatch(updateCartItem(updatedCartItem)); // Assume you have an action like updateCartItem to handle the update
        } else {
            // If the tea is not in the cart, add a new item with a new ID
            const cartItem = {
                id: uuidv4(),
                teaId: tea?.["id"],
                name: tea?.["name"],
                image: tea?.["tea_images"]?.[0]?.["name"],
                price: parseFloat(calculatePrice()),
                quantity: 1, // Start from 1
                weight: selectedQuantity, // Add the weight field
            };
            dispatch(addToCart(cartItem)); // Assume you have an action like addToCart to handle the addition
        }
    };

    return (

        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}

                        <li className="text-sm">
                            <a  aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {tea?.["name"]}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    {/*@ts-ignore*/}
                    {tea?.["tea_images"]?.map((image, index) => (
                        <div key={index} className={`aspect-h-2 aspect-w-3 overflow-hidden rounded-lgS`}>
                            <Image
                                src={`http://teaeirro.com/upload/${image?.name}`}
                                alt={image?.alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    ))}

                    <Image
                        src={`http://teaeirro.com/upload/${tea?.["tea_type"]?.["name"]}.jpg`}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{tea?.["name"]}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{calculatePrice()}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            {/* Quantity Selector */}
                            <div className="mt-4">
                                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                                    Quantity
                                </label>
                                <select
                                    id="quantity"
                                    name="quantity"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                >
                                    <option value={100}>100g</option>
                                    <option value={250}>250g</option>
                                    <option value={500}>500g</option>
                                    <option value={1000}>1kg</option>
                                </select>
                            </div>

                            {/* Add to Bag Button */}
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 px-8 py-3 text-base font-medium text-white hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to bag
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{tea?.["description"]}</p>
                            </div>
                        </div>
                        <div className={'flex gap-40'}>
                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {/*@ts-ignore*/}
                                        {tea?.["ingredients"] && tea?.["ingredients"]?.split(',').map((ingredient, index) => (
                                                <li key={index} className="text-gray-400">
                                                    <span className="text-gray-600">{ingredient.trim()}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Origin</h2>

                                <div className="mt-4 space-y-6 flex gap-16">
                                    <p className="text-sm text-gray-600">{tea?.["tea_origin"]?.["name"]}</p>
                                    <img
                                        src={`https://tealaravel.azurewebsites.net/upload/${tea?.["tea_origin"]?.["name"]}.svg`}
                                        alt={tea?.["tea_origin"]?.["name"]}
                                        className="w-36"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
