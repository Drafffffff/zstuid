import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MainTexts, Title2, CardTitle } from "./utils";
import styles from "./utils.module.scss";
interface Iprops {
  imageUrl: any;
  title: string;
  author: string;
  key: number;
  url:string;
}
const MobileCard: FC<Iprops> = ({ imageUrl, title, author, key ,url}) => {
  return (
    <Link href={url} key={key}>
      <a className={styles.card}>
        <div className={styles.cover}>
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className={styles.title}>
          <CardTitle>{title}</CardTitle>
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
