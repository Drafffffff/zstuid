import styles from "./Cards.module.scss";
import { FC } from "react";
import MobileCard from "./MobileCard";
import { tidyUrl } from "./utils";
import Card from "./Card";
interface Iprops {
  works: any;
}
interface work {
  title: string;
  cover: {
    url: string;
  };
  author: string;
  url:string;
}
const Cards: FC<Iprops> = ({ works }) => {
  return (
<div>
<div className={styles.mobileCards}>
      {works.map((value: work, index: number) => (
        <Card
          key={index}
          // imageUrl={"/public/img/test.jpg"}
          imageUrl={tidyUrl(value.cover.url)}
          title={value.title}
          author={value.author}
          url={value.url}
        />
      ))}
    </div>
</div>
  );
};

export default Cards;
