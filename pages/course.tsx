import type { NextPage } from "next";
import styles from "../styles/course.module.scss";
import MainLayout from "../components/MainLayout";
import Image from "next/image";
import { MainText, Title1 } from "../components/utils";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  MouseEvent,
} from "react";
import courseData from "./data/course.json";
import { gsap } from "gsap";
import MobileLayout from "../components/MobileLayout";
interface courseList {
  gysjsh: {};
  jcsj: {};
  sjtx: {};
  yxkzyjh: {};
  rjgcx: {};
}
interface chioceEveT extends EventTarget {
  parentNode: HTMLElement;
}
interface choiceMouseEvent extends MouseEvent<HTMLElement> {
  target: chioceEveT;
}
const Course: NextPage = () => {
  const [detailState, setDetailState] = useState(false);
  const [intro, setIntro] = useState("");
  const [features, setFeatures] = useState("");
  const [isDetailShow, setIsDetailShow] = useState(true);
  const [gh, setGh] = useState(0);
  const [dh, setDh] = useState(0);

  const generalIntro = useRef<HTMLDivElement>(null);
  const detailInfo = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline();
  // const generalIntro = useRef<HTMLDivElement>(null);

  const handleCourseSelected = (
    e: choiceMouseEvent,
    course: keyof courseList
  ) => {
    function isLeft(): boolean {
      const pos = courseData[course].pos;
      if (pos[0] === 0) {
        return false;
      } else {
        return true;
      }
    }
    setDh(detailInfo.current?.getBoundingClientRect().height as number);
    // console.log("ev", e);
    setIsDetailShow(!isDetailShow);
    setDetailState(!detailState);
    setIntro(courseData[course].intro);
    setFeatures(courseData[course].feature);
    if (!detailState) {
      tl.to(e.target.parentNode.parentNode, { top: 46, left: 142, duration: 1 })
        .to(generalIntro.current, { height: 0, duration: 2 }, "-=1")
        .to(generalIntro.current, { opacity: 0 }, "-=2");
    } else {
      tl.to(
        e.target.parentNode.parentNode,
        isLeft()
          ? {
              top: courseData[course].pos[1],
              left: courseData[course].pos[0],
              right:"auto",
              duration: 1,
            }
          : {
              top: courseData[course].pos[1],
              right: courseData[course].pos[2],
              left: "auto",
              duration: 1,
            }
      )
        .to(generalIntro.current, { height: gh, duration: 1 }, "-=1")
        .to(generalIntro.current, { opacity: 1 }, "-=1");
    }
  };

  useEffect(() => {
    console.log(dh);
    setDh(detailInfo.current?.getBoundingClientRect().height as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, features]);

  useEffect(() => {
    setGh(generalIntro.current?.getBoundingClientRect().height as number);
    setDh(detailInfo.current?.getBoundingClientRect().height as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);
  return (
    <div>
      <MobileLayout>
        <div className={styles.nav}>
          <div className={styles.title}>
            <Image
              src={require("../public/img/course/title.svg")}
              alt="title"
            ></Image>
          </div>
          <div className={styles.select}>
            <div
              className={`${styles.choice} ${styles.gongyesheji}`}
              onClick={(e: MouseEvent<HTMLElement>) => {
                handleCourseSelected(e, "gysjsh");
              }}
            >
      
              <Image
                src={require("../public/img/course/select/gongyesheji.svg")}
                alt="工业设计手绘"
              ></Image>
            </div>
            <div
              className={`${styles.choice} ${styles.jichusheji}`}
              onClick={(e: MouseEvent<HTMLElement>) => {
                handleCourseSelected(e, "jcsj");
              }}
            >
              <Image
                src={require("../public/img/course/select/jichusheji.svg")}
                alt="基础设计"
              ></Image>
            </div>
            <div
              className={`${styles.choice} ${styles.shejituxue}`}
              onClick={(e: MouseEvent<HTMLElement>) => {
                handleCourseSelected(e, "sjtx");
              }}
            >
              <Image
                src={require("../public/img/course/select/shejituxue.svg")}
                alt="设计图学"
              ></Image>
            </div>
            <div
              className={`${styles.choice} ${styles.yuanxinkongzhi}`}
              onClick={(e: MouseEvent<HTMLElement>) => {
                handleCourseSelected(e, "yxkzyjh");
              }}
            >
              <Image
                src={require("../public/img/course/select/yuanxingkongzhi.svg")}
                alt="原型控制与交互"
              ></Image>
            </div>
            <div
              className={`${styles.choice} ${styles.renjigongcheng}`}
              onClick={(e: MouseEvent<HTMLElement>) => {
                handleCourseSelected(e, "rjgcx");
              }}
            >
              <Image
                src={require("../public/img/course/select/renji.svg")}
                alt="人机工程学"
              ></Image>
            </div>
          </div>
        </div>
        <div className={styles.content} ref={generalIntro}>
          <div className={styles.titles}>
            <Title1>课程总述</Title1>
            <Title1>Course Introduction</Title1>
          </div>
          <MainText>
            专业目前有国家精品资源共享课、国家视频公开课各1门，国家级工程实践教育中心1个，浙江省精品在线开放课程2门，19门数字教学课件获全国、省级奖项，教材10余本，以及《设计图学》、《工业设计手绘》等另10门在线开放课程在建培育。近几年教学成果“艺术设计类课程E-CO数字化生态环境构建及其学习模式改革”、“行业特色地方高校本科拔尖人才培养的探索与实践”均获国家教学成果奖二等奖，另有浙江省教学成果奖4项，中国纺织工业联合会教学成果奖6项，浙江省高校“互联网+教学”优秀案例一等奖1项。
          </MainText>
        </div>
        <div
          className={styles.courseDetail}
          ref={detailInfo}
          style={{ display: isDetailShow ? "none" : "block" }}
        >
          <div className={styles.intro}>
            <div className={styles.titles}>
              <Title1>课程介绍</Title1>
              <Title1>Course Introduction</Title1>
            </div>
            <MainText>{intro}</MainText>
          </div>
          <div className={styles.feature}>
            <div className={styles.titles}>
              <Title1>课程特点</Title1>
              <Title1>Course Features</Title1>
            </div>
            <MainText>{features}</MainText>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};

export default Course;
