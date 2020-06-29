import React, { useEffect, useState, useRef } from "react";
import { Layout } from "../components";
import Link from "next/link";
import Head from "next/head";
import getCharacters from "../services/getCharacters";
import useObserver from "../hooks/useObserver";
const Index = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const elementRef = useRef();

  //! primera carga
  useEffect(() => {
    getCharacters().then((peticion) => {
      setCharacters(peticion.results);
    });
  }, []);

  //! paginacion
  useEffect(() => {
    if (page == 1) return;
    getCharacters(`?page=${page}`).then((peticion) => {
      setCharacters((oldData) => [...oldData, ...peticion.results]);
    });
  }, [page]);

  const { observerElement } = useObserver(elementRef);

  //! infinity scroll
  useEffect(() => {
    if (observerElement) {
      setPage((pagina) => (pagina += 1));
    }
  }, [observerElement]);

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Layout>
        <section className="text-gray-700 bg-gray-900 body-font">
          <section className="min-h-screen text-gray-500 bg-gray-900 body-font">
            <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
              <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://dummyimage.com/720x600"
                />
              </div>
              <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
                <h1 className="mb-4 text-3xl font-medium text-white title-font sm:text-4xl">
                  Before they sold out
                  <br className="hidden lg:inline-block" />
                  readymade gluten
                </h1>
                <p className="mb-8 leading-relaxed">
                  Copper mug try-hard pitchfork pour-over freegan heirloom
                  neutra air plant cold-pressed tacos poke beard tote bag.
                  Heirloom echo park mlkshk tote bag selvage hot chicken
                  authentic tumeric truffaut hexagon try-hard chambray.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                    Button
                  </button>
                  <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-400 bg-gray-800 border-0 rounded focus:outline-none hover:bg-gray-700 hover:text-white">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </section>
          <div className="container px-5 pb-10 mx-auto">
            <div className="-m-4">
              <div className="flex flex-wrap -m-4">
                {characters.map((character) => (
                  <div
                    className="p-4 border-2 border-transparent cursor-pointer lg:w-1/4 md:w-1/2 hover:border-green-500"
                    key={character.id}
                  >
                    <Link
                      href="/personajes/[id]"
                      as={`/personajes/${character.id}`}
                    >
                      <a>
                        <div className="flex flex-col items-center h-full text-center">
                          <img
                            alt="team"
                            className="flex-shrink-0 object-cover object-center w-full h-56 mb-4 rounded-lg"
                            src={character.image}
                          />
                          <div className="w-full">
                            <h2 className="text-lg font-medium text-white title-font">
                              {character.name}
                            </h2>
                            <h3 className="mb-3 text-gray-600">
                              {character.species} - {character.status}
                            </h3>
                            <p className="mb-4">
                              DIY tote bag drinking vinegar cronut adaptogen
                              squid fanny pack vaporware.
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={elementRef} />
        </section>
      </Layout>
    </>
  );
};

export default Index;
