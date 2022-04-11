import type { NextPage } from "next";
import Head from "next/head";
// import Image from 'next/image'
import styles from "../styles/Home.module.scss";
import MainLayout from "../components/MainLayout";
import { useRef } from "react";
import { useEffect } from "react";
const Home: NextPage = () => {
  const a = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(a.current?.getBoundingClientRect());
  }, [a]);
  return (
    <MainLayout>
      <div className={styles.aa} ref={a}></div>
    </MainLayout>
  );
};

export default Home;
