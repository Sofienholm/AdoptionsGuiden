//Storytelling, step 4
// handler om forskelle på hundetyper
// skal give lidt at tænke over inden quizzen starter

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// grafik del 1 + 2 (rene illustrationer)
import del1 from "./frames/del1.svg";
import del2 from "./frames/del2.svg";

// grafik del 3 (tekst + livssituation)
import del3Text from "./frames/del3_tekst.svg";
import del3Dyr from "./frames/dyr_del3.svg";
import del3Hjem from "./frames/hjem_del3.svg";
import del3Arbejde from "./frames/arbejde_del3.svg";

// tabs med hundetyper
import hyrdehundeTab from "./frames/hyrdehunde_tab.svg";
import jagthundeTab from "./frames/jagthunde_tab.svg";
import selskabshundeTab from "./frames/selskabshunde_tab.svg";
import arbejdhundeTab from "./frames/arbejdshunde_tab.svg";
import blandingshundeTab from "./frames/blandingshunde_tab.svg";
import mynderTab from "./frames/mynder_tab.svg";

// popup-kort
import jagtKort from "./frames/jagt_kort.svg";
import hyrdeKort from "./frames/hyrde_kort.svg";
import selskabKort from "./frames/selskab_kort.svg";
import arbejdKort from "./frames/vagt_kort.svg";
import blandingKort from "./frames/blanding_kort.svg";
import myndeKort from "./frames/mynder_kort.svg";

// styling
import styles from "./step4.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step4() {
  // section bruges til pin + scroll
  const sectionRef = useRef(null);

  // del 1 og 2
  const del1Ref = useRef(null);
  const del2Ref = useRef(null);

  // del 3
  const del3TextRef = useRef(null);
  const del3DyrRef = useRef(null);
  const del3HjemRef = useRef(null);
  const del3ArbejdeRef = useRef(null);

  // tabs
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const tab5Ref = useRef(null);
  const tab6Ref = useRef(null);

  // popup
  const popupOverlayRef = useRef(null);
  const popupInnerRef = useRef(null);

  // hvilket kort der er åbent
  const [activeCard, setActiveCard] = useState(null);

  // scroll-timeline
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

      // start states så intet hopper
      gsap.set(del1Ref.current, { opacity: 1, y: "0%" });
      gsap.set(del2Ref.current, { opacity: 0, y: "0%" });

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

      // lille pause i starten
      tl.to({}, { duration: 0.7 });

      // del 1 ud
      tl.to(del1Ref.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // tabs ind
      tl.to(tabs, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });

      // tabs ud igen
      tl.to(tabs, {
        y: "-120%",
        opacity: 0,
        duration: 1.0,
        ease: "power3.in",
        stagger: 0.15,
      });

      tl.to({}, { duration: 0.4 });

      // del 2 ind
      tl.to(del2Ref.current, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
      });

      tl.to({}, { duration: 0.5 });

      // del 2 ud
      tl.to(del2Ref.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

      // del 3 tekst
      tl.to(del3TextRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      });

      tl.to({}, { duration: 0.3 });

      // del 3 ikoner (hjem først)
      const del3Icons = [
        del3HjemRef.current,
        del3DyrRef.current,
        del3ArbejdeRef.current,
      ];

      tl.to(del3Icons, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
      });

      // alt ud til sidst
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

  // data til popup-kort
  const cardConfig = {
    hyrde: {
      img: hyrdeKort,
      alt: "Hyrdehunde",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/hyrde-og-vagthunde",
    },
    jagt: {
      img: jagtKort,
      alt: "Jagthunde",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/apporterende-jagthunde",
    },
    selskab: {
      img: selskabKort,
      alt: "Selskabshunde",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/selskabshunde",
    },
    arbejd: {
      img: arbejdKort,
      alt: "Arbejdshunde",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/hyrde-og-vagthunde",
    },
    blanding: {
      img: blandingKort,
      alt: "Blandingshunde",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/blandinger",
    },
    mynde: {
      img: myndeKort,
      alt: "Mynder",
      link: "https://www.dyrenesbeskyttelse.dk/familiedyr/pasningsvejledninger/hund/mynder",
    },
  };

  const handleTabClick = (key) => setActiveCard(key);

  // popup ind
  useEffect(() => {
    if (!activeCard) return;

    gsap.set(popupOverlayRef.current, { opacity: 0 });
    gsap.set(popupInnerRef.current, { opacity: 0, scale: 0.9, y: 20 });

    gsap
      .timeline()
      .to(popupOverlayRef.current, { opacity: 1, duration: 0.25 })
      .to(
        popupInnerRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.4 },
        "<0.05"
      );
  }, [activeCard]);

  const handleClosePopup = () => {
    gsap
      .timeline({ onComplete: () => setActiveCard(null) })
      .to(popupInnerRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.25,
      })
      .to(popupOverlayRef.current, { opacity: 0, duration: 0.2 }, "<");
  };

  const currentConfig = activeCard ? cardConfig[activeCard] : null;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.graphicWrapper}>
          {/* lag 1 – første illustration */}
          <img ref={del1Ref} src={del1} className={styles.mainGraphic} alt="" />

          {/* lag 2 – næste illustration i flowet */}
          <img ref={del2Ref} src={del2} className={styles.mainGraphic} alt="" />

          {/* del 3 – tekst der sætter refleksionen i gang */}
          <img
            ref={del3TextRef}
            src={del3Text}
            className={styles.mainGraphic}
            alt=""
          />

          {/* del 3 – ikoner (livssituation) */}
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

          {/* tabs med hundetyper */}
          <div className={styles.tabsGrid}>
            <img ref={tab1Ref} src={hyrdehundeTab} className={styles.tabCard} onClick={() => handleTabClick("hyrde")} />
            <img ref={tab2Ref} src={jagthundeTab} className={styles.tabCard} onClick={() => handleTabClick("jagt")} />
            <img ref={tab3Ref} src={selskabshundeTab} className={styles.tabCard} onClick={() => handleTabClick("selskab")} />
            <img ref={tab4Ref} src={arbejdhundeTab} className={styles.tabCard} onClick={() => handleTabClick("arbejd")} />
            <img ref={tab5Ref} src={blandingshundeTab} className={styles.tabCard} onClick={() => handleTabClick("blanding")} />
            <img ref={tab6Ref} src={mynderTab} className={styles.tabCard} onClick={() => handleTabClick("mynde")} />
          </div>
        </div>
      </div>

      {/* popup overlay – vises kun når en tab er valgt */}
      {activeCard && currentConfig && (
        <div ref={popupOverlayRef} className={styles.popupOverlay}>
          <div ref={popupInnerRef} className={styles.popupInner}>
            <img
              src={currentConfig.img}
              className={styles.popupImage}
              alt={currentConfig.alt}
            />

            {/* klik for at lukke */}
            <button
              className={styles.closeHitArea}
              onClick={handleClosePopup}
            />

            {/* link videre til dyrenes beskyttelse */}
            <a
              href={currentConfig.link}
              target="_blank"
              rel="noreferrer"
              className={styles.linkHitArea}
            />
          </div>
        </div>
      )}
    </section>
  );
}
