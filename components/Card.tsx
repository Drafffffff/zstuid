import Image from "next/image";
import Link from "next/link";
import {FC} from "react";
import {MainTexts, Title2, CardTitle, CardTitleW, MainTextsW} from "./utils";
import styles from "./utils.module.scss";

interface Iprops {
    imageUrl: any;
    title: string;
    author: string;
    key: number;
    url: string;
}

const Card: FC<Iprops> = ({imageUrl, title, author, url}) => {
    return (
        <Link href={url}>
            <a className={styles.cardW}>
                <div className={styles.cover}>
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.title}>
                    <CardTitleW>{title}</CardTitleW>
                </div>
                <div className={styles.author}>
                    <MainTextsW>{author}</MainTextsW>
                </div>
                <div className={styles.line}/>
            </a>
        </Link>
    );
};

export default Card;
