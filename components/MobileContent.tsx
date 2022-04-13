/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { codeHightLight, MainText, tidyUrl } from "./utils";
import styles from "./MobileContent.module.scss";
interface Iprops {
  // children: ReactNode;
  content: string;
}
const MobileContent: FC<Iprops> = ({ content }) => {
  return (
    <div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                style={codeHightLight}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p: ({ node, children }) =>{
            if (node.children[0].tagName === "img") {
              const image: any = node.children[0];
              return (
                <div className={styles.imageContainer}>
                  {/* <Image
                    src={`${tidyUrl(image.properties.src)}`}
                    alt={image.properties.alt}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                    className={styles.image}
                  /> */}
                  <img
                    src={`${tidyUrl(image.properties.src)}`}
                    alt={image.properties.alt}
                    className={styles.image}
                  />
                </div>
              );
            } else {
              return <MainText>{children}</MainText>;
            }
          }
            // node.children.map((e,index) => {
            //   if (e.tagName === "img") {
            //     const image: any = e;
            //     return (
            //       <div className={styles.imageContainer} key={index}>
            //         <img
            //           src={`${tidyUrl(image.properties.src)}`}
            //           alt={image.properties.alt}
            //           className={styles.image}
            //         />
            //       </div>
            //     );
            //   } else {
            //     return <MainText>{children}</MainText>;
            //   }
            // }),
            
          // img: image => {
          //   return (
          //     <img
          //       src={image.properties.src}
          //       alt={image.properties.alt}
          //       height="768"
          //       width="432"
          //     />
          //   )
          // },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MobileContent;
