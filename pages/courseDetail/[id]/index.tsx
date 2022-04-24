import {
    GetServerSideProps,
    NextPage,
    InferGetServerSidePropsType,
} from "next";
import {useRouter} from "next/router";
import MobileLayout from "../../../components/MobileLayout";
import styles from "../../../styles/coursedetail.module.scss";
import {MainText, Title1, tidyUrl, PageNav, LOCAL_URL} from "../../../components/utils";
import Image from "next/image";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import MobileCards from "../../../components/MobileCards";
import MobileContent from "../../../components/MobileContent";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

interface categray {
    gysjsh: string;
    jcsj: string;
    rjgcx: string;
    yxkzyjh: string;
    sjtx: string;
}

const courses: categray = {
    gysjsh: "工业设计手绘",
    jcsj: "基础设计",
    rjgcx: "人机工程学",
    yxkzyjh: "原型控制与交互",
    sjtx: "设计图学",
};
const url = `http://${LOCAL_URL}:1337`;
const CourseDetail: NextPage = ({
                                    feature,
                                    intro,
                                    imageUrl,
                                    titleImageUrl,
                                    works,
                                    curPage,
                                }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const route = useRouter();
    const [currentPage, SetCurrentPage] = useState(curPage);
    // console.log(curPage);
    const ItemPerPage = 12;
    const totalPagesCount = Math.ceil(works.length / ItemPerPage);
    const [k, setK] = useState<string>("");
    const key = route.query.id as keyof categray;
    useEffect(() => {
        setK(courses[key]);
        SetCurrentPage(currentPage);
        // console.log();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);
    return (
        <div>
            <Head>
                <title>{k}｜浙江理工大学工业设计系</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <MobileLayout>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.bgimage}>
                            <Image
                                src={`${url}${imageUrl}`}
                                alt="carbg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.titleImg}>
                            <Image
                                src={tidyUrl(titleImageUrl)}
                                alt="title"
                                width={390}
                                height={95}
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div
                            style={{
                                marginBottom: 20,
                                marginTop: 30,
                                display: intro.length === 0 ? "none" : "block",
                            }}
                        >
                            <Title1>课程介绍</Title1>
                            <Title1>Course Introduction</Title1>
                        </div>
                        <MobileContent content={intro}/>
                        <div
                            style={{
                                marginBottom: 20,
                                marginTop: 30,
                                display: feature.length === 0 ? "none" : "block",
                            }}
                        >
                            <Title1>课程特点</Title1>
                            <Title1>Course Features</Title1>
                        </div>

                        <MobileContent content={feature}/>

                        <div
                            style={{
                                marginBottom: 20,
                                marginTop: 30,
                                display: works.length === 0 ? "none" : "block",
                            }}
                        >
                            <Title1>课程作品</Title1>
                            <Title1>Course Works</Title1>
                        </div>
                        <MobileCards
                            works={works.slice(
                                (currentPage - 1) * ItemPerPage,
                                currentPage * ItemPerPage
                            )}
                        ></MobileCards>
                        <PageNav
                            totalPages={totalPagesCount}
                            currentPage={currentPage}
                            setPage={SetCurrentPage}
                            pathName={`/courseDetail/${key}`}
                        ></PageNav>
                    </div>
                </div>
            </MobileLayout>
            <Footer/>

        </div>
    );
};

interface courseInfo {
    id: number;
}

interface worksInfo {
    title: string;
    published_at: string;
    discribe: string;
    content: string;
    videourl: string;
    author: string;
    cover: {};
    id: string;
}

interface cd {
    gysjsh: courseInfo;
    jcsj: courseInfo;
    sjtx: courseInfo;
    yxkzyjh: courseInfo;
    rjgcx: courseInfo;
}

const courseid: cd = {
    gysjsh: {id: 1},
    jcsj: {id: 2},
    sjtx: {id: 3},
    yxkzyjh: {id: 4},
    rjgcx: {id: 5},
};
export const getServerSideProps: GetServerSideProps = async context => {
    // Fetch data from external API
    //pre
    //  /course-works?published_at_gt=2022-04-11T20:02:37.280Z&_sort=published_at:ASC&_limit=1
    //next
    // /course-works?published_at_lt=2022-04-12T13:24:09.828Z&_sort=published_at:DESC&_limit=1
    const res = await fetch(`http://localhost:1337/course`);
    const data = await res.json();
    const key = context.params?.id as keyof cd;
    const content = data[key];
    const currentPage = context.query.page || "1";
    const feature = content.feature;
    const intro = content.intro;
    const imageUrl = content.cover.url;
    const titleImageUrl = content.titleImage.url;
    const worksRes = await fetch(
        `http://localhost:1337/course-works?course_category=${courseid[key].id}&_sort=published_at:DESC`
    );
    const workData = await worksRes.json();
    const works = workData.map((e: worksInfo) => ({
        title: e.title,
        published_at: e.published_at,
        discribe: e.discribe,
        content: e.content,
        videourl: e.videourl,
        author: e.author,
        cover: e.cover,
        url: `/courseWorks/${e.id}`,
    }));
    // const totalPages = works.length;
    // console.log(works);
    // Pass data to the page via props
    return {
        props: {
            curPage: currentPage,
            feature: feature,
            intro: intro,
            imageUrl: imageUrl,
            works: works,
            titleImageUrl: titleImageUrl,
            // totalPages:totalPages
        },
    };
};

export default CourseDetail;
