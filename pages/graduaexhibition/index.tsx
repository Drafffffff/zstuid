import type {NextPage} from "next";
import Head from "next/head";
import styles from "../../styles/graduaexhibition.module.scss";
import MainLayout from "../../components/MainLayout";
import Image from "next/image";
import MobileLayout from "../../components/MobileLayout";
import {MainText, PageNav, Titleswe} from "../../components/utils";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useState} from "react";
import MobileCards from "../../components/MobileCards";
import GraduationP52022 from "../../components/2022graduationP5";

const Index: NextPage = ({
                             works,
                         }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [currentPage, SetCurrentPage] = useState(1);
    const ItemPerPage = 12;
    const totalPagesCount = Math.ceil(works.length / ItemPerPage);
    return (
        <div>
            <Head>
                <title>毕业展｜浙江理工大学工业设计系</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <MobileLayout>
                <div className={styles.imageTitle}>
                    <Image
                        src={require("/public/img/graduaexhibition/imageTitle.svg")}
                        alt="imageTitle"
                        height={100}
                        width={386}
                    />
                </div>
                <div className={styles.preamble}>
                    {/*<Image*/}
                    {/*    src={require("/public/img/graduaexhibition/mainImg.png")}*/}
                    {/*    alt="imageTitle"*/}
                    {/*    layout="fill"*/}
                    {/*    objectFit="cover"*/}
                    {/*/>*/}
                    <GraduationP52022/>
                </div>
                <div className={styles.preambleTitle}>
                    <Titleswe zh="序言" en="Preamble"/>
                </div>
                <div className={styles.graWorksTitle}>
                    <MainText>
                        全球疫情影响全球各项展览活动基本停摆，人群密集的展会、博物馆、美术馆等受到不同程度的冲击。基于网络
                        空间增设或者重构展品数据信息，抑或强化互联渠道，透过丰富的交互媒介形态，为展品资源拓宽层次丰富、不
                        受时空限制的虚拟线上观看体验。
                        随着云计算技术高度发展，云平台作为一种新型信息技术环境，其具备了多元化的展现形式、即时的互动沟通性
                        能、开放的信息资源共享等特点，成为用户获取信息资源、建立人际关系、获得情感归属、体现自我价值的重要
                        平台。虚拟展馆就是利用计算机图形学的技术构建的数字化展览馆，是一种三维互动体验方式，以传统展馆为基
                        础，利用虚拟技术将展馆及其陈列品移植到互联网上进行展示、宣传与教育活动，突破了传统意义上的时间与空
                        间的局限。
                    </MainText>
                </div>
                <div className={styles.graWorkTitle}>
                    <Titleswe zh="毕业作品" en="Graduation Works"/>
                </div>
                <div className={styles.graWork}>
                    <MobileCards
                        works={works.slice(
                            (currentPage - 1) * ItemPerPage,
                            currentPage * ItemPerPage
                        )}
                    />
                    <PageNav
                        totalPages={totalPagesCount}
                        currentPage={currentPage}
                        setPage={SetCurrentPage}
                        pathName={`/news/tongzhi`}
                    />
                </div>
            </MobileLayout>
        </div>
    );
};
export const getServerSideProps: GetServerSideProps = async context => {
    const res = await fetch(`http://127.0.0.1:1337/graduation-works`);
    const data = await res.json();
    // console.log(data);
    const works = data.map((a: any) => ({
        title: a.title,
        published_at: a.published_at,
        author: a.author,
        cover: a.cover,
        url: `/graduaexhibition/${a.id}`,
    }));
    console.log(works)
    return {
        props: {
            works: works,
        },
    };
};
export default Index;
