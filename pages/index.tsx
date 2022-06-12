import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Product } from "../components/Product";

const DATA = {
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, eligendi? Quae quidem, id repudiandae doloremque suscipit consectetur quibusdam, blanditiis nisi in natus odio deleniti voluptatum aliquam ipsam! Odio, labore assumenda? Id nemo qui tempora cum sequi excepturi, quisquam alias. Quos laudantium officia, est debitis aliquid ipsam vitae? Dolor facere harum, architecto esse enim qui ipsa dolorum dolores consequatur aspernatur nesciunt.Laudantium autem molestiae accusantium, architecto ex harum consequuntur ipsum asperiores magnam voluptatibus beatae commodi dolore delectus esse. Recusandae labore enim ut, similique, doloremque minima, inventore praesentium quam saepe dolores facere. Vero inventore sed error facilis quasi nobis dolor perferendis dignissimos quis cupiditate officia eius repellendus expedita maiores, laudantium esse voluptatem distinctio, impedit possimus aspernatur obcaecati? Ipsa doloribus perspiciatis tempora iusto! Earum corrupti in velit quo nihil nisi id, aperiam perspiciatis reiciendis voluptas nam? Architecto nobis vero suscipit accusamus dolores voluptatibus error doloremque ducimus earum. Libero repudiandae ut hic non fugiat.",
  thumbnailUrl: "https://picsum.photos/seed/picsum/1060/",
  thumbnailAlt: "Jakiś tam opis obrazka",
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      <Main>
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
