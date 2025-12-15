//Storytelling/step 1
// Første del af onboarding
// Handler om hvad en internathund er
// Bygger op fra ro → kaos → ro igen, ligesom hundens oplevelse

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//Visuelle elementer
import dogBox from "./frames/dog_center_box.svg";
import bubble1 from "./frames/bubble1.svg";
import bubble2 from "./frames/bubble2.svg";
import bubble3 from "./frames/bubble3.svg";
import bubble4 from "./frames/bubble4.svg";

import chaosDog1 from "./frames/chaos_dog1.svg";
import chaosDog2 from "./frames/chaos_dog3.svg";
import chaosDog3 from "./frames/chaos_dog4.svg";
import chaosDog4 from "./frames/chaos_dog2.svg";

import chaosSticker1 from "./frames/chaos_sticker1.svg";
import chaosSticker2 from "./frames/chaos_sticker2.svg";

import illuScroll from "./frames/illu_scroll.svg";

//Styling
import styles from "./step1.module.css";

//Gsap
gsap.registerPlugin(ScrollTrigger);

export default function Step1() {
  // Section der bruges til pin + trigger
  const sectionRef = useRef(null);

  // Intro tekst refs
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);

  // Hunden i midten, bruges som fast punkt
  const dogCenterRef = useRef(null);

  // Info bobler
  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);
  const bubble3Ref = useRef(null);
  const bubble4Ref = useRef(null);

  // Chaos elementer
  const chaos1Ref = useRef(null);
  const chaos2Ref = useRef(null);
  const chaos3Ref = useRef(null);
  const chaos4Ref = useRef(null);

  // Stickers der bare larmer lidt ekstra
  const sticker1Ref = useRef(null);
  const sticker2Ref = useRef(null);
  const sticker3Ref = useRef(null);
  const sticker4Ref = useRef(null);
  const sticker5Ref = useRef(null);
  const sticker6Ref = useRef(null);

  // Rolige tekster efter kaos
  const calmTextTopRef = useRef(null);
  const calmTextBottomRef = useRef(null);

  // Slut budskab
  const finalSmallRef = useRef(null);
  const finalBigRef = useRef(null);

  // Scroll hint i starten
  const scrollHintRef = useRef(null);

  useEffect(() => {
    // GSAP context så det cleaner rigtigt op
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
  
      // Start state så der ikke sker mærkelige spring
      gsap.set([introTitleRef.current, introTextRef.current], { opacity: 0 });
      gsap.set(dogCenterRef.current, { opacity: 0 });
      gsap.set(scrollHintRef.current, { opacity: 1 });
      gsap.set(
        [
          calmTextTopRef.current,
          calmTextBottomRef.current,
          finalSmallRef.current,
          finalBigRef.current,
        ],
        { opacity: 0 }
      );
  
      // Lang scroll animation der kører hele fortællingen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=7000",
          scrub: 1,
          pin: true,
        },
      });
  
      // Scroll hint væk
      tl.to(scrollHintRef.current, { opacity: 0, duration: 0.4 });
      tl.to({}, { duration: 1.2 });
  
      // Intro titel
      tl.to(introTitleRef.current, { opacity: 1, duration: 0.8 });
      tl.to({}, { duration: 0.4 });
  
      // Intro tekst + hund
      tl.to([introTextRef.current, dogCenterRef.current], {
        opacity: 1,
        duration: 1,
      });
  
      // Intro ud igen
      tl.to([introTitleRef.current, introTextRef.current], { opacity: 0 });
  
      // Info bobler
      tl.to(bubble1Ref.current, { opacity: 1 });
      tl.to({}, { duration: 0.3 });
      tl.to(bubble1Ref.current, { opacity: 0 });
      tl.to(bubble2Ref.current, { opacity: 1 }, "<");
      tl.to({}, { duration: 0.3 });
      tl.to(bubble2Ref.current, { opacity: 0 });
      tl.to(bubble3Ref.current, { opacity: 1 }, "<");
      tl.to({}, { duration: 0.3 });
      tl.to(bubble3Ref.current, { opacity: 0 });
      tl.to(bubble4Ref.current, { opacity: 1 }, "<");
      tl.to(bubble4Ref.current, { opacity: 0 });
  
      tl.to({}, { duration: 2 });
  
      // Kaos ind fra alle sider
      tl.fromTo(
        chaos1Ref.current,
        { opacity: 0, x: "-200%", y: "-200%" },
        { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
        "<"
      );
      tl.fromTo(
        chaos2Ref.current,
        { opacity: 0, x: "200%", y: "-200%" },
        { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
        "<"
      );
      tl.fromTo(
        chaos3Ref.current,
        { opacity: 0, x: "200%", y: "200%" },
        { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
        "<"
      );
      tl.fromTo(
        chaos4Ref.current,
        { opacity: 0, x: "-200%", y: "200%" },
        { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
        "<"
      );
  
      // Stickers oveni kaos
      tl.fromTo(
        [
          sticker1Ref.current,
          sticker2Ref.current,
          sticker3Ref.current,
          sticker4Ref.current,
          sticker5Ref.current,
          sticker6Ref.current,
        ],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }
      );
  
      // Overstimulering / rysten
      tl.to(
        [sticker1Ref.current, sticker3Ref.current, sticker5Ref.current],
        {
          y: "-10%",
          yoyo: true,
          repeat: 8,
          duration: 0.05,
          stagger: 0.03,
        },
        "<"
      );
  
      tl.to(
        [sticker2Ref.current, sticker4Ref.current, sticker6Ref.current],
        {
          x: "8%",
          yoyo: true,
          repeat: 8,
          duration: 0.05,
          stagger: 0.03,
        },
        "<"
      );
  
      // Alt kaos ud igen
      tl.to(
        [
          chaos1Ref.current,
          chaos2Ref.current,
          chaos3Ref.current,
          chaos4Ref.current,
          sticker1Ref.current,
          sticker2Ref.current,
          sticker3Ref.current,
          sticker4Ref.current,
          sticker5Ref.current,
          sticker6Ref.current,
        ],
        { opacity: 0, duration: 1.5 }
      );
  
      // Rolige tekster
      tl.to(calmTextTopRef.current, {
        opacity: 1,
        y: "-10%",
        duration: 1,
      });
      tl.to({}, { duration: 1 });
      tl.to(calmTextBottomRef.current, {
        opacity: 1,
        y: "10%",
        duration: 1,
      });
  
      // Rolige tekster væk
      tl.to([calmTextTopRef.current, calmTextBottomRef.current], {
        opacity: 0,
        duration: 0.6,
      });
  
      // Fokus ind på hunden
      tl.to(dogCenterRef.current, {
        scale: 1.4,
        transformOrigin: "50% 50%",
        duration: 2,
      });
  
      // Slut tekst
      tl.fromTo(
        finalSmallRef.current,
        { opacity: 0, y: "-10%" },
        { opacity: 1, y: "0%", duration: 1.2 }
      );
      tl.fromTo(
        finalBigRef.current,
        { opacity: 0, y: "-5%" },
        { opacity: 1, y: "0%", duration: 1.2 },
        "<0.2"
      );
    });
  
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <img ref={scrollHintRef} src={illuScroll} alt="" className={styles.scrollHint} />

        <h1 ref={introTitleRef} className={styles.introTitle}>
          HVAD ER EN INTERNATHUND?
        </h1>

        <p ref={introTextRef} className={styles.introText}>
          HER ER NOGLE SÆRLIGE TING AT VÆRE OPMÆRKSOM PÅ FORUD FOR ADOPTION
        </p>

        <div className={styles.bubbleWrapper}>
          {/* CENTRAL HUND */}
          <div className={styles.dogCenterWrapper}>
            <img ref={dogCenterRef} src={dogBox} className={styles.dogCenter} alt="" />
          </div>

          {/* INFO BOBLER */}
          <img ref={bubble1Ref} src={bubble1} className={styles.bubble1} alt="" />
          <img ref={bubble2Ref} src={bubble2} className={styles.bubble2} alt="" />
          <img ref={bubble3Ref} src={bubble3} className={styles.bubble3} alt="" />
          <img ref={bubble4Ref} src={bubble4} className={styles.bubble4} alt="" />

          {/* CHAOS */}
          <img ref={chaos1Ref} src={chaosDog1} className={styles.chaos1} alt="" />
          <img ref={chaos2Ref} src={chaosDog2} className={styles.chaos2} alt="" />
          <img ref={chaos3Ref} src={chaosDog3} className={styles.chaos3} alt="" />
          <img ref={chaos4Ref} src={chaosDog4} className={styles.chaos4} alt="" />

          {/* STICKERS */}
          <img ref={sticker1Ref} src={chaosSticker1} className={styles.sticker1} alt="" />
          <img ref={sticker2Ref} src={chaosSticker2} className={styles.sticker2} alt="" />
          <img ref={sticker3Ref} src={chaosSticker1} className={styles.sticker3} alt="" />
          <img ref={sticker4Ref} src={chaosSticker2} className={styles.sticker4} alt="" />
          <img ref={sticker5Ref} src={chaosSticker1} className={styles.sticker5} alt="" />
          <img ref={sticker6Ref} src={chaosSticker1} className={styles.sticker6} alt="" />

          {/* RO TEKSTER */}
          <p ref={calmTextTopRef} className={styles.calmTextTop}>
            DET STRESSET MILJØ SÆTTER SIG OFTE I HUNDEN
          </p>
          <p ref={calmTextBottomRef} className={styles.calmTextBottom}>
            DERFOR SER MAN TIT AT HUNDENS ADFÆRD <br /> ÆNDRE SIG NÅR DEN KOMMER HJEM
          </p>

          {/* SLUT TEKST */}
          <p ref={finalBigRef} className={styles.finalBig}>
            SÅ HUSK AT HVER INTERNATHUND HAR SIN EGEN HISTORIE!
          </p>
        </div>
      </div>
    </section>
  );
}
