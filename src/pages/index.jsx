import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import getCharacters from "../services/getCharacters";
import useObserver from "../hooks/useObserver";
import Image from "next/image";
import { validateStateCharacter } from "../helpers";

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
        <meta
          property="og:title"
          content="sitio web de pruebas utilizando la api de rick and morty"
          key="title"
        />
      </Head>

      <section className="text-gray-700 bg-gray-900 body-font">
        <div className="container px-5 pb-10 mx-auto">
          <div className="-m-4">
            <div className="flex flex-wrap -m-4">
              {characters.map((character) => (
                <div
                  className="w-full p-4 border-2 border-transparent cursor-pointer lg:w-1/4 md:w-1/2 hover:border-green-500"
                  key={character.id}
                >
                  <Link href={`/personajes/${character.id}`}>
                    <a>
                      <div className="flex flex-col items-center h-full text-center">
                        <picture className="relative flex-shrink-0 object-cover object-center w-full h-56 mb-4 rounded-lg">
                          <Image
                            src={character.image}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            alt="image character"
                            quality="10"
                          />
                        </picture>

                        <div className="w-full">
                          <h2 className="text-lg font-medium text-white title-font">
                            {character.name}
                          </h2>
                          <h3 className="flex justify-center mb-3 text-gray-500">
                            <span>specie {character.species}</span> -
                            <span className="flex items-center">
                              {character.status}
                              <div
                                className={`w-4 h-4 ml-2 rounded-full ${validateStateCharacter(
                                  character.status
                                )}
                                  `}
                              />
                            </span>
                          </h3>
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
    </>
  );
};

export default Index;
