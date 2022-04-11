import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MainTexts, Title2 } from "./utils";
import styles from "./utils.module.scss";
interface Iprops {
  imageUrl: any;
  title: string;
  author: string;
}
const MobileCard: FC<Iprops> = ({ imageUrl, title, author }) => {
  return (
    <Link href={"/"}>
      <a className={styles.card}>
        <div className={styles.cover}>
          <Image
            src={imageUrl}
            alt={title}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className={styles.title}>
          <Title2>{title}</Title2>
        </div>
        <div className={styles.author}>
          <MainTexts>{author}</MainTexts>
        </div>
        <div className={styles.line}></div>
      </a>
    </Link>
  );
};

export default MobileCard;
