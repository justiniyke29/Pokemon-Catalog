import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_SINGLE_POKEMON } from "@/components/utils/hooks/useSinglePokemonQuery";
import { GET_POKEMON_EVOLUTION } from "@/components/utils/hooks/usePokemonEvolutionQuery";
import { useRouter } from "next/router";

interface Iprop {
  id: React.Key;
  image: string | undefined;
  height: any;
  weight: any;
  resistant: [];
  weaknesses: [];
  classification: string;
  name: string;
  types: [];
}
interface IPokemon {
  evolutions: [];
}
const Pokemon = () => {
  const [showData, setShowData] = useState(false);
  const [info, setInfo] = useState<IPokemon | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [
    fetchDetails,
    { loading: isLoading, error: isError, data: detailsData },
  ] = useLazyQuery(GET_POKEMON_EVOLUTION);

  const fetchData = (name: any) => {
    fetchDetails({
      variables: { name },
    });
    setShowData(true);
  };
  useEffect(() => {
    if (detailsData && showData) {
      setInfo(detailsData.pokemon);
    }
  }, [detailsData, fetchData]);

  const { loading, error, data } = useQuery(GET_SINGLE_POKEMON, {
    variables: { name: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const pokemon: Iprop = data.pokemon;

  console.log(info);

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-4 px-3">
      <div onClick={() => router.back()} className="cursor-pointer absolute">
        <button className="ml-1 bg-white hover:bg-gray-300 text-gray-800 font-semibold  mb-3 px-3 border border-gray-400 rounded shadow">
          Go Back
        </button>
      </div>
      <div className="items-center  text-center w-full">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
          {pokemon.name}
        </h2>
        <div className="flex flex-wrap  md:flex-nowrap gap-5">
          <img src={pokemon.image} alt={pokemon.name} className="rounded-md" />
          <div>
            <div className="bg-[#91b1c9] w-full h-[200px] justify-between items-start text-start px-3 flex gap-4 mt-5 pt-4 rounded-lg">
              <div className="">
                <h1 className="text-2xl text-white">Height</h1>
                <p className="text-sm md:text-lg">
                  Maximum:
                  <span className="font-bold"> {pokemon.height.maximum}</span>
                </p>
                <p className="text-sm md:text-lg">
                  Minimum:
                  <span className="font-bold"> {pokemon.height.minimum}</span>
                </p>
              </div>
              <div className="">
                <h1 className="text-2xl text-white">Weight</h1>
                <p className="text-sm md:text-lg">
                  Maximum:
                  <span className="font-bold"> {pokemon.weight.maximum}</span>
                </p>
                <p className="text-sm md:text-lg">
                  Minimum:
                  <span className="font-bold"> {pokemon.weight.minimum}</span>
                </p>
              </div>
              <div>
                <h1 className="text-2xl text-white"> Classification </h1>
                <p className="text-sm md:text-lg">{pokemon.classification}</p>
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl py-3 font-bold">Types</h1>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.types.map(
                  (type: string, index: React.Key | null | undefined) => (
                    <p
                      key={index}
                      className={`text-gray-800 text-center dark:text-white rounded-md py-1 p-2 overflow-clip ${
                        type === "Fire"
                          ? "bg-red-500"
                          : type === "Flying"
                          ? "bg-blue-300"
                          : type === "Ground"
                          ? "bg-[#8b7355]"
                          : type === "Grass"
                          ? "bg-green-600"
                          : type === "Fairy"
                          ? "bg-amber-700"
                          : type === "Poison"
                          ? "bg-black"
                          : type === "Water"
                          ? "bg-blue-500"
                          : "bg-slate-400"
                      }`}
                    >
                      {type}
                    </p>
                  )
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl py-3 font-bold">
                Resistance
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.resistant.map(
                  (type: string, index: React.Key | null | undefined) => (
                    <p
                      key={index}
                      className={`text-gray-800 text-center rounded-md dark:text-white py-1 p-2 overflow-clip ${
                        type === "Fire"
                          ? "bg-red-500"
                          : type === "Water"
                          ? "bg-blue-500"
                          : type === "Grass"
                          ? "bg-green-600"
                          : type === "Electric"
                          ? "bg-[#9fc5e8]"
                          : type === "Fighting"
                          ? "bg-red-800"
                          : type === "Bug"
                          ? "bg-blue-400"
                          : "bg-slate-800"
                      }`}
                    >
                      {type}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 max-w-[400px] md:max-w-full">
          <h1 className="text-2xl lg:text-3xl py-3 font-bold">Weaknesses</h1>
          <div className="grid grid-cols-2 gap-4">
            {pokemon.weaknesses.map(
              (type: string, index: React.Key | null | undefined) => (
                <p
                  key={index}
                  className={`text-gray-800 text-center rounded-md dark:text-white py-1 p-2 overflow-clip ${
                    type === "Fire"
                      ? "bg-red-500"
                      : type === "Water"
                      ? "bg-blue-500"
                      : type === "Ground"
                      ? "bg-[#8b7355]"
                      : type === "Grass"
                      ? "bg-green-600"
                      : type === "Electric"
                      ? "bg-[#9fc5e8]"
                      : type === "Fighting"
                      ? "bg-red-800"
                      : type === "Bug"
                      ? "bg-blue-400"
                      : "bg-slate-800"
                  }`}
                >
                  {type}
                </p>
              )
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => fetchData(id)}
            className="ml-1 bg-white hover:bg-gray-300 text-gray-800 font-semibold 
           mb-3 px-3 border border-gray-400 rounded shadow"
          >
            View Evolution
          </button>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error :(</p>}
          <div className="grid md:grid-cols-2 ">
            {showData &&
              info &&
              info.evolutions?.map((evolution: Iprop) =>
                evolution === null ? (
                  <p>No Evolution Data</p>
                ) : (
                  <div key={evolution.id} className="px-4 py-6">
                    <img
                      src={evolution.image}
                      alt={evolution.name}
                      className="rounded-xl md:w-full md:h-full"
                    />
                    <p className="bg-red-500 text-white font-bold text-xl">
                      {evolution.name}
                    </p>
                    {evolution.types.map(
                      (type: string, index: React.Key | null | undefined) => (
                        <p
                          key={index}
                          className={`text-gray-800 text-center rounded-md dark:text-white py-2 mt-3 p-2 overflow-clip ${
                            type === "Fire"
                              ? "bg-red-500"
                              : type === "Water"
                              ? "bg-blue-500"
                              : type === "Grass"
                              ? "bg-green-600"
                              : type === "Electric"
                              ? "bg-[#9fc5e8]"
                              : type === "Fighting"
                              ? "bg-red-800"
                              : type === "Bug"
                              ? "bg-blue-400"
                              : "bg-slate-800"
                          }`}
                        >
                          {type}
                        </p>
                      )
                    )}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
