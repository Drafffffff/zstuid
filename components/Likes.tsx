import styles from "./likes.module.scss";
import Image from "next/image";
import {FC} from "react";
import {MainTexts} from "./utils";
import * as mqtt from "mqtt"

interface Iprops {
    likeTimes: number;
    handleLike: () => void;
}

const Like: FC<Iprops> = ({likeTimes, handleLike, ...props}) => {
    const options = {
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // Auth
        clientId: 'emqx_test',
        username: 'admin',
        password: 'public',
    }
    const client = mqtt.connect('mqtt://zstu-interaction.art:1883', options)

    function handleMqtt() {
        const data = {total: likeTimes + 1}
        client.publish('like', JSON.stringify(data))
    }

    return (
        <div className={styles.likeContainer}>
            <div className={styles.share}>
                <div className={styles.shareIcon}>
                    <Image
                        src={require("/public/img/works/share.svg")}
                        alt="shareicon"
                        width={20}
                        height={20}
                    />
                </div>
                <div className={styles.shareText}>
                    <MainTexts>分享</MainTexts>
                </div>
            </div>
            <div
                className={styles.like}
                onClick={() => {
                    handleLike();
                    handleMqtt();
                }}
            >
                <div className={styles.likeIcon}>
                    <Image
                        src={require("/public/img/works/like.svg")}
                        alt="likeicon"
                        width={25}
                        height={25}
                    />
                </div>
                <div className={styles.likeTimes}>
                    <MainTexts>{likeTimes}</MainTexts>
                </div>
            </div>
        </div>
    );
};

export default Like;
