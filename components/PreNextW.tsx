import styles from "./PreNextW.module.scss";
import {FC} from "react";
import Image from "next/image";
import {MainTexts, tidyUrl, Title2} from "./utils";
import Link from "next/link";

interface neightorItem {
    title: string;
    id: string;
    imageUrl: string;
}

interface Iprops {
    neighbor: {
        pre: neightorItem;
        next: neightorItem;
    };
    urlPre: string;
}

const NoPre: FC<Iprops> = ({neighbor, urlPre}) => {
    if (neighbor.pre === null) {
        return <div className={styles.noPre}>没有上一篇</div>;
    } else {
        return (
            <Link href={`${urlPre}${neighbor.pre.id}`}>
                <a className={styles.pre}>
                    <div className={styles.img}>
                        <Image
                            src={tidyUrl(neighbor.pre.imageUrl)}
                            alt={neighbor.pre.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className={styles.text}>
                        <MainTexts>上一篇</MainTexts>
                    </div>
                    <div className={styles.title}>
                        <Title2>{neighbor.pre.title}</Title2>
                    </div>
                    <div className={styles.line}/>
                </a>
            </Link>
        );
    }
};

const NoNext: FC<Iprops> = ({neighbor, urlPre}) => {
    if (neighbor.next === null) {
        return <div className={styles.noNext}>没有下一篇</div>;
    } else {
        return (
            <Link href={`${urlPre}${neighbor.next.id}`}>
                <a className={styles.next}>
                    <div className={styles.img}>
                        <Image
                            src={tidyUrl(neighbor.next.imageUrl)}
                            alt={neighbor.next.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.text}>
                        <MainTexts> 下一篇</MainTexts>
                    </div>
                    <div className={styles.title}>
                        <Title2>{neighbor.next.title}</Title2>
                    </div>
                    <div className={styles.line}/>
                </a>
            </Link>
        );
    }
};

const PreNext: FC<Iprops> = ({neighbor, urlPre}) => {
    return (
        <div className={styles.preNext}>
            <NoPre neighbor={neighbor} urlPre={urlPre}/>
            <NoNext neighbor={neighbor} urlPre={urlPre}/>
        </div>
    );
};

export default PreNext;
