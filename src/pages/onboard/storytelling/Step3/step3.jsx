// src/pages/onboard/storytelling/Step3/step3.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import overskrift1 from "./frames/overskrift.svg";
import forsideHund from "./frames/forsidehund.svg";
import dogOldImg from "./frames/dog-old.svg";
import dogActiveImg from "./frames/dog-active.svg";
import dogShyImg from "./frames/dog-shy.svg";
import handIllustration from "./frames/hands.svg";
import mandOgHund from "./frames/mand-og-hund.svg";
import kryds from "./frames/kryds.svg";

import styles from "./step3.module.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Vores faste design-størrelse (som et "canvas")
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function Step1() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const overskrift1Ref = useRef(null);
  const forsideHundRef = useRef(null);
  const brodtekst1Ref = useRef(null);

  const overskrift2Ref = useRef(null);
  const dogOldRef = useRef(null);
  const dogActiveRef = useRef(null);
  const dogShyRef = useRef(null);
  const overlayContentRef = useRef(null);

  const scene3Ref = useRef(null);
  const mandOgHundRef = useRef(null);
  const overskrift3Ref = useRef(null);
  const brodtekst3Ref = useRef(null);

  const scribble1Ref = useRef(null);
  const scribble2Ref = useRef(null);
  const scribble3Ref = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);

  const krydsRef = useRef(null);
  const overskrift4Ref = useRef(null);
  const brodtekst4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=11000",
          scrub: 1,
          pin: true,
        },
      });

      // --- SCENE 1 – intro ---
      tl.from(overskrift1Ref.current, {
        opacity: 0,
        y: -50,
        duration: 1,
      });

      tl.from(
        forsideHundRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        "+=0.2"
      );

      tl.from(
        brodtekst1Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
        },
        "+=0.2"
      );

      // Scene 1 fade ud
      tl.to(
        [overskrift1Ref.current, forsideHundRef.current, brodtekst1Ref.current],
        {
          opacity: 0,
          duration: 1,
        }
      );

      // --- SCENE 2 – hunde + overlay ---
      tl.fromTo(
        overskrift2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );

      const dogs = [dogOldRef.current, dogActiveRef.current, dogShyRef.current];

      // Hunde glider IND nedefra
      tl.from(dogs, {
        y: "120%",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Hunde + overskrift nedtones
      tl.to([dogs, overskrift2Ref.current], {
        opacity: 0.05,
        duration: 0.5,
      });

      // Overlay (tekst + hænder) ind
      tl.to(
        overlayContentRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Alt i scene 2 glides op og FADES HELT UD (inkl. hånd-illustration)
      tl.to(
        [
          dogOldRef.current,
          dogActiveRef.current,
          dogShyRef.current,
          overskrift2Ref.current,
          overlayContentRef.current,
        ],
        {
          y: -1300,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      // --- SCENE 3 START ---
      tl.from(mandOgHundRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      // Start: alle scribbles er usynlige
      gsap.set(
        [scribble1Ref.current, scribble2Ref.current, scribble3Ref.current],
        {
          drawSVG: "0% 0%",
        }
      );
      gsap.set([dot1Ref.current, dot2Ref.current, dot3Ref.current], {
        opacity: 0,
      });

      // Dot + scribble 1
      tl.to(dot1Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot1Ref.current, { scale: 1 }, "<");

      tl.to(scribble1Ref.current, {
        drawSVG: "0% 100%",
        duration: 1,
        ease: "power2.out",
      });

      // Overskrift ind (match-linjen)
      tl.from(
        overskrift3Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Dot + scribble 2
      tl.to(dot2Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot2Ref.current, { scale: 1 }, "<");

      tl.to(
        scribble2Ref.current,
        {
          drawSVG: "100% 0%",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Brødtekst ind (ikke først til mølle)
      tl.from(
        brodtekst3Ref.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Dot + scribble 3
      tl.to(dot3Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot3Ref.current, { scale: 1 }, "<");

      tl.to(
        scribble3Ref.current,
        {
          drawSVG: "0% 100%",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Scene 3 flyves ud til venstre
      tl.to(
        [
          mandOgHundRef.current,
          overskrift3Ref.current,
          brodtekst3Ref.current,
          dot3Ref.current,
          dot2Ref.current,
          dot1Ref.current,
          scribble3Ref.current,
          scribble2Ref.current,
          scribble1Ref.current,
        ],
        {
          x: -5000,
          duration: 2,
        }
      );

      // --- SCENE 4 ---
      tl.from(krydsRef.current, {
        opacity: 0,
        scale: 5.5,
        rotate: 90,
        duration: 3,
        ease: "back.out(1.7)",
      });

      tl.from(overskrift4Ref.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        brodtekst4Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      tl.to(
        [krydsRef.current, overskrift4Ref.current, brodtekst4Ref.current],
        {
          opacity: 0,
          duration: 3,
        }
      );
    }, sectionRef);

    // --- Skalering af canvas ---
    const updateScale = () => {
      if (!canvasRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const scale = Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT);

      canvasRef.current.style.transform = `scale(${scale})`;
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={canvasRef} className={styles.canvas}>
        {/* SCENE 1 */}
        <div className={styles.scene1}>
          <img
            src={overskrift1}
            ref={overskrift1Ref}
            alt=""
            className={styles.headline}
          />
          <img
            src={forsideHund}
            ref={forsideHundRef}
            alt=""
            className={styles.dog}
          />
          <p className={styles.brodtekst} ref={brodtekst1Ref}>
            Så husk det handler om andet end udseendet!
          </p>
        </div>

        {/* SCENE 2 */}
        <div className={styles.scene2}>
          <h1 ref={overskrift2Ref} className={styles.scene2headline}>
            HUNDE HAR FORSKELLIGE <br /> <span>BEHOV</span>
          </h1>

          <div className={styles.dogRow}>
            {/* Ældre hund */}
            <div
              className={`${styles.dogBox} ${styles.dogOld}`}
              ref={dogOldRef}
            >
              <img src={dogOldImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER ÆLDRE</p>
              <div className={styles.overlay}>Kræver stabile rammer</div>
            </div>

            {/* Aktiv hund */}
            <div
              className={`${styles.dogBox} ${styles.dogActive}`}
              ref={dogActiveRef}
            >
              <img src={dogActiveImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER AKTIVE</p>
              <div className={styles.overlay}>
                Kræver roligt hjem og tålmodighed
              </div>
            </div>

            {/* Usikker hund */}
            <div
              className={`${styles.dogBox} ${styles.dogShy}`}
              ref={dogShyRef}
            >
              <img src={dogShyImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER USIKRE</p>
              <div className={styles.overlay}>Kræver erfaring</div>
            </div>
          </div>

          <div className={styles.overlayContent} ref={overlayContentRef}>
            <p className={styles.overlayText}>
              FOR AT SIKRE AT DISSE BEHOV BLIVER SET
              <br />
              LIGGER DU TILLIDEN I INTERNATETS HÆNDER
            </p>

            <img
              src={handIllustration}
              alt=""
              className={styles.overlayIllustration}
            />
          </div>
        </div>

        {/* SCENE 3 */}
        <div className={styles.scene3} ref={scene3Ref}>
          <div className={styles.tekst3}>
            <h1 ref={overskrift3Ref} className={styles.overskrift3}>
              Internatet vurderer ud fra match.
            </h1>
            <p ref={brodtekst3Ref} className={styles.brodtekst3}>
              Ikke først til mølle!
            </p>
          </div>

          <div className={styles.mandOgHund}>
            <img
              src={mandOgHund}
              ref={mandOgHundRef}
              alt=""
              className={styles.overlayIllustration}
            />
          </div>

          <div className={styles.scribbleLines}>
            {/* LINE 1 */}
            <div className={styles.lineWrapper}>
              <div ref={dot1Ref} className={styles.dot}></div>

              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path
                  ref={scribble1Ref}
                  className="scribble"
                  d="M.36,18.53c20.62,21.23,25.54,17.72,45.52-4.14,6,33.9,61.93,16.23,63.8-12.5,14.47,29.14,59.12,36.13,83.01,13,2.04,10.45,12.03,19.04,23.3,20.04s48.37-10.45,52.5-20.35c16.7,19.28,81.55-27.81,72.69-4.34-13.58,36,44.82.6,62.51,12.08,26.84,17.42,20.36-32.52,62.9-3.88"
                  fill="none"
                  stroke="#3c473c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* LINE 2 */}
            <div className={styles.lineWrapper}>
              <div ref={dot2Ref} className={styles.dot}></div>

              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path
                  ref={scribble2Ref}
                  className="scribble"
                  d="M0.49,4.35 C3.47,21.67 17.57,36.54 33.03,40.11 c17.14,3.89 36.29-3.43 46.46-17.76 c15.9,12.49 39.5,4.4 55.51-7.95 c17.84,17.35 51.24,23.9 67.25,4.85 c3.7,9.96 14.15,16.19 25.04,15.98 s20.13-9.29 22.22-19.71 c10.77,10.95 27.12,22.82 42.3,20.52 c15.19-2.3 28.82-18.72 35.86-32.37 c2.54,17.12 18.46,31.26 35.77,31.76 c11.25.33 24.11-7.14 23.91-18.39 c9.12,10.57 22.77,17.08 36.72,17.52 c13.95.44 45.62-24.48 37.75-34.58"
                  fill="none"
                  stroke="#3c473c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* LINE 3 */}
            <div className={styles.lineWrapper}>
              <div ref={dot3Ref} className={styles.dot}></div>

              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path
                  ref={scribble3Ref}
                  className="scribble"
                  d="M.36,15.16c9.6,10.13,23.54,16,37.5,15.79,13.96-.21,27.71-6.51,37-16.93-.38,11.25,12.36,18.92,23.61,18.77,17.31-.22,33.46-14.1,36.28-31.19,6.82,13.76,20.49,23.9,35.63,26.45,15.14,2.55,31.38-2.57,42.32-13.34,1.93,10.45,11.32,19.06,21.9,20.06s21.43-5.67,25.29-15.57c15.7,19.3,48.27,21.46,66.38,4.4,15.8,12.61,40.22,12.9,56.32.67,9.94,14.49,28.97,22.12,46.17,18.5s31.54-18.27,34.79-35.54"
                  fill="none"
                  stroke="#3c473c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* SCENE 4 */}
        <div className={styles.scene4}>
          <div className={styles.scene4Indhold}>
            <h1 ref={overskrift4Ref} className={styles.overskrift4}>
              ET AFSLAG ER FOR HUNDENS SKYND
            </h1>
            <p ref={brodtekst4Ref} className={styles.brodtekst4}>
              IKKE EN VUDERING AF DIG!
            </p>
          </div>
          <img src={kryds} ref={krydsRef} alt="" className={styles.kryds} />
        </div>
      </div>
    </section>
  );
}
