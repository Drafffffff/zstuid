import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { gsap } from "gsap";
import { useRef, useState } from "react";
const Navbar = () => {
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);
  const iconTop = useRef();
  const iconMid = useRef();
  const iconBtm = useRef();
  const menu = useRef();
  const handleMenu = () => () => {
    setIsMenuDisplay(!isMenuDisplay);
    if (isMenuDisplay) {
      gsap.to(menu.current, { x: "0" });
      gsap.to(iconTop.current, { rotation: "45", y: "7.2" });
      gsap.to(iconMid.current, { opacity: "0", duration: 0.2 });
      gsap.to(iconBtm.current, { rotation: "-45", y: "-7.2" });
    } else {
      gsap.to(menu.current, { x: "100%" });
      gsap.to(iconTop.current, { rotation: "0", y: 0 });
      gsap.to(iconMid.current, { opacity: "100", duration: 0.2 });
      gsap.to(iconBtm.current, { rotation: "0", y: 0 });
    }
  };
  return (
    <div>
      <div className={styles.navbar}>
        {/*<Image*/}
        {/*  src={require("../public/img/navbar/logowithtitle.svg")}*/}
        {/*  alt="logo"*/}
        {/*  quality={100}*/}
        {/*/>*/}
        <img src={require("../public/img/navbar/logowithtitle.svg")}/>
        <div className={styles.links}>
          <Link href={"/"}>
            <a className={`${styles.link}`}>关于我们</a>
          </Link>
          <Link href={"/studio"}>
            <a className={`${styles.link}`}>团队建设</a>
          </Link>
          <Link href={"/course"}>
            <a className={`${styles.link}`}>教学课程</a>
          </Link>
          <Link href={"/news"}>
            <a className={`${styles.link}`}>新闻中心</a>
          </Link>
          <Link href={"/graduaexhibition"}>
            <a className={`${styles.link}`}>毕业展</a>
          </Link>
        </div>
        <div>
          <Image
            src={require("../public/img/navbar/searchicon.svg")}
            alt="searchicon"
            width={31}
            height={20}
          ></Image>
        </div>
      </div>
      <div className={styles.navbarMobile}>
        <Image
          src={require("../public/img/navbar/logoblack.png")}
          alt="logo"
          quality={100}
        />
        <div className={styles.menubtn} onClick={handleMenu()}>
          <div className={`${styles.line} ${styles.top}`} ref={iconTop}></div>
          <div className={`${styles.line} ${styles.mid}`} ref={iconMid}></div>
          <div className={`${styles.line} ${styles.bot}`} ref={iconBtm}></div>
        </div>
      </div>
      <div
        className={styles.menu}
        // style={{ display: `${isMenuDisplay ? "flex" : "none"}` }}
        ref={menu}
      >
        <div className={styles.arrow}>
          <Image
            src={require("../public/img/navbar/Arrowmenu.svg")}
            alt="arrow"
            quality={100}
          ></Image>
        </div>
        <div className={styles.link}>
          <Link href={"/"}>
            <a className={`${styles.text}`}>
              <p>关于我们</p>
              <p>About Us</p>
            </a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href={"/studio"}>
            <a className={`${styles.text}`}>
              <p>团队建设</p>
              <p>Studio</p>
            </a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href={"/news"}>
            <a className={`${styles.text}`}>
              <p>新闻中心</p>
              <p>News</p>
            </a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href={"/course"}>
            <a className={`${styles.text}`}>
              <p>教学课程</p>
              <p>Course</p>
            </a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href={"/graduaexhibition"}>
            <a className={`${styles.text}`}>
              <p>毕业展</p>
              <p>Gradu</p>
              <p>Exhibition</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
