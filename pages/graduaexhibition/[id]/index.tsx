import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Image from "next/image";
import MobileLayout from "../../../components/MobileLayout";
import {BilibiliVideo, LOCAL_URL, MainTexts, Title1} from "../../../components/utils";
import styles from "../../../styles/graduaexhibition.module.scss";
import MobileContent from "../../../components/MobileContent";
import Head from "next/head";
import moment from "moment";
import "moment/locale/zh-cn";
import Like from "../../../components/Likes";
import {useEffect, useState} from "react";
import PreNext from "../../../components/PreNext";
import GraduationP52022 from "../../../components/2022graduationP5";

moment.locale("zh-cn");
// import * as matter from "gray-matter";

const WorkDetail: NextPage = ({
                                  id,
                                  title,
                                  published_at,
                                  discribe,
                                  content,
                                  videourl,
                                  author,
                                  likes,
                                  neighber,
                              }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const pubilshedTime = moment(published_at);
    const [likeTimes, setLikeTimes] = useState(likes);
    useEffect(() => {
        fetch(`http://${LOCAL_URL}:1337/graduation-works/${id}`)
            .then(res => res.json())
            .then(data => {
                setLikeTimes(data.likes | 0);
            });
    }, [id]);

    async function handleLike() {
        setLikeTimes(likeTimes + 1);
        const data = {likes: likeTimes + 1};
        await fetch(`http://${LOCAL_URL}:1337/graduation-works/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
        });
    }

    return (
        <div>
            <Head>
                <title>{title}｜浙江理工大学工业设计系</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <MobileLayout>
                <div className={styles.imgTitle}>
                    <Image
                        src={require("/public/img/graduaexhibition/imageTitle.svg")}
                        alt={"imageTitle"}
                    />
                </div>
                <div className={styles.preamble}>
                    <GraduationP52022  />
                </div>
                <div className={styles.mobileContainer}>
                    <div className={styles.title}>
                        <Title1>{title}</Title1>
                    </div>
                    <div className={styles.info}>
                        <MainTexts>{`发布于 ${pubilshedTime.calendar()}　${author}`}</MainTexts>
                    </div>
                    <article className={styles.content}>
                        <MobileContent content={content}/>
                    </article>

                    <div className={styles.video} style={{display: videourl === null ? "none" : "block"}}>
                        <BilibiliVideo bv={videourl}/>
                    </div>
                    <Like
                        likeTimes={likeTimes}
                        handleLike={() => {
                            handleLike().then(r => null);
                        }}
                    />
                    <PreNext neighbor={neighber} urlPre="/graduaexhibition/"/>
                </div>
            </MobileLayout>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Fetch data from external API
    const matter = require("gray-matter");
    const pageid = context.params?.id;
    const res = await fetch(`http://localhost:1337/graduation-works/${pageid}`);
    const data = await res.json();
    const id = data.id;
    const title = data.title;
    const published_at = data.published_at;
    // const news_category = data.news_category;
    const discribe = data.describe;
    const content = data.content;
    const videourl = data.videoUrl;
    const author = data.author;
    const likes = data.likes;

    const preUrl = `http://localhost:1337/graduation-works?published_at_gt=${published_at}&_sort=published_at:ASC&_limit=1`;
    const nextUrl = `http://localhost:1337/graduation-works?published_at_lt=${published_at}&_sort=published_at:DESC&_limit=1`;
    const preData = await (await fetch(preUrl)).json();
    const nextData = await (await fetch(nextUrl)).json();
    const neighber = {
        next:
            nextData.length === 1
                ? {
                    id: nextData[0].id,
                    title: nextData[0].title,
                    imageUrl: nextData[0].cover.url,
                }
                : null,
        pre:
            preData.length === 1
                ? {
                    id: preData[0].id,
                    title: preData[0].title,
                    imageUrl: preData[0].cover.url,
                }
                : null,
    };

    // .log(neighber);
    return {
        props: {
            id: id,
            title: title,
            published_at: published_at,
            // news_category: news_category,
            discribe: discribe,
            content: matter(content).content,
            videourl: videourl,
            author: author,
            likes: likes,
            neighber: neighber,
        },
    };
};

export default WorkDetail;
