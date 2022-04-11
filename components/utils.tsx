import styles from "./utils.module.scss";
import React from "react";
interface IProps {
  children: React.ReactNode;
}
export const MainText: React.FC<IProps> = ({ children }) => {
  return <div className={styles.mainText}>{children}</div>;
};
export const MainTexts: React.FC<IProps> = ({ children }) => {
  return <div className={styles.mainTexts}>{children}</div>;
};
export const Title1: React.FC<IProps> = ({ children }) => {
  return <div className={styles.title1}>{children}</div>;
};
export const Title2: React.FC<IProps> = ({ children }) => {
  return <div className={styles.title2}>{children}</div>;
};
export const Title3: React.FC<IProps> = ({ children }) => {
  return <div className={styles.title3}>{children}</div>;
};
