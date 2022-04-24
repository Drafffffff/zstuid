import {NextPage, NextPageContext} from "next";
import Head from "next/head";
import React, {ReactNode} from "react";
import styles from "../styles/MainLayout.module.scss";

interface IProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({children}) => {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

        </>
    );
};

export default MainLayout;
