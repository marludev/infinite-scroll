import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Spinner } from "../../components";
import getCharacters from "../../services/getCharacters";
import ErrorPage from "next/error";
import Image from "next/image";
import Router from "next/router";
import { validateStateCharacter } from "../../helpers";

const Personaje = ({ data }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setCharacters(data);
      setLoading(false);
    }
  }, []);
  if (!data) {
    return <ErrorPage status="404" />;
  }

  return (
    <>
      <Head>
        <title>{characters.name}</title>
        <meta property="og:title" content={characters.name} key="title" />
        <meta property="og:image" content={characters.image} key="title" />
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <section className="text-gray-500 bg-gray-900 body-font">
          <div className="container flex flex-wrap px-5 py-24 mx-auto">
            <div className="flex justify-end w-full mb-10 overflow-hidden rounded-lg lg:w-1/2 lg:mb-0">
              <picture>
                <Image src={characters.image} width={500} height={500} />
              </picture>
            </div>
            <div className="flex flex-col items-center p-20 mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
              <h2 className="mb-2 text-3xl font-medium text-white title-font sm:text-4xl">
                {characters.name}
              </h2>
              <p className="text-white">
                <span
                  className={`px-4 py-1 rounded-full ${validateStateCharacter(
                    characters.status
                  )}`}
                >
                  {characters.status}
                </span>
              </p>
              <h4 className="mb-2 text-lg text-gray-400">
                specie: {characters.species}
                <br />
                origin: {characters.origin.name}
              </h4>
              <button
                onClick={() => Router.back()}
                className="inline-flex items-center px-3 py-1 mt-4 text-base text-white bg-gray-500 border-0 rounded focus:outline-none hover:bg-gray-600 md:mt-0"
              >
                atras
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export const getServerSideProps = async (context) => {
  try {
    const response = await getCharacters(context.params.id);
    return { props: { data: response } };
  } catch (error) {
    console.log(error);
  }
};
export default Personaje;
