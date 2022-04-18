import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import MobileLayout from "../../../components/MobileLayout";
import { MainTexts, Title1 } from "../../../components/utils";
import styles from "../../../styles/works.module.scss";
import MobileContent from "../../../components/MobileContent";
import Head from "next/head";
import moment from "moment";
import "moment/locale/zh-cn";
import Like from "../../../components/Likes";
import { useEffect, useState } from "react";
import PreNext from "../../../components/PreNext";
moment.locale("zh-cn");
// import * as matter from "gray-matter";

const WorkDetail: NextPage = ({
  id,
  title,
  published_at,
  news_category,
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
    fetch(`http://192.168.1.13:1337/news-centers/${id}`)
      .then(res => res.json())
      .then(data => {
        setLikeTimes(data.likes|0);
      });
  }, [id]);
  async function handleLike() {
    setLikeTimes(likeTimes + 1);
    const data = { likes: likeTimes + 1 };
    await fetch(`http://192.168.1.13:1337/news-centers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <div>
      <Head>
        <title>{title}｜浙江理工大学工业设计系</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout>
        <div className={styles.imgTitle}>
          <Image
            src={require("/public/img/news/imageTitle.png")}
            alt={"imageTitle"}
          ></Image>
        </div>
        <div className={styles.mobileContainer}>
          <div className={styles.title}>
            <Title1>{title}</Title1>
          </div>
          <div className={styles.info}>
            <MainTexts>{`发布于 ${pubilshedTime.calendar()}　${author}`}</MainTexts>
          </div>
          <article className={styles.content}>
            <MobileContent content={content} />
          </article>
          <Like
            likeTimes={likeTimes}
            handleLike={() => {
              handleLike();
            }}
          ></Like>
          <PreNext neighbor={neighber} urlPre="/news/"></PreNext>
        </div>
      </MobileLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  // Fetch data from external API
  const matter = require("gray-matter");
  const pageid = context.params?.id;
  const res = await fetch(`http://localhost:1337/news-centers/${pageid}`);
  const data = await res.json();
  const id = data.id;
  const title = data.title;
  const published_at = data.published_at;
  const news_category = data.news_category;
  const discribe = data.discribe;
  const content = data.content;
  const videourl = data.videourl;
  const author = data.author;
  const likes = data.likes;
  //pre
  //  /course-works?published_at_gt=2022-04-11T20:02:37.280Z&_sort=published_at:ASC&_limit=1
  //next
  // /course-works?published_at_lt=2022-04-12T13:24:09.828Z&_sort=published_at:DESC&_limit=1

  const preUrl = `http://localhost:1337/news-centers?published_at_gt=${published_at}&_sort=published_at:ASC&_limit=1`;
  const nextUrl = `http://localhost:1337/news-centers?published_at_lt=${published_at}&_sort=published_at:DESC&_limit=1`;
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
      news_category: news_category,
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
