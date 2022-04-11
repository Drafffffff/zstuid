import type { NextPage } from "next";
import Head from "next/head";
// import Image from 'next/image'
import styles from "../styles/Home.module.scss";
import MainLayout from "../components/MainLayout";
const Studio: NextPage = () => {
  return (
    <MainLayout>
      <div className={styles.test}></div>
    </MainLayout>
  );
};

export default Studio;
