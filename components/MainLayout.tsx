import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import styles from "../styles/MainLayout.module.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface IProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      
      <Navbar></Navbar>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
