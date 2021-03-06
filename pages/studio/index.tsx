import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/studios.module.scss";
import MainLayout from "../../components/MainLayout";
import MobileLayout from "../../components/MobileLayout";
import {MainText, MainTextW, Title1W, Titleswe} from "../../components/utils";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import React, {useEffect, useRef, useState} from "react";
import Footer from "../../components/Footer";
import gsap from "gsap";

interface categray {
    fwsjyshcx: string;
    kcxsj: string;
    qdyjs: string;
    szwc: string;
    jjsj: string;
}

const courses: categray = {
    fwsjyshcx: "工业设计手绘",
    kcxsj: "基础设计",
    qdyjs: "人机工程学",
    szwc: "原型控制与交互",
    jjsj: "设计图学",
};
const Studio: NextPage = () => {
    const titleSquare = useRef(null)
    useEffect(() => {
        gsap.to(titleSquare.current, {
            width: "90%",
            duration: 3
        })
    }, [])
    const [linkHover, setLinkHover] = useState(0)


    const handleMouseOver = (i: number) => {
        setLinkHover(i)
    }
    const handleMouseLeave = () => {
        setLinkHover(0)
    }
    return (
        <div>
            <Head>
                <title>团队建设｜浙江理工大学工业设计系</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>

            <MobileLayout>
                <div className={styles.titleImage}>
                    <Image
                        src={require("/public/img/studio/titleImage.png")}
                        alt="imageTitle"
                        height={95}
                        width={391}
                    />
                </div>
                <div className={styles.categories}>
                    <div className={styles.fwsjyshcx}>
                        <Link href="/studio/fwsjyshcx">
                            <a>
                                <Image
                                    src={require("/public/img/studio/category/fwsjyshcx.png")}
                                    alt="fwsjyshcx"
                                    height={120}
                                    width={120}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.szwc}>
                        <Link href="/studio/szwc">
                            <a>
                                <Image
                                    src={require("/public/img/studio/category/szwc.png")}
                                    alt="szwc"
                                    height={120}
                                    width={120}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.kcxsj}>
                        <Link href="/studio/kcxsj">
                            <a>
                                <Image
                                    src={require("/public/img/studio/category/kcxsj.png")}
                                    alt="kcxsj"
                                    height={120}
                                    width={120}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.jjsj}>
                        <Link href="/studio/jjsj">
                            <a>
                                <Image
                                    src={require("/public/img/studio/category/jjsj.png")}
                                    alt="jjsj"
                                    height={120}
                                    width={120}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.qdyjs}>
                        <Link href="/studio/qdyjs">
                            <a>
                                <Image
                                    src={require("/public/img/studio/category/qdyjs.png")}
                                    alt="qdyjs"
                                    height={120}
                                    width={120}
                                />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.overviewTitles}>
                    <Titleswe zh="工作室概览" en="Studio Overview"/>
                </div>
                <div className={styles.overview}>
                    <MainText>
                        团队目前有专职教师29名，其中教授4名、副教授9名，博士18名（含在读），有海外留学访学经历的11人。享受国务院特殊津贴专家1名，浙江省151人才1名，浙江省学科带头人1名，浙江省优秀教师1名，浙江省教坛新秀1名，校教坛新秀5名，校三育人先进个人6名，校“521计划”拔尖人才1名、骨干人才4名，金富春教学奖2名，五四青年奖章2名，华鼎奖教金3名，双高双强教师3名，由家具行业协会认定的首批全国家具十佳设计师1名，以及浙江省十佳工业设计推进者2名。
                    </MainText>
                </div>
                <div className={styles.resultsTitle}>
                    <Titleswe zh="现有成果" en="On-going results"/>
                </div>
                <div className={styles.results}/>
            </MobileLayout>
            <MainLayout>
                <div className={styles.navW}>
                    <div className={styles.title}>
                        <div className={styles.left}>
                            <Image src={require("/public/img/studio/STU.png")} alt={"titleL"}/>
                        </div>
                        <div className={styles.mid}>
                            <div className={styles.square} ref={titleSquare}/>
                        </div>
                        <div className={styles.right}>
                            <Image src={require("/public/img/studio/DIO.png")} alt={"titleR"}/>
                        </div>
                    </div>
                    <div className={styles.select}>
                        <Link href={"/studio/fwsjyshcx"}>
                            <a className={`${styles.choice} ${styles.gongyesheji}`}
                               onMouseOver={() => {
                                   handleMouseOver(1)
                               }}
                               onMouseLeave={() => {
                                   handleMouseLeave()
                               }}>
                                <Image
                                    src={require("/public/img/studio/categoryW/fwsjyshcx.svg")}
                                    alt="工业设计手绘"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                />
                                <Image
                                    src={require("/public/img/studio/categoryW/fwsjyshcxH.svg")}
                                    alt="工业设计手绘"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    style={{visibility: linkHover === 1 ? "visible" : "hidden"}}
                                />
                            </a>
                        </Link>
                        <Link href={"/studio/szwc"}>
                            <a className={`${styles.choice} ${styles.jichusheji}`}
                               onMouseOver={() => {
                                   handleMouseOver(2)
                               }}
                               onMouseLeave={() => {
                                   handleMouseLeave()
                               }}>
                                <Image
                                    src={require("/public/img/studio/categoryW/szwc.svg")}
                                    alt="基础设计"
                                    layout={"fill"}
                                    objectFit={"contain"}

                                />
                                <Image
                                    src={require("/public/img/studio/categoryW/szwcH.svg")}
                                    alt="基础设计"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    style={{visibility: linkHover === 2 ? "visible" : "hidden"}}
                                />
                            </a>
                        </Link>
                        <Link href={"/studio/kcxsj"}>
                            <a className={`${styles.choice} ${styles.shejituxue}`}
                               onMouseOver={() => {
                                   handleMouseOver(3)
                               }}
                               onMouseLeave={() => {
                                   handleMouseLeave()
                               }}>
                                <Image
                                    src={require("/public/img/studio/categoryW/kcxsj.svg")}
                                    alt="设计图学"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                />
                                <Image
                                    src={require("/public/img/studio/categoryW/kcxsjH.svg")}
                                    alt="设计图学"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    style={{visibility: linkHover === 3 ? "visible" : "hidden"}}
                                />
                            </a>
                        </Link>
                        <Link href={"/studio/jjsj"}>
                            <a className={`${styles.choice} ${styles.yuanxinkongzhi}`}
                               onMouseOver={() => {
                                   handleMouseOver(4)
                               }}
                               onMouseLeave={() => {
                                   handleMouseLeave()
                               }}>
                                <Image
                                    src={require("/public/img/studio/categoryW/jjsj.svg")}
                                    alt="原型控制与交互"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                />
                                <Image
                                    src={require("/public/img/studio/categoryW/jjsjH.svg")}
                                    alt="原型控制与交互"
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    style={{visibility: linkHover === 4 ? "visible" : "hidden"}}
                                />
                            </a>
                        </Link>
                        <Link href={"/studio/qdyjs"}>
                            <a className={`${styles.choice} ${styles.renjigongcheng}`}
                               onMouseOver={() => {
                                   handleMouseOver(5)
                               }}
                               onMouseLeave={() => {
                                   handleMouseLeave()
                               }}>
                                <Image
                                    src={require("/public/img/studio/categoryW/qdyjs.svg")}
                                    alt="人机工程学"
                                    layout={"fill"}
                                    objectFit={"fill"}
                                />
                                <Image
                                    src={require("/public/img/studio/categoryW/qdyjsH.svg")}
                                    alt="人机工程学"
                                    layout={"fill"}
                                    objectFit={"fill"}
                                    style={{visibility: linkHover === 5 ? "visible" : "hidden"}}
                                />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.contentW}>
                    <div className={styles.titles}>
                        <Title1W>工作室概览</Title1W>
                        <Title1W>Studio Overview</Title1W>
                    </div>
                    <MainTextW>
                        团队目前有专职教师29名，其中教授4名、副教授9名，博士18名（含在读），有海外留学访学经历的11人。享受国务院特殊津贴专家1名，浙江省151人才1名，浙江省学科带头人1名，浙江省优秀教师1名，浙江省教坛新秀1名，校教坛新秀5名，校三育人先进个人6名，校“521计划”拔尖人才1名、骨干人才4名，金富春教学奖2名，五四青年奖章2名，华鼎奖教金3名，双高双强教师3名，由家具行业协会认定的首批全国家具十佳设计师1名，以及浙江省十佳工业设计推进者2名。
                    </MainTextW>
                    <div className={styles.overViewImg}>
                        <img src={require("/public/img/studio/content/overview.png").default.src} alt={`overview`}/>
                    </div>

                    <div className={styles.resultTW}>
                        <Title1W>现有成果</Title1W>
                        <Title1W>On-going Results</Title1W>

                        <div className={styles.resultTitleW}>
                            <div className={styles.resultTitleZHW}>人才培养</div>
                            <div className={styles.resultTitleENW}>Talent Training</div>
                        </div>

                        <div className={styles.resultTitleW}>
                            <div className={styles.resultTitleZHW}>科学研究与社会服务</div>
                            <div className={styles.resultTitleENW}>Scientific research and social service</div>
                        </div>
                        <div className={styles.resultTitleW}>
                            <div className={styles.resultTitleZHW}>合作与交流</div>
                            <div className={styles.resultTitleENW}>Cooperation and communication</div>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <Footer/>

        </div>
    );
};

export default Studio;

