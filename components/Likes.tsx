import styles from "./likes.module.scss";
import Image from "next/image";
import { FC } from "react";
import { MainTexts } from "./utils";
interface Iprops {
  likeTimes: number;
  handleLike: () => void;
}
const Like: FC<Iprops> = ({ likeTimes, handleLike, ...props }) => {
  return (
    <div className={styles.likeContainer}>
      <div className={styles.share}>
        <div className={styles.shareIcon}>
          <Image
            src={require("/public/img/works/share.svg")}
            alt="shareicon"
            width={20}
            height={20}
          ></Image>
        </div>
        <div className={styles.shareText}>
          <MainTexts>分享</MainTexts>
        </div>
      </div>
      <div
        className={styles.like}
        onClick={() => {
          handleLike();
        }}
      >
        <div className={styles.likeIcon}>
          <Image
            src={require("/public/img/works/like.svg")}
            alt="likeicon"
            width={25}
            height={25}
          ></Image>
        </div>
        <div className={styles.likeTimes}>
          <MainTexts>{likeTimes}</MainTexts>
        </div>
      </div>
    </div>
  );
};

export default Like;
