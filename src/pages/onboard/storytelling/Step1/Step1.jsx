import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

import styles from "./step1.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step1() {
  const sectionRef = useRef(null);

  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);

  const dogCenterRef = useRef(null);

  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);
  const bubble3Ref = useRef(null);
  const bubble4Ref = useRef(null);

  const chaos1Ref = useRef(null);
  const chaos2Ref = useRef(null);
  const chaos3Ref = useRef(null);
  const chaos4Ref = useRef(null);

  const sticker1Ref = useRef(null);
  const sticker2Ref = useRef(null);
  const sticker3Ref = useRef(null);
  const sticker4Ref = useRef(null);
  const sticker5Ref = useRef(null);
  const sticker6Ref = useRef(null);

  const calmTextTopRef = useRef(null);
  const calmTextBottomRef = useRef(null);

  const finalSmallRef = useRef(null);
  const finalBigRef = useRef(null);

  const scrollHintRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;

      // START STATES
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

      // TIMELINE (100% urørt bortset fra finalBig-dup fix)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=7000",
          scrub: 1,
          pin: true,
        },
      });

      // Scroll-illu ud
      tl.to(scrollHintRef.current, { opacity: 0, duration: 0.4 })
        .to({}, { duration: 1.2 })

        // Intro titel ind
        .to(introTitleRef.current, { opacity: 1, duration: 0.8 })
        .to({}, { duration: 0.4 })

        // Intro tekst + hund ind
        .to([introTextRef.current, dogCenterRef.current], {
          opacity: 1,
          duration: 1,
        })

        // Fade intro ud
        .to([introTitleRef.current, introTextRef.current], { opacity: 0 })

        // Bobble sekvens
        .to(bubble1Ref.current, { opacity: 1 })
        .to({}, { duration: 0.3 })
        .to(bubble1Ref.current, { opacity: 0 })
        .to(bubble2Ref.current, { opacity: 1 }, "<")
        .to({}, { duration: 0.3 })
        .to(bubble2Ref.current, { opacity: 0 })
        .to(bubble3Ref.current, { opacity: 1 }, "<")
        .to({}, { duration: 0.3 })
        .to(bubble3Ref.current, { opacity: 0 })
        .to(bubble4Ref.current, { opacity: 1 }, "<")
        .to(bubble4Ref.current, { opacity: 0 })

        .to({}, { duration: 2 })

        // Chaos hunde
        .fromTo(
          chaos1Ref.current,
          { opacity: 0, x: "-200%", y: "-200%" },
          { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
          "<"
        )
        .fromTo(
          chaos2Ref.current,
          { opacity: 0, x: "200%", y: "-200%" },
          { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
          "<"
        )
        .fromTo(
          chaos3Ref.current,
          { opacity: 0, x: "200%", y: "200%" },
          { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
          "<"
        )
        .fromTo(
          chaos4Ref.current,
          { opacity: 0, x: "-200%", y: "200%" },
          { opacity: 1, x: "0%", y: "0%", duration: 1.5 },
          "<"
        )

        // Stickers ind
        .fromTo(
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
        )

        // Shake
        .to(
          [sticker1Ref.current, sticker3Ref.current, sticker5Ref.current],
          {
            y: "-10%",
            yoyo: true,
            repeat: 8,
            duration: 0.05,
            stagger: 0.03,
          },
          "<"
        )
        .to(
          [sticker2Ref.current, sticker4Ref.current, sticker6Ref.current],
          {
            x: "8%",
            yoyo: true,
            repeat: 8,
            duration: 0.05,
            stagger: 0.03,
          },
          "<"
        )

        // Chaos væk
        .to(
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
        )

        // Calm text ind
        .to(calmTextTopRef.current, {
          opacity: 1,
          y: "-10%",
          duration: 1,
        })
        .to({}, { duration: 1 })
        .to(calmTextBottomRef.current, {
          opacity: 1,
          y: "10%",
          duration: 1,
        })

        // Calm text ud
        .to([calmTextTopRef.current, calmTextBottomRef.current], {
          opacity: 0,
          duration: 0.6,
        })

        // Zoom hunden (bevarede effekt)
        .to(dogCenterRef.current, {
          scale: 1.4,
          transformOrigin: "50% 50%",
          duration: 2,
        })

        // Sluttekster
        .fromTo(
          finalSmallRef.current,
          { opacity: 0, y: "-10%" },
          { opacity: 1, y: "0%", duration: 1.2 }
        )
        .fromTo(
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

          {/* ⭐ FIXED WRAPPER → stabil hund */}
          <div className={styles.dogCenterWrapper}>
            <img
              ref={dogCenterRef}
              src={dogBox}
              className={styles.dogCenter}
              alt=""
            />
          </div>

          {/* Bobler */}
          <img ref={bubble1Ref} src={bubble1} className={styles.bubble1} alt="" />
          <img ref={bubble2Ref} src={bubble2} className={styles.bubble2} alt="" />
          <img ref={bubble3Ref} src={bubble3} className={styles.bubble3} alt="" />
          <img ref={bubble4Ref} src={bubble4} className={styles.bubble4} alt="" />

          {/* Chaos */}
          <img ref={chaos1Ref} src={chaosDog1} className={styles.chaos1} alt="" />
          <img ref={chaos2Ref} src={chaosDog2} className={styles.chaos2} alt="" />
          <img ref={chaos3Ref} src={chaosDog3} className={styles.chaos3} alt="" />
          <img ref={chaos4Ref} src={chaosDog4} className={styles.chaos4} alt="" />

          {/* Stickers */}
          <img ref={sticker1Ref} src={chaosSticker1} className={styles.sticker1} alt="" />
          <img ref={sticker2Ref} src={chaosSticker2} className={styles.sticker2} alt="" />
          <img ref={sticker3Ref} src={chaosSticker1} className={styles.sticker3} alt="" />
          <img ref={sticker4Ref} src={chaosSticker2} className={styles.sticker4} alt="" />
          <img ref={sticker5Ref} src={chaosSticker1} className={styles.sticker5} alt="" />
          <img ref={sticker6Ref} src={chaosSticker1} className={styles.sticker6} alt="" />

          {/* Calm text */}
          <p ref={calmTextTopRef} className={styles.calmTextTop}>
            DET STRESSET MILJØ SÆTTER SIG OFTE I HUNDEN
          </p>
          <p ref={calmTextBottomRef} className={styles.calmTextBottom}>
            DERFOR SER MAN TIT AT HUNDENS ADFÆRD <br /> ÆNDRE SIG NÅR DEN KOMMER HJEM
          </p>

          {/* Sluttekster */}
          <p ref={finalBigRef} className={styles.finalBig}>
            SÅ HUSK AT HVER INTERNATHUND HAR SIN EGEN HISTORIE!
          </p>
        </div>
      </div>
    </section>
  );
}
