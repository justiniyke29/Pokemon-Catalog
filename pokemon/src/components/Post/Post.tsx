import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { POKEMONS_QUERY } from "../utils/hooks/useAllPokemonsQuery";
import Pagination from "@/components/Pagination";
import styles from "./Post.module.scss";
import Link from "next/link";

interface Iprop {
  id: React.Key;
  image: string | undefined;
  name: string;
  types: [];
  number: number;
}
interface Iprops {
  items: number;
}

const Post = ({ items }: Iprops) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);
  const { loading, error, data } = useQuery(POKEMONS_QUERY, {
    variables: { first: items },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { pokemons } = data;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = pokemons.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.post}>
        {currentPosts.map((pokemon: Iprop) => (
          <li key={pokemon.id}>
            <Link href={`/Pokemon/${pokemon.name}` || `/Pokemon/${pokemon.id}`}>
              <div className={styles.card}>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={styles.image}
                />
                <p className="text-[#999696] text-sm md:text-lg">
                  {pokemon.number}
                </p>
                <p className="text-xl font-bold text-start">{pokemon.name}</p>
                <div className="grid grid-cols-2 gap-2 max-w-[200px] md:max-w-full">
                  {pokemon.types.map(
                    (type, index: React.Key | null | undefined) => (
                      <p
                        key={index}
                        className={`text-gray-800 text-center dark:text-white rounded-md py-1 p-2 overflow-clip ${
                          type === "Fire"
                            ? "bg-red-500"
                            : type === "Flying"
                            ? "bg-blue-300"
                            : type === "Grass"
                            ? "bg-green-600"
                            : type === "Ground"
                            ? "bg-[#8b7355]"
                            : type === "Poison"
                            ? "bg-black"
                            : type === "Fairy"
                            ? "bg-amber-700"
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
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        totalPosts={pokemons.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Post;
