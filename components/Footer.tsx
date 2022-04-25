import Image from "next/image";
import styles from "./footer.module.scss";
import Link from "next/link";

export default function Footer() {
    const handleTop = () => () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div>
            <div className={styles.footer}>
                <div className={styles.links}>
                    <div className={styles.arrowImage}>
                        <Image
                            src={require("../public/img/footer/Arrow.svg")}
                            alt={"arrow"}
                        />
                    </div>
                    <Link href={"https://www.zstu.edu.cn/"}>
                        <a className={styles.link}>学校链接</a>
                    </Link>
                    <Link href={"/"}>
                        <a className={styles.link}>内网接口</a>
                    </Link>
                    <Link href={"/"}>
                        <a className={styles.link}>联系我们</a>
                    </Link>
                </div>
                <div className={styles.info}>
                    <div className={styles.toTop} onClick={handleTop()}>
                        <Image
                            src={require("../public/img/footer/Top.svg")}
                            alt={"arrow"}
                            width={78}
                            height={85}
                        />
                    </div>
                    <div className={styles.logo}>
                        <Image
                            src={require("../public/img/footer/logo.png")}
                            alt={"logo"}
                        />
                    </div>
                    <div className={styles.copyright}>
                        <p className={styles.infomation}>
                            版权所有2019-2022浙江理工大学 Copyright@2019-2022
                        </p>
                        <p className={styles.infomation}>
                            ZHEJIANG SCI-TECH UNI.All Rights Resloved.
                        </p>
                        <p className={styles.infomation}>
                            <a href="https://beian.miit.gov.cn/"> 浙ICP备000000000号</a>
                            ｜技术支持：
                            <a href="https://drafff.art/">ExchangeReaction</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.footerMobile}>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <Image
                            src={require("../public/img/footer/logo.png")}
                            alt={"logo"}
                            width={162}
                            height={77}
                        />
                    </div>
                    <div className={styles.links}>
                        <Link href={"https://www.zstu.edu.cn/"}>
                            <a className={styles.link}>学校链接</a>
                        </Link>
                        <Link href={"/"}>
                            <a className={styles.link}>内网接口</a>
                        </Link>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.copyright}>
                        <p className={styles.infomation}>
                            版权所有2019-2022浙江理工大学 Copyright@2019-2022 ZHEJIANG
                            SCI-TECH UNI.All Rights Resloved.
                            <a href="https://beian.miit.gov.cn/"> 浙ICP备000000000号</a>
                            <br/>
                            Powered by&nbsp;
                            <a href="https://drafff.art/">置换反应&nbsp;ExchangeReaction</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
