import styles from "./utils.module.scss";
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import Router from "next/router";
import {gsap} from "gsap";
import dynamic from "next/dynamic";

import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useWindowSize} from "usehooks-ts";
import CustomEase from "gsap/CustomEase";

// declare var CustomEase: { create: (arg0: string, arg1: string) => any; };
// const {ScrollTrigger} = dynamic(import("gsap/ScrollTrigger"), {ssr: false})

interface IProps {
    children: React.ReactNode;
}

export const MainText: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainText}>{children}</div>;
};

export const MainTextW: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainTextW}>{children}</div>;
};
export const MainTexts: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainTexts}>{children}</div>;
};

export const MainTextsW: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainTextsW}>{children}</div>;
};
export const Title1: React.FC<IProps> = ({children}) => {
    return <div className={styles.title1}>{children}</div>;
};

export const ArticleTitle: React.FC<IProps> = ({children}) => {
    return <div className={styles.articleTitle}>{children}</div>;
};
export const Title1W: React.FC<IProps> = ({children}) => {
    return <div className={styles.title1W}>{children}</div>;
};
export const Title2: React.FC<IProps> = ({children}) => {
    return <div className={styles.title2}>{children}</div>;
};
export const Title3: React.FC<IProps> = ({children}) => {
    return <div className={styles.title3}>{children}</div>;
};
export const CardTitle: React.FC<IProps> = ({children}) => {
    return <div className={styles.cardTitle}>{children}</div>;
};

export const CardTitleW: React.FC<IProps> = ({children}) => {
    return <div className={styles.cardTitleW}>{children}</div>;
};

export const tidyUrl = (url: string): string => {
    const Url = `http://${LOCAL_URL}:1337${url}`;
    return Url;
};

interface pageNavProps {
    totalPages: number;
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    pathName: string;
}

export const PageNav: React.FC<pageNavProps> = ({
                                                    totalPages,
                                                    currentPage,
                                                    setPage,
                                                    pathName,
                                                }) => {
    // console.log(currentPage);
    let firstIndex, lastIndex;
    const displayNum = 3;
    if (totalPages <= displayNum * 2 + 1) {
        firstIndex = 1;
        lastIndex = totalPages;
    } else {
        if (currentPage - displayNum < 1) {
            firstIndex = 1;
        } else {
            firstIndex = currentPage - displayNum;
        }
        if (currentPage + displayNum >= totalPages) {
            lastIndex = totalPages;
        } else {
            lastIndex = currentPage + displayNum;
        }
    }
    const pageArray = [];
    for (let i = firstIndex; i <= lastIndex; i++) {
        pageArray.push(i);
    }

    function PrePage() {
        if (currentPage > 1) {
            gotoPage(currentPage - 1);
            setPage(currentPage - 1);
        }
    }

    function NextPage() {
        if (currentPage < totalPages) {
            gotoPage(currentPage + 1);

            setPage(currentPage + 1);
        }
    }

    function gotoPage(n: number) {
        Router.push({pathname: pathName, query: {page: n}});
        setPage(n);
    }

    return (
        <div
            className={styles.pageNav}
            style={{display: totalPages <= 1 ? "none" : "flex"}}
        >
            <div
                className={styles.prePage}
                onClick={() => {
                    PrePage();
                }}
            >
                <Image
                    src={require("/public/img/utils/prePage.svg")}
                    alt="prePage"
                    width={15}
                    height={16}
                />
            </div>
            <div className={styles.pageIcons}>
                {pageArray.map((item, index) => {
                    return (
                        <div
                            className={
                                String(item) === String(currentPage)
                                    ? styles.pageIconActive
                                    : styles.pageIcon
                            }
                            key={index}
                            onClick={() => {
                                gotoPage(item);
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
            <div
                className={styles.nextPage}
                onClick={() => {
                    NextPage();
                }}
            >
                <Image
                    src={require("/public/img/utils/prePage.svg")}
                    alt="NextPage"
                    width={15}
                    height={16}
                />
            </div>
        </div>
    );
};

export const codeHightLight = {
    'code[class*="language-"]': {
        color: "#e3eaf2",
        background: "none",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
    },
    'pre[class*="language-"]': {
        color: "#e3eaf2",
        background: "#111b27",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: "0.5em 0",
        overflow: "auto",
    },
    'pre[class*="language-"]::-moz-selection': {
        background: "#3c526d",
    },
    'pre[class*="language-"] ::-moz-selection': {
        background: "#3c526d",
    },
    'code[class*="language-"]::-moz-selection': {
        background: "#3c526d",
    },
    'code[class*="language-"] ::-moz-selection': {
        background: "#3c526d",
    },
    'pre[class*="language-"]::selection': {
        background: "#3c526d",
    },
    'pre[class*="language-"] ::selection': {
        background: "#3c526d",
    },
    'code[class*="language-"]::selection': {
        background: "#3c526d",
    },
    'code[class*="language-"] ::selection': {
        background: "#3c526d",
    },
    ':not(pre) > code[class*="language-"]': {
        background: "#111b27",
        padding: "0.1em 0.3em",
        borderRadius: "0.3em",
        whiteSpace: "normal",
    },
    comment: {
        color: "#8da1b9",
    },
    prolog: {
        color: "#8da1b9",
    },
    doctype: {
        color: "#8da1b9",
    },
    cdata: {
        color: "#8da1b9",
    },
    punctuation: {
        color: "#e3eaf2",
    },
    "delimiter.important": {
        color: "#66cccc",
        fontWeight: "inherit",
    },
    "selector.parent": {
        color: "#66cccc",
    },
    tag: {
        color: "#66cccc",
    },
    "tag.punctuation": {
        color: "#66cccc",
    },
    "attr-name": {
        color: "#e6d37a",
    },
    boolean: {
        color: "#e6d37a",
    },
    "boolean.important": {
        color: "#e6d37a",
    },
    number: {
        color: "#e6d37a",
    },
    constant: {
        color: "#e6d37a",
    },
    "selector.attribute": {
        color: "#e6d37a",
    },
    "class-name": {
        color: "#6cb8e6",
    },
    key: {
        color: "#6cb8e6",
    },
    parameter: {
        color: "#6cb8e6",
    },
    property: {
        color: "#6cb8e6",
    },
    "property-access": {
        color: "#6cb8e6",
    },
    variable: {
        color: "#6cb8e6",
    },
    "attr-value": {
        color: "#91d076",
    },
    inserted: {
        color: "#91d076",
    },
    color: {
        color: "#91d076",
    },
    "selector.value": {
        color: "#91d076",
    },
    string: {
        color: "#91d076",
    },
    "string.url-link": {
        color: "#91d076",
    },
    builtin: {
        color: "#f4adf4",
    },
    "keyword-array": {
        color: "#f4adf4",
    },
    package: {
        color: "#f4adf4",
    },
    regex: {
        color: "#f4adf4",
    },
    function: {
        color: "#c699e3",
    },
    "selector.class": {
        color: "#c699e3",
    },
    "selector.id": {
        color: "#c699e3",
    },
    "atrule.rule": {
        color: "#e9ae7e",
    },
    combinator: {
        color: "#e9ae7e",
    },
    keyword: {
        color: "#e9ae7e",
    },
    operator: {
        color: "#e9ae7e",
    },
    "pseudo-class": {
        color: "#e9ae7e",
    },
    "pseudo-element": {
        color: "#e9ae7e",
    },
    selector: {
        color: "#e9ae7e",
    },
    unit: {
        color: "#e9ae7e",
    },
    deleted: {
        color: "#cd6660",
    },
    important: {
        color: "#cd6660",
        fontWeight: "bold",
    },
    "keyword-this": {
        color: "#6cb8e6",
        fontWeight: "bold",
    },
    this: {
        color: "#6cb8e6",
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
    entity: {
        cursor: "help",
    },
    ".language-markdown .token.title": {
        color: "#6cb8e6",
        fontWeight: "bold",
    },
    ".language-markdown .token.title .token.punctuation": {
        color: "#6cb8e6",
        fontWeight: "bold",
    },
    ".language-markdown .token.blockquote.punctuation": {
        color: "#f4adf4",
    },
    ".language-markdown .token.code": {
        color: "#66cccc",
    },
    ".language-markdown .token.hr.punctuation": {
        color: "#6cb8e6",
    },
    ".language-markdown .token.url .token.content": {
        color: "#91d076",
    },
    ".language-markdown .token.url-link": {
        color: "#e6d37a",
    },
    ".language-markdown .token.list.punctuation": {
        color: "#f4adf4",
    },
    ".language-markdown .token.table-header": {
        color: "#e3eaf2",
    },
    ".language-json .token.operator": {
        color: "#e3eaf2",
    },
    ".language-scss .token.variable": {
        color: "#66cccc",
    },
    "token.tab:not(:empty):before": {
        color: "#8da1b9",
    },
    "token.cr:before": {
        color: "#8da1b9",
    },
    "token.lf:before": {
        color: "#8da1b9",
    },
    "token.space:before": {
        color: "#8da1b9",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
        color: "#111b27",
        background: "#6cb8e6",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
        color: "#111b27",
        background: "#6cb8e6",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
        color: "#111b27",
        background: "#6cb8e6da",
        textDecoration: "none",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
        color: "#111b27",
        background: "#8da1b9",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
        color: "#111b27",
        background: "#8da1b9",
    },
    "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
        color: "#111b27",
        background: "#8da1b9",
    },
    ".line-highlight.line-highlight": {
        background: "linear-gradient(to right, #3c526d5f 70%, #3c526d55)",
    },
    ".line-highlight.line-highlight:before": {
        backgroundColor: "#8da1b9",
        color: "#111b27",
        boxShadow: "0 1px #3c526d",
    },
    ".line-highlight.line-highlight[data-end]:after": {
        backgroundColor: "#8da1b9",
        color: "#111b27",
        boxShadow: "0 1px #3c526d",
    },
    "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
        {
            backgroundColor: "#8da1b918",
        },
    ".line-numbers.line-numbers .line-numbers-rows": {
        borderRight: "1px solid #0b121b",
        background: "#0b121b7a",
    },
    ".line-numbers .line-numbers-rows > span:before": {
        color: "#8da1b9da",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-1": {
        color: "#e6d37a",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-5": {
        color: "#e6d37a",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-9": {
        color: "#e6d37a",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-2": {
        color: "#f4adf4",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-6": {
        color: "#f4adf4",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-10": {
        color: "#f4adf4",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-3": {
        color: "#6cb8e6",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-7": {
        color: "#6cb8e6",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-11": {
        color: "#6cb8e6",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-4": {
        color: "#c699e3",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-8": {
        color: "#c699e3",
    },
    ".rainbow-braces .token.token.punctuation.brace-level-12": {
        color: "#c699e3",
    },
    "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
        backgroundColor: "#cd66601f",
    },
    "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
        backgroundColor: "#cd66601f",
    },
    "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
        backgroundColor: "#91d0761f",
    },
    "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
        backgroundColor: "#91d0761f",
    },
    ".command-line .command-line-prompt": {
        borderRight: "1px solid #0b121b",
    },
    ".command-line .command-line-prompt > span:before": {
        color: "#8da1b9da",
    },
};

interface TProps {
    zh: string;
    en: string;
}

export const Titleswe: React.FC<TProps> = ({zh, en}) => {
    return (
        <div>
            <Title1>{zh}</Title1>
            <Title1>{en}</Title1>
        </div>
    );
};

export const TitlesweW: React.FC<TProps> = ({zh, en}) => {
    return (
        <div>
            <Title1W>{zh}</Title1W>
            <Title1W>{en}</Title1W>
        </div>
    );
};
export const StudioDirectionM: React.FC<TProps> = ({zh, en}) => {
    return (
        <div className={styles.StudioDirectionContainer}>
            <div className={styles.StudioDrectionline}/>
            <div className={styles.StudioDirectionZh}>{zh}</div>
            <div className={styles.StudioDirectionEn}>{en}</div>
        </div>
    );
};

interface PersonCardInfo {
    name: string;
    describe: string;
    photoUrl: string;
}

export const StudioDirectionPersonCardM: React.FC<PersonCardInfo> = ({
                                                                         name,
                                                                         describe,
                                                                         photoUrl,
                                                                     }) => {
    return (
        <div className={styles.StudioDirectionPersonCardM}>
            <div className={styles.PersonImage}>
                <Image
                    src={tidyUrl(photoUrl)}
                    alt="personImage"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.PersonInfo}>
                <div className={styles.name}>{name}</div>
                <div className={styles.describe}>{describe}</div>
            </div>
        </div>
    );
};

interface VideoProps {
    bv: string;
}

// export const BilibiliVideo: React.FC<VideoProps> = ({bv}) => {
//     return (
//         <div className={styles.bilibili}>
//             <iframe
//                 src={`//player.bilibili.com/player.html?bvid=${bv}&page=1&as_wide=1&high_quality=1&danmaku=0`}
//                 scrolling="no"
//                 frameBorder="no"
//                 allowFullScreen={true}
//             />
//         </div>
//     );
// };

interface TalentConatent {
    title: string;
    content: string;
}

interface TalentProps {
    talents: TalentConatent[];
}

export const Talent: React.FC<TalentProps> = ({talents}) => {
    return (
        <div className={styles.talent}>
            {talents.map((talentItem, index) => (
                <div key={index}>
                    <div className={styles.title}>{talentItem.title}</div>
                    <div className={styles.content}>{talentItem.content}</div>
                </div>
            ))}
        </div>
    );
};

export const TalentW: React.FC<TalentProps> = ({talents}) => {
    return (
        <div className={styles.talentW}>
            <MainTextW>
                本专业在专业建设、人才培养等方面获得了第三方机构的积极评价，2018专业排名全国25名/245（武书连2018大学本科专业排行榜），2019专业排名全国10名/223（2019中国大学本科教育分专业竞争力排行榜），专业评估为五星专业。学生创新实践能力强，社会需求量大，近年来学生获得国内外工业设计重要赛事奖项近200项，包括全球红点至尊奖、IF概念奖等，并在浙江省大学生工业设计大赛中，学生历年参赛一等奖获奖率占一等奖总数的50%左右，位列省属院校的第一名；在教师指导下获得国家发明专利近70余项，国家级、省级学生科技创新项目立项近20项等。
            </MainTextW>
            <MainTextW>
                据《浙江省高校毕业生就业跟踪调查》报告，以及座谈、问卷、单位访问等多种形式调查显示：
            </MainTextW>
            <div className={styles.container}>
                <div>
                    <img
                        src={require("/public/img/aboutUs/circles.png").default.src}
                        alt={"circle"}
                        className={styles.img}
                    />
                </div>
                <div className={styles.items}>
                    {talents.map((talentItem, index) => (
                        <div key={index}>
                            <div className={styles.title}>{talentItem.title}</div>
                            <div className={styles.content}>{talentItem.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface FeatureProps {
    content: string[];
}

export const Features: React.FC<FeatureProps> = ({content}) => {
    gsap.registerPlugin(ScrollTrigger);
    const box = useWindowSize();
    const ref = useRef(null);
    const itemsRef = useRef([]);
    const textitemsRef = useRef([]);
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, content.length);
        const width = box.width;
        const element = ref.current;
        gsap.set(element, {x: 500});
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                toggleActions: "restart pause reverse none",
                // markers: true,
                scrub: 0.5,
                start: "center 87%",
                end: "+=150",
            },
            x: 0,
            duration: 3,
        });

        itemsRef.current.map(e => {
            gsap.set(e, {x: 500});
            gsap.to(e, {
                scrollTrigger: {
                    trigger: e,
                    toggleActions: "restart pause reverse none",
                    // markers: true,
                    scrub: 0.5,
                    start: "center 87%",
                    end: "+=150",
                },
                x: 0,
                duration: 3,
            });
        });

        textitemsRef.current.map(e => {
            gsap.set(e, {opacity: 0});
            gsap.to(e, {
                scrollTrigger: {
                    trigger: e,
                    toggleActions: "restart pause reverse none",
                    // markers: true,
                    scrub: 0.5,
                    start: "center 87%",
                    end: "+=150",
                },
                opacity: 1,
                duration: 3,
            });
        });
    }, [content]);
    return (
        <div className={styles.features}>
            <div className={styles.top}>
                <div className={styles.circle} ref={ref}/>
            </div>
            {content.map((e, i) => {
                return (
                    <div className={styles.feature} key={i}>
                        <div
                            className={styles.circle}
                            ref={
                                // @ts-ignore
                                el => (itemsRef.current[i] = el)
                            }
                        />
                        <div
                            className={styles.content}
                            ref={
                                // @ts-ignore
                                el => (textitemsRef.current[i] = el)
                            }
                        >
                            {e}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface featureItem {
    title: string;
    imgUrl: string;
}

interface FeatureMProps {
    content: featureItem[];
}

export const FeaturesW: React.FC<FeatureMProps> = ({content}) => {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null);
    const itemsRef = useRef([]);
    const textitemsRef = useRef([]);
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, content.length);
        const element = ref.current;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                toggleActions: "restart pause reverse none",
                // markers: true,
                scrub: 2,
                start: "center 87%",
                end: "+=200",
            },
            paused: true,
        });
        gsap.set(element, {
            x: "100vw",
        });
        itemsRef.current.map(e => {
            gsap.set(e, {
                x: "100vw",
            });
        });
        tl.to(element, {
            x: 0,
            duration: 1,
        });

        itemsRef.current.map(e => {
            tl.to(e, {
                x: 0,
                duration: 1,
            });
        });

        textitemsRef.current.map(e => {
            gsap.set(e, {opacity: 0});
            gsap.to(e, {
                scrollTrigger: {
                    trigger: e,
                    toggleActions: "restart pause reverse none",
                    // markers: true,
                    scrub: 0.5,
                    start: "center 87%",
                    end: "+=150",
                },
                opacity: 1,
                duration: 3,
            });
        });
    }, [content]);
    return (
        <div className={styles.featuresW}>
            <div className={styles.top}>
                <div className={styles.circle} ref={ref}/>
            </div>
            {content.map((e, i) => {
                return (
                    <div className={styles.feature} key={i}>
                        <div
                            className={styles.content}
                            ref={
                                // @ts-ignore
                                el => (textitemsRef.current[i] = el)
                            }
                        >
                            <div>{e.title}</div>

                            <div className={styles.image}>
                                <Image
                                    src={tidyUrl(e.imgUrl)}
                                    alt={"contentImage"}
                                    objectFit={"cover"}
                                    layout={"fill"}
                                />
                            </div>
                        </div>

                        <div
                            className={styles.circle}
                            ref={
                                // @ts-ignore
                                el => (itemsRef.current[i] = el)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};

const constrain = (n: number, low: number, high: number) => {
    return Math.max(Math.min(n, high), low);
};

const map = (
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
    withinBounds: boolean
) => {
    const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
};

interface HistoryItem {
    year: string;
    event_: string;
}

export interface historyProps {
    historyData: HistoryItem[];
}

export const History: React.FC<historyProps> = ({historyData}) => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);
    const yearsRef = useRef([]);
    const eventsRef = useRef([]);
    const timelineCurse = useRef(null);
    const linesRef = useRef([]);
    useEffect(() => {
        const element = timelineCurse.current;
        const timelineCurseAnime = gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                toggleActions: "restart pause reverse none",
                // markers: true,
                scrub: 0.2,
                start: "center 50%",
                end: "+=500",
            },
            y: 500,
            duration: 1,
            ease: "none",
        });
        const yearsAnime = gsap.to(yearsRef.current, {
            stagger: 0.5,
            // delay: 0.5,
            duration: 1,
            x: -100,
            color: "#f0fe97",
            opacity: 1,
            scale: 2,
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            paused: true,
        });
        const eventsAnime = gsap.to(eventsRef.current, {
            stagger: 0.5,
            scale: 1.5,
            duration: 1,
            opacity: 1,
            color: "#f0fe97",
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            x: 90,
            paused: true,
        });
        const linesAnime = gsap.to(linesRef.current, {
            stagger: 0.23,
            delay: 0.5,
            duration: 1.6,
            x: 18,
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            paused: true,
            yoyo: true,
        });
        linesAnime.progress(0.05);
        timelineCurseAnime.eventCallback("onUpdate", () => {
            const t = timelineCurseAnime.time();
            const tt = map(t, 0, 1, 0.05, 0.965, true);
            // const ttt = map(t, 0, 1, 0.05, 0.965, true);
            linesAnime.progress(tt, true);
            yearsAnime.progress(tt, true);
            eventsAnime.progress(tt, true);
        });

        return () => {
            gsap.killTweensOf(timelineCurseAnime);
        };
    }, []);
    return (
        <div className={styles.history}>
            <div className={styles.timeLine}>
                <div className={styles.timelineCursor} ref={timelineCurse}/>
                <div className={styles.lines}>
                    {historyData.map((e, i) => {
                        const index = i * 5;
                        return (
                            <div key={i} className={styles.unit}>
                                <div
                                    className={styles.year}
                                    ref={
                                        // @ts-ignore
                                        el => (yearsRef.current[i] = el)
                                    }
                                >
                                    {e.year}
                                </div>
                                <div
                                    className={styles.event}
                                    ref={
                                        // @ts-ignore
                                        el => (eventsRef.current[i] = el)
                                    }
                                >
                                    {e.event_}
                                </div>
                                <div
                                    className={styles.lineL}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index] = el)
                                    }
                                />
                                <div
                                    className={styles.line}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 1] = el)
                                    }
                                />
                                <div
                                    className={styles.line}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 2] = el)
                                    }
                                />
                                <div
                                    className={styles.line}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 3] = el)
                                    }
                                />
                                <div
                                    className={styles.line}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 4] = el)
                                    }
                                />
                                <div
                                    className={styles.line}
                                    style={{backgroundColor: "#000"}}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const HistoryW: React.FC<historyProps> = ({historyData}) => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);
    const yearsRef = useRef([]);
    const eventsRef = useRef([]);
    const timelineCurse = useRef(null);
    const linesRef = useRef([]);
    const lineContainerRef = useRef(null);
    const total = useRef(null);
    useEffect(() => {
        const element = timelineCurse.current;
        const timelineCurseAnime = gsap.to(element, {
            scrollTrigger: {
                trigger: total.current,
                toggleActions: "restart pause reverse none",
                // markers: true,
                scrub: 0.2,
                start: "center 80%",
                end: "+=500",
                // pin: true,
            },
            // @ts-ignore
            x: lineContainerRef.current.clientWidth - 50,
            duration: 1,
            ease: "none",
        });
        const yearsAnime = gsap.to(yearsRef.current, {
            stagger: 0.5,
            // delay: 0.5,
            duration: 1,
            y: -100,
            color: "#f0fe97",
            opacity: 1,
            scale: 3,
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            paused: true,
        });
        const eventsAnime = gsap.to(eventsRef.current, {
            stagger: 0.5,
            scale: 1.5,
            duration: 1,
            opacity: 1,
            color: "#f0fe97",
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            y: 150,
            paused: true,
        });
        const linesAnime = gsap.to(linesRef.current, {
            stagger: 0.23,
            delay: 0.5,
            duration: 1.6,
            y: 18,
            ease: CustomEase.create(
                "custom",
                "M0,0,C0,0,0.198,1,0.5,1,0.8,1,1,0,1,0"
            ),
            paused: true,
            yoyo: true,
        });
        linesAnime.progress(0.025);
        timelineCurseAnime.eventCallback("onUpdate", () => {
            const t = timelineCurseAnime.time();
            const tt = map(t, 0, 1, 0.025, 0.985, true);
            // const ttt = map(t, 0, 1, 0.05, 0.965, true);
            linesAnime.progress(tt, true);
            yearsAnime.progress(tt, true);
            eventsAnime.progress(tt, true);
        });

        return () => {
            gsap.killTweensOf(timelineCurseAnime);
            gsap.killTweensOf(linesAnime);
            gsap.killTweensOf(eventsAnime);
        };
    }, []);
    return (
        <div className={styles.historyW} ref={total}>
            <div className={styles.timeLineW}>
                <div className={styles.timelineCursorW} ref={timelineCurse}/>
                <div className={styles.linesW} ref={lineContainerRef}>
                    {historyData.map((e, i) => {
                        const index = i * 10;
                        return (
                            <div key={i} className={styles.unitW}>
                                <div
                                    className={styles.yearW}
                                    ref={
                                        // @ts-ignore
                                        el => (yearsRef.current[i] = el)
                                    }
                                >
                                    {e.year}
                                </div>
                                <div
                                    className={styles.eventW}
                                    ref={
                                        // @ts-ignore
                                        el => (eventsRef.current[i] = el)
                                    }
                                >
                                    {e.event_}
                                </div>
                                <div
                                    className={styles.lineLW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 1] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 2] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 3] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 4] = el)
                                    }
                                />

                                <div
                                    className={styles.lineLW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 5] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 6] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 7] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 8] = el)
                                    }
                                />
                                <div
                                    className={styles.lineW}
                                    ref={
                                        // @ts-ignore
                                        el => (linesRef.current[index + 9] = el)
                                    }
                                />

                                <div
                                    className={styles.lineW}
                                    style={{backgroundColor: "#000"}}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

interface bannerProps {
    bannerData: any;
}

export const BannerM: React.FC<bannerProps> = ({bannerData}) => {
    const top = useRef(null);
    const bottom = useRef(null);
    const left = useRef(null);
    const right = useRef(null);
    const container = useRef(null);
    const [width, setWidth] = useState(0);

    function changeTop() {
        gsap.to(left.current, {
            flexBasis: "95%",
        });
        gsap.to(top.current, {
            flexBasis: "90%",
        });
    }

    function changeBottom() {
        gsap.to(left.current, {
            flexBasis: "95%",
        });
        gsap.to(top.current, {
            flexBasis: "8%",
        });
    }

    function changeRight() {
        gsap.to(left.current, {
            flexBasis: "5%",
        });
    }

    let count = 0;
    useEffect(() => {
        // @ts-ignore
        setWidth(container.current.clientWidth);
        gsap.defaults({
            ease: "power2.out",
            duration: 0.8,
        });
        const intervalId = setInterval(() => {
            if (count >= 2) {
                count = 0;
            } else {
                count++;
            }
            if (count === 0) {
                changeTop();
            } else if (count === 1) {
                changeBottom();
            } else if (count === 2) {
                changeRight();
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleClick = (url: string) => {
        window.location.href = url;
    };
    return (
        <div
            className={styles.bannerContainer}
            ref={container}
            style={{height: `${width / 1.875}px`}}
        >
            <div className={styles.left} ref={left}>
                <div
                    className={styles.top}
                    style={{
                        backgroundImage: `url(${tidyUrl(bannerData.bannerItem1.coverUrl)})`,
                    }}
                    ref={top}
                    onClick={() => {
                        handleClick(bannerData.bannerItem1.url);
                    }}
                    onMouseEnter={() => {
                        changeTop();
                    }}
                />
                <div
                    className={styles.bottom}
                    style={{
                        backgroundImage: `url(${tidyUrl(bannerData.bannerItem2.coverUrl)})`,
                    }}
                    ref={bottom}
                    onClick={() => {
                        handleClick(bannerData.bannerItem2.url);
                    }}
                    onMouseEnter={() => {
                        changeBottom();
                    }}
                />
            </div>
            <div className={styles.right}>
                <div
                    className={styles.right}
                    style={{
                        backgroundImage: `url(${tidyUrl(bannerData.bannerItem3.coverUrl)})`,
                    }}
                    ref={right}
                    onClick={() => {
                        handleClick(bannerData.bannerItem3.url);
                    }}
                    onMouseEnter={() => {
                        changeRight();
                    }}
                />
            </div>
        </div>
    );
};

interface HomeContentProp {
}

export const HomeContent: React.FC<HomeContentProp> = () => {
    const content = [
        `浙江省“十二五”“十三五”
    新兴特色专业`,
        `国家级一流本科专业建设点`,
        `教育部卓越工程师培养计划专业`,
        `培养能服务并引领数字智能及制造行业发展需求的具有人文关怀和社会责任感的复合型工业设计卓越人才`,
    ];
    return (
        <div className={styles.homeContent}>
            <div className={`${styles.text1} ${styles.text}`}>{content[0]}</div>
            <div className={`${styles.text2} ${styles.text}`}>{content[1]}</div>
            <div className={`${styles.text3} ${styles.text}`}>{content[2]}</div>
            <div className={`${styles.text4} ${styles.text}`}>{content[3]}</div>
        </div>
    );
};

export const HomeContentW: React.FC<HomeContentProp> = () => {
    const content = [
        `[ 浙江省“十二五”“十三五”
    新兴特色专业 ]`,
        `[ 国家级一流本科专业建设点][教育部卓越工程师培养计划专业 ]`,
        `[ 培养能服务并引领数字智能及制造行业发展需求的具有人文关怀和社会责任感的复合型工业设计卓越人才 ]`,
    ];
    return (
        <div className={styles.homeContentW}>
            <div className={`${styles.text1W} ${styles.textW}`}>{content[0]}</div>
            <div className={`${styles.text2W} ${styles.textW}`}>{content[1]}</div>
            <div className={`${styles.text3W} ${styles.textW}`}>
                {/*<div className={styles.p1}>DEPARTMENT OF</div>*/}
                {/*<div className={styles.p2}>INDUSTRIAL</div>*/}
                {/*<div className={styles.p3}>DESIGN</div>*/}
                {/*<div className={styles.p4}>浙江理工大学工业设计系</div>*/}
                <img
                    src={require("/public/img/aboutUs/title.png").default.src}
                    alt={"title"}
                    className={styles.img}
                />
            </div>
            <div className={`${styles.text4W} ${styles.textW}`}>{content[2]}</div>
        </div>
    );
};

export const LOCAL_URL = "diid.zstu.edu.cn";
