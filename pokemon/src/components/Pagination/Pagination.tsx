import React from "react";
import styles from "./Pagination.module.scss";

interface Iprop {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (active: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Iprop) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  console.log(currentPage);
  return (
    <div className={styles.pagination}>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            <p
              className={
                page === currentPage
                  ? "bg-black dark:bg-white border-[#101010] text-[#fefefe] text-bold dark:text-[#101010]"
                  : ""
              }
            >
              {page}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
