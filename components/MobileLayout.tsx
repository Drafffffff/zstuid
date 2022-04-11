import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import styles from "../styles/MainLayout.module.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
interface IProps {
  children: React.ReactNode;
}
const MobileLayout: React.FC<IProps> = ({ children }) => {

  return (
    <>
      
      <Navbar></Navbar>
      <main className={styles.main}>
        <div className={styles.mobileContainer}>{children}</div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default MobileLayout;
