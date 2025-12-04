// Step4.jsx
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import del1 from "./frames/del1.svg";
import del2 from "./frames/del2.svg";

// ⭐ DEL 3
import del3Text from "./frames/del3_tekst.svg";
import del3Dyr from "./frames/dyr_del3.svg";
import del3Hjem from "./frames/hjem_del3.svg";
import del3Arbejde from "./frames/arbejde_del3.svg";

import hyrdehundeTab from "./frames/hyrdehunde_tab.svg";
import jagthundeTab from "./frames/jagthunde_tab.svg";
import selskabshundeTab from "./frames/selskabshunde_tab.svg";
import arbejdhundeTab from "./frames/arbejdshunde_tab.svg";
import blandingshundeTab from "./frames/blandingshunde_tab.svg";
import mynderTab from "./frames/mynder_tab.svg";

import jagtKort from "./frames/jagt_kort.svg";
import hyrdeKort from "./frames/hyrde_kort.svg";
import selskabKort from "./frames/selskab_kort.svg";
import arbejdKort from "./frames/vagt_kort.svg";
import blandingKort from "./frames/blanding_kort.svg";
import myndeKort from "./frames/mynder_kort.svg";

import styles from "./step4.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step4() {
  const sectionRef = useRef(null);

  const del1Ref = useRef(null);
  const del2Ref = useRef(null);

  // ⭐ DEL 3 refs
  const del3TextRef = useRef(null);
  const del3DyrRef = useRef(null);
  const del3HjemRef = useRef(null);
  const del3ArbejdeRef = useRef(null);

  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const tab5Ref = useRef(null);
  const tab6Ref = useRef(null);

  // popup refs
  const popupOverlayRef = useRef(null);
  const popupInnerRef = useRef(null);

  // hvilken popup er åben?
  const [activeCard, setActiveCard] = useState(null);

  // SCROLL ANIMATION (del1 → tabs → del2 → del3)
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

      // start-states
      gsap.set(del1Ref.current, { opacity: 1, y: "0%" });
      gsap.set(del2Ref.current, { opacity: 0, y: "0%" });

      // ⭐ del3 starter skjult nede under scenen
      gsap.set(
        [
          del3TextRef.current,
          del3DyrRef.current,
          del3HjemRef.current,
          del3ArbejdeRef.current,
        ],
        { opacity: 0, y: "120%" }
      );

      gsap.set(tabs, { opacity: 0, y: "120%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
        },
      });

      // lille pause inden noget sker
      tl.to({}, { duration: 0.7 });

      // del1 fader ud
      tl.to(del1Ref.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // tabs glider ind nedefra
      tl.to(tabs, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });

      // tabs glider UD opad – spejlvendt
      tl.to(tabs, {
        y: "-120%",
        opacity: 0,
        duration: 1.0,
        ease: "power3.in",
        stagger: 0.15,
      });

      // lille pause
      tl.to({}, { duration: 0.4 });

      // del2 fades ind
      tl.to(del2Ref.current, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
      });

      // ⭐ lille pause inden del3
      tl.to({}, { duration: 0.5 });

      // del2 fades ud for at give plads til del3
      tl.to(del2Ref.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

      // ⭐ DEL 3: tekst glider op fra bunden
      tl.to(del3TextRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      });

      // lille pause før ikonerne
      tl.to({}, { duration: 0.3 });

      // ⭐ DEL 3: ikoner glider op – først hjem (midten), så dyr, så arbejde
      const del3Icons = [
        del3HjemRef.current, // midten
        del3DyrRef.current, // dyr
        del3ArbejdeRef.current, // arbejde
      ];

      tl.to(del3Icons, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
      });

      // ⭐ til sidst: glid UD opad, så kun baggrundsfarven er tilbage
      tl.to([del3TextRef.current, ...del3Icons], {
        y: "-120%",
        opacity: 0,
        duration: 1.0,
        ease: "power3.in",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // KONFIG FOR ALLE 6 TYPER
  const cardConfig = {
    hyrde: {
      img: hyrdeKort,
      alt: "Hyrdehunde",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/hyrde-og-vagthunde?_gl=1*1hhdq66*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
    jagt: {
      img: jagtKort,
      alt: "Jagthunde",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/apporterende-jagthunde?_gl=1*x9riv1*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
    selskab: {
      img: selskabKort,
      alt: "Selskabshunde",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/selskabshunde?_gl=1*wpfrw9*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
    arbejd: {
      img: arbejdKort,
      alt: "Arbejdshunde",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/hyrde-og-vagthunde?_gl=1*1hhdq66*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
    blanding: {
      img: blandingKort,
      alt: "Blandingshunde",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/blandinger?_gl=1*w6i9x1*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
    mynde: {
      img: myndeKort,
      alt: "Mynder",
      link:
        "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/mynder?_gl=1*1hhdq66*_up*MQ..*_ga*OTIxMTc3MzAzLjE3NjQ4MDc2NjE.*_ga_NKNY71TXFV*czE3NjQ4MDc2NjEkbzEkZzAkdDE3NjQ4MDc2NjEkajYwJGwwJGgxNzc2NTc3OTIy",
    },
  };

  const handleTabClick = (key) => {
    setActiveCard(key);
  };

  // ÅBN POPUP (GSAP)
  useEffect(() => {
    if (!activeCard) return;

    gsap.set(popupOverlayRef.current, { opacity: 0 });
    gsap.set(popupInnerRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
    });

    const tl = gsap.timeline();
    tl.to(popupOverlayRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    }).to(
      popupInnerRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      },
      "<0.05"
    );
  }, [activeCard]);

  // LUK POPUP (GSAP)
  const handleClosePopup = () => {
    const tl = gsap.timeline({
      onComplete: () => setActiveCard(null),
    });

    tl.to(popupInnerRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    }).to(
      popupOverlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );
  };

  const currentConfig = activeCard ? cardConfig[activeCard] : null;

  return (
    <>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.graphicWrapper}>
            {/* del1, del2 og del3-lag ligger oven på hinanden og styres af GSAP */}
            <img ref={del1Ref} src={del1} className={styles.mainGraphic} alt="" />
            <img ref={del2Ref} src={del2} className={styles.mainGraphic} alt="" />

            {/* ⭐ DEL 3 – tekst fylder hele artboardet */}
            <img ref={del3TextRef} src={del3Text} className={styles.mainGraphic} alt="" />

            {/* ⭐ DEL 3 – ikoner nederst placeret som i layoutet */}
            <img
              ref={del3HjemRef}
              src={del3Hjem}
              className={`${styles.del3Icon} ${styles.del3IconHjem}`}
              alt=""
            />
            <img
              ref={del3DyrRef}
              src={del3Dyr}
              className={`${styles.del3Icon} ${styles.del3IconDyr}`}
              alt=""
            />
            <img
              ref={del3ArbejdeRef}
              src={del3Arbejde}
              className={`${styles.del3Icon} ${styles.del3IconArbejde}`}
              alt=""
            />

            <div className={styles.tabsGrid}>
              <img
                ref={tab1Ref}
                src={hyrdehundeTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("hyrde")}
              />
              <img
                ref={tab2Ref}
                src={jagthundeTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("jagt")}
              />
              <img
                ref={tab3Ref}
                src={selskabshundeTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("selskab")}
              />
              <img
                ref={tab4Ref}
                src={arbejdhundeTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("arbejd")}
              />
              <img
                ref={tab5Ref}
                src={blandingshundeTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("blanding")}
              />
              <img
                ref={tab6Ref}
                src={mynderTab}
                className={styles.tabCard}
                onClick={() => handleTabClick("mynde")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {activeCard && (
        <div ref={popupOverlayRef} className={styles.popupOverlay}>
          <div ref={popupInnerRef} className={styles.popupInner}>
            <img
              src={currentConfig.img}
              className={styles.popupImage}
              alt={currentConfig.alt}
            />

            <button
              className={styles.closeHitArea}
              onClick={handleClosePopup}
            />

            {currentConfig.link && (
              <a
                href={currentConfig.link}
                target="_blank"
                rel="noreferrer"
                className={styles.linkHitArea}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
