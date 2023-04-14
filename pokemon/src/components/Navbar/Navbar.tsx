import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className="flex items-center">
          <img
            src="https://seeklogo.com/images/U/ultraball-pokemon-logo-35E5B2B3B5-seeklogo.com.png"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className={styles.logo}>Pokemon</span>
        </Link>
        <button
          type="button"
          className={styles.button}
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            const menu = document.getElementById("navbar-default");
            if (menu) menu.classList.toggle("hidden");
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className={styles.list}>
            <li>
              <a href="#" className={styles.link_default} aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ikechukwu-anyanwu-42040a242/"
                className={styles.link}
                target="_blank"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="http://justiniyke.vercel.app"
                className={styles.link}
                target="_blank"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
