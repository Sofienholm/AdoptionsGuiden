// Step4.jsx
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import del1 from "./frames/del1.svg";

import hyrdehundeTab from "./frames/hyrdehunde_tab.svg";
import jagthundeTab from "./frames/jagthunde_tab.svg";
import selskabshundeTab from "./frames/selskabshunde_tab.svg";
import arbejdhundeTab from "./frames/arbejdshunde_tab.svg";
import blandingshundeTab from "./frames/blandingshunde_tab.svg";
import mynderTab from "./frames/mynder_tab.svg";

import jagtKort from "./frames/jagt_kort.svg";

import styles from "./step4.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step4() {
  const sectionRef = useRef(null);

  const del1Ref = useRef(null);

  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const tab5Ref = useRef(null);
  const tab6Ref = useRef(null);

  // styrer hvilken popup der er åben (null = ingen)
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tabs = [
        tab1Ref.current,
        tab2Ref.current,
        tab3Ref.current,
        tab4Ref.current,
        tab5Ref.current,
        tab6Ref.current,
      ];

      // start-positioner
      gsap.set(del1Ref.current, {
        opacity: 1,
        y: "0%",
      });

      gsap.set(tabs, {
        opacity: 0,
        y: "120%", // kommer nedefra
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
        },
      });

      // lille pause hvor kun del1 vises
      tl.to({}, { duration: 0.7 });

      // del1 fades ud
      tl.to(del1Ref.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // tabs flyver op fra bunden
      tl.to(tabs, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleJagtClick = () => {
    setActiveCard("jagt");
  };

  const handleClosePopup = () => {
    setActiveCard(null);
  };

  return (
    <>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.inner}>
          {/* wrapper for hele scenen */}
          <div className={styles.graphicWrapper}>
            {/* DEL 1 – vises først i timelinen */}
            <img ref={del1Ref} src={del1} className={styles.mainGraphic} alt="" />

            {/* 2x3 grid – tabs */}
            <div className={styles.tabsGrid}>
              <img
                ref={tab1Ref}
                src={hyrdehundeTab}
                className={styles.tabCard}
                alt="Hyrdehunde"
              />
              <img
                ref={tab2Ref}
                src={jagthundeTab}
                className={styles.tabCard}
                alt="Jagthunde"
                onClick={handleJagtClick}
              />
              <img
                ref={tab3Ref}
                src={selskabshundeTab}
                className={styles.tabCard}
                alt="Selskabshunde"
              />
              <img
                ref={tab4Ref}
                src={arbejdhundeTab}
                className={styles.tabCard}
                alt="Arbejdshunde"
              />
              <img
                ref={tab5Ref}
                src={blandingshundeTab}
                className={styles.tabCard}
                alt="Blandingshunde"
              />
              <img
                ref={tab6Ref}
                src={mynderTab}
                className={styles.tabCard}
                alt="Mynder"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FULLSCREEN POPUP FOR JAGT HUNDE */}
      {activeCard === "jagt" && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupInner}>
            {/* selve kortet */}
            <img src={jagtKort} className={styles.popupImage} alt="Jagt hunde" />

            {/* klikfelt oven på X i hjørnet */}
            <button
              type="button"
              className={styles.closeHitArea}
              onClick={handleClosePopup}
              aria-label="Luk"
            />

            {/* klikfelt oven på 'Pasningsvejledning for jagt hunde' */}
            <a
              href="https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/apporterende-jagthunde?_gl=1*x9riv1*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy"
              target="_blank"
              rel="noreferrer"
              className={styles.linkHitArea}
            >
              {/* tom – hele boksen er klikbar */}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
