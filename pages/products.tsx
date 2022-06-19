import { Pagination } from "components/Pagination";
import { ProductDetails } from "components/Product";
import ProductListItem from "components/ProductListItem";
import { InferGetStaticPropsType } from "next";

const getProducts = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
  return data;
};

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((product) => {
          return (
            <li key={product.id} className="shadow-sm border">
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.title,
                  thumbnailUrl: product.image,
                  thumbnailAlt: product.title,
                }}
              />
            </li>
          );
        })}
      </ul>
      <Pagination />
    </div>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
