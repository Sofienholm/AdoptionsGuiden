// -- STORYTELLING · STEP 3 --
// Tredje del af storytelling-flowet
// Handler om match: behov > udseende, og hvorfor internatet vurderer

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// SVG’er bruges fordi alt her er animation og præcis placering
import overskrift1 from "./frames/overskrift.svg";
import forsideHund from "./frames/forsidehund.svg";
import dogOldImg from "./frames/dog-old.svg";
import dogActiveImg from "./frames/dog-active.svg";
import dogShyImg from "./frames/dog-shy.svg";
import handIllustration from "./frames/hands.svg";
import mandOgHund from "./frames/mand-og-hund.svg";
import kryds from "./frames/kryds.svg";

// CSS Modules fungerer som fast “scene”
import styles from "./step3.module.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Fast design-størrelse som hele scenen skaleres ud fra
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function Step3() {
  // Overordnet section (pin + scroll)
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Scene 1
  const overskrift1Ref = useRef(null);
  const forsideHundRef = useRef(null);
  const brodtekst1Ref = useRef(null);

  // Scene 2
  const overskrift2Ref = useRef(null);
  const dogOldRef = useRef(null);
  const dogActiveRef = useRef(null);
  const dogShyRef = useRef(null);
  const overlayContentRef = useRef(null);

  // Scene 3
  const scene3Ref = useRef(null);
  const mandOgHundRef = useRef(null);
  const overskrift3Ref = useRef(null);
  const brodtekst3Ref = useRef(null);

  // Scribbles + dots (match-linjer)
  const scribble1Ref = useRef(null);
  const scribble2Ref = useRef(null);
  const scribble3Ref = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);

  // Scene 4
  const krydsRef = useRef(null);
  const overskrift4Ref = useRef(null);
  const brodtekst4Ref = useRef(null);

  useEffect(() => {
    // GSAP context så det cleaner rigtigt op
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

      // SCENE 1 – intro
      tl.from(overskrift1Ref.current, { opacity: 0, y: -50, duration: 1 });
      tl.from(forsideHundRef.current, { opacity: 0, y: 50, duration: 1 }, "+=0.2");
      tl.from(brodtekst1Ref.current, { opacity: 0, y: 30, duration: 1 }, "+=0.2");

      tl.to([overskrift1Ref.current, forsideHundRef.current, brodtekst1Ref.current],
        { opacity: 0, duration: 1 });

      // SCENE 2 – behov før udseende
      tl.fromTo(
        overskrift2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );

      const dogs = [dogOldRef.current, dogActiveRef.current, dogShyRef.current];

      tl.from(dogs,
        { y: "120%", opacity: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 });

      tl.to([dogOldRef.current, dogActiveRef.current, dogShyRef.current, overskrift2Ref.current],
        { opacity: 0, duration: 0.5 });

      tl.to(overlayContentRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, "<");

      tl.to([dogOldRef.current, dogActiveRef.current, dogShyRef.current, overskrift2Ref.current, overlayContentRef.current],
        { y: -1300, opacity: 0, duration: 1, ease: "power2.out" });

      // SCENE 3 – match-princippet
      tl.from(mandOgHundRef.current,
        { opacity: 0, y: 40, duration: 1, ease: "power2.out" });

      gsap.set([scribble1Ref.current, scribble2Ref.current, scribble3Ref.current],
        { drawSVG: "0% 0%" });
      gsap.set([dot1Ref.current, dot2Ref.current, dot3Ref.current],
        { opacity: 0 });

      tl.to(dot1Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot1Ref.current, { scale: 1 }, "<");
      tl.to(scribble1Ref.current, { drawSVG: "0% 100%", duration: 1, ease: "power2.out" });
      tl.from(overskrift3Ref.current, { opacity: 0, y: 30, duration: 1, ease: "power2.out" }, "<");

      tl.to(dot2Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot2Ref.current, { scale: 1 }, "<");
      tl.to(scribble2Ref.current, { drawSVG: "100% 0%", duration: 1, ease: "power2.out" }, "<");
      tl.from(brodtekst3Ref.current,  { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.6");

      tl.to(dot3Ref.current, { opacity: 1, scale: 1.2, duration: 0.3 });
      tl.to(dot3Ref.current, { scale: 1 }, "<");
      tl.to(scribble3Ref.current, { drawSVG: "0% 100%", duration: 1, ease: "power2.out" }, "<");

      tl.to([mandOgHundRef.current, overskrift3Ref.current, brodtekst3Ref.current,
        dot1Ref.current, dot2Ref.current, dot3Ref.current,
        scribble1Ref.current, scribble2Ref.current, scribble3Ref.current],
        { x: -5000, duration: 2 });

      // SCENE 4 – afslag
      tl.from(krydsRef.current,
        { opacity: 0, scale: 5.5, rotate: 90, duration: 3, ease: "back.out(1.7)" });

      tl.from(overskrift4Ref.current,
        { opacity: 0, y: 50, duration: 1, ease: "power2.out" });

      tl.from(brodtekst4Ref.current,
        { opacity: 0, y: 30, duration: 1, ease: "power2.out" }, "-=0.5");

      tl.to([krydsRef.current, overskrift4Ref.current, brodtekst4Ref.current],
        { opacity: 0, duration: 3 });
    }, sectionRef);

    // Simpel responsiv skalering af hele canvas
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
          <img src={overskrift1} ref={overskrift1Ref} alt="" className={styles.headline} />
          <img src={forsideHund} ref={forsideHundRef} alt="" className={styles.dog} />
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
            <div className={`${styles.dogBox} ${styles.dogOld}`} ref={dogOldRef}>
              <img src={dogOldImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER ÆLDRE</p>
              <div className={styles.overlay}>Kræver stabile rammer</div>
            </div>

            <div className={`${styles.dogBox} ${styles.dogActive}`} ref={dogActiveRef}>
              <img src={dogActiveImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER AKTIVE</p>
              <div className={styles.overlay}>Kræver roligt hjem og tålmodighed</div>
            </div>

            <div className={`${styles.dogBox} ${styles.dogShy}`} ref={dogShyRef}>
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
            <img src={handIllustration} alt="" className={styles.overlayIllustration} />
          </div>
        </div>

        {/* SCENE 3 */}
        <div className={styles.scene3} ref={scene3Ref}>
          <div className={styles.tekst3}>
            <h1 ref={overskrift3Ref} className={styles.overskrift3}>
              Internatet vurderer her ud fra match
            </h1>
            <p ref={brodtekst3Ref} className={styles.brodtekst3}>
              Ikke først til mølle!
            </p>
          </div>

          <div className={styles.mandOgHund}>
            <img src={mandOgHund} ref={mandOgHundRef} alt="" className={styles.overlayIllustration} />
          </div>

          <div className={styles.scribbleLines}>
            {/* LINE 1 */}
            <div className={styles.lineWrapper}>
              <div ref={dot1Ref} className={styles.dot}></div>
              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path ref={scribble1Ref} className="scribble" d="M.36,18.53c20.62,21.23,25.54,17.72,45.52-4.14..." fill="none" />
              </svg>
            </div>

            {/* LINE 2 */}
            <div className={styles.lineWrapper}>
              <div ref={dot2Ref} className={styles.dot}></div>
              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path ref={scribble2Ref} className="scribble" d="M0.49,4.35 C3.47,21.67..." fill="none" />
              </svg>
            </div>

            {/* LINE 3 */}
            <div className={styles.lineWrapper}>
              <div ref={dot3Ref} className={styles.dot}></div>
              <svg className={styles.scribbleSvg} viewBox="0 0 400 80">
                <path ref={scribble3Ref} className="scribble" d="M.36,15.16c9.6,10.13..." fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* SCENE 4 */}
        <div className={styles.scene4}>
          <div className={styles.scene4Indhold}>
            <h1 ref={overskrift4Ref} className={styles.overskrift4}>
              ET AFSLAG ER FOR HUNDENS SKYLD
            </h1>
            <p ref={brodtekst4Ref} className={styles.brodtekst4}>
              IKKE EN VURDERING AF DIG!
            </p>
          </div>
          <img src={kryds} ref={krydsRef} alt="" className={styles.kryds} />
        </div>
      </div>
    </section>
  );
}
