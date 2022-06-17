import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Product } from "../components/Product";

const DATA = {
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, eligendi? Quae quidem, id repudiandae doloremque suscipit consectetur quibusdam, blanditiis nisi in natus odio deleniti voluptatum aliquam ipsam! Odio, labore assumenda? Id nemo qui tempora cum sequi excepturi, quisquam alias. Quos laudantium officia, est debitis aliquid ipsam vitae? Dolor facere harum, architecto esse enim qui ipsa dolorum dolores consequatur aspernatur nesciunt.Laudantium autem molestiae accusantium, architecto ex harum consequuntur ipsum asperiores magnam voluptatibus beatae commodi dolore delectus esse. Recusandae labore enim ut, similique, doloremque minima, inventore praesentium quam saepe dolores facere. Vero inventore sed error facilis quasi nobis dolor perferendis dignissimos quis cupiditate officia eius repellendus expedita maiores, laudantium esse voluptatem distinctio, impedit possimus aspernatur obcaecati? Ipsa doloribus perspiciatis tempora iusto! Earum corrupti in velit quo nihil nisi id, aperiam perspiciatis reiciendis voluptas nam? Architecto nobis vero suscipit accusamus dolores voluptatibus error doloremque ducimus earum. Libero repudiandae ut hic non fugiat.",
  thumbnailUrl: "https://picsum.photos/id/111/1060/",
  thumbnailAlt: "Jakiś tam opis obrazka",
  rating: 2.5,
};

const Home = () => {
  const [isProductVisible, setIsProductVisible] = useState(false);
  const toggleShowProduct = () => {
    setIsProductVisible(!isProductVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <>
          <section className="text-gray-600 body-font">
            {!isProductVisible && (
              <div className="container mx-auto flex px-5 pt-24 items-center justify-center flex-col">
                <img
                  className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                  alt="hero"
                  src="/hero.jpeg"
                />
                <div className="text-center lg:w-2/3 w-full">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    Microdosing synth tattooed vexillologist
                  </h1>
                  <p className="mb-8 leading-relaxed">
                    Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher
                    trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
                    Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache
                    pitchfork.
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={toggleShowProduct}
              >
                {!isProductVisible ? "See example product" : "Hide example product"}
              </button>
            </div>
            {isProductVisible && (
              <div className="animate-fade-in-down">
                <Product data={DATA} />
              </div>
            )}
          </section>
        </>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
