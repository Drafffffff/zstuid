import styles from "./utils.module.scss";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import Router from "next/router";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import MobileContent from "./MobileContent";

interface IProps {
    children: React.ReactNode;
}

export const MainText: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainText}>{children}</div>;
};
export const MainTexts: React.FC<IProps> = ({children}) => {
    return <div className={styles.mainTexts}>{children}</div>;
};
export const Title1: React.FC<IProps> = ({children}) => {
    return <div className={styles.title1}>{children}</div>;
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

export const tidyUrl = (url: string): string => {
    const Url = `http://192.168.1.13:1337${url}`;
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
                ></Image>
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
                ></Image>
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

export const StudioDirectionM: React.FC<TProps> = ({zh, en}) => {
    return (
        <div className={styles.StudioDirectionContainer}>
            <div className={styles.StudioDrectionline}></div>
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
