// Copyright (c) 2022 drafff
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import styles from "./MobileCards.module.scss";
import { FC } from "react";
import MobileCard from "./MobileCard";
import { tidyUrl } from "./utils";
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
const MobileCards: FC<Iprops> = ({ works }) => {
  return (
<div>
<div className={styles.mobileCards}>
      {works.map((value: work, index: number) => (
        <MobileCard
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

export default MobileCards;
