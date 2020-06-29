import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Layout, Spinner } from "../../components";
import getCharacters from "../../services/getCharacters";

const Personaje = () => {
  const router = useRouter();
  const { id } = router.query;

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCharacters(id).then((peticion) => {
        setCharacters(peticion);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{loading ? "personaje" : characters.name}</title>
      </Head>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <section className="text-gray-500 bg-gray-900 body-font">
            <div className="container flex flex-wrap px-5 py-24 mx-auto">
              <div className="w-full mb-10 overflow-hidden rounded-lg lg:w-1/2 lg:mb-0">
                <img
                  alt="feature"
                  className="object-cover object-center w-full h-full"
                  src={characters.image}
                />
              </div>
              <div className="flex flex-col items-center p-20 mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
                <h2 className="mb-2 text-3xl font-medium text-white title-font sm:text-4xl">
                  {characters.name}
                </h2>
                <p className="text-white">
                  {characters.status != "Alive" ? (
                    <span className="px-4 py-1 bg-red-500 rounded-full ">
                      {characters.status}
                    </span>
                  ) : (
                    <span className="px-4 py-1 bg-green-500 rounded-full ">
                      {characters.status}
                    </span>
                  )}
                </p>
                <h4 className="mb-2 text-lg text-gray-400">
                  specie: {characters.species}
                  <br />
                  origin: {characters.origin.name}
                </h4>
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aperiam repellendus ut perferendis quibusdam quia accusantium
                  dolores asperiores molestias ipsa voluptas exercitationem,
                  neque ad maiores recusandae inventore id, laborum minus dicta.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis pariatur et suscipit beatae dignissimos vel totam
                  quas culpa repellat! Et odio quibusdam voluptas laboriosam,
                  libero necessitatibus quasi sequi eligendi sit!
                </p>
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export default Personaje;
