"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();

  // Suponiendo que el transactionId se almacena en localStorage
  const transactionId = typeof window !== "undefined" ? localStorage.getItem("transaction_id") : null;

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/verify" ? styles.active : ""
        }`}
        href="/verify"
      >
        Verify
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/quotes" ? styles.active : ""
        }`}
        href="/quotes"
      >
        Quotes
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/checkout" ? styles.active : ""
        }`}
        href="/checkout"
      >
        Checkout
      </Link>
      {transactionId && (
        <Link
          className={`${styles.link} ${
            pathname === "/summary" ? styles.active : ""
          }`}
          href={`/summary?transactionId=${transactionId}`}
        >
          Summary
        </Link>
      )}
    </nav>
  );
};
