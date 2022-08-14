import Image from "next/image";
import Link from "next/link";
import { useCartState } from "../cart/CartContext";
import { ProductDetails } from "./Product";

type ProductListItem = Pick<ProductDetails, "slug" | "title" | "thumbnailUrl" | "thumbnailAlt">;
interface ProductListItemProps {
  data: ProductListItem;
}

const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  const handleAddToCart = () => {
    cartState.addItemToCart({ title: data.title, price: 12, count: 1, slug: data.slug });
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden h-full py-4">
      <div className="container px-5 mx-auto h-full">
        <div className="w-full lg:mt-0 flex flex-col justify-between h-full">
          <Image
            width={300}
            height={200}
            className="bg-white object-contain"
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
          />
          <div>
            <span className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</span>
            <Link href={`/products/${data.slug}`}>
              <a className="hover:underline">
                <h3 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.title}</h3>
              </a>
            </Link>
          </div>
          <div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
              <button
                onClick={() => handleAddToCart()}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListItem;