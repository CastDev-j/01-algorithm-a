import { cn } from "@/lib/cn";
import { flushSync } from "react-dom";
import { useRef, useState } from "react";
import { random } from "@/lib/random";
import Button from "./shared/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/all";

interface Letter {
  id: string;
  position: number;
  initialPosition: number;
  letter: string;
}

interface generateLettersProps {
  repeat: number;
  alphabet: string[];
}

const generateLetters = ({ repeat, alphabet }: generateLettersProps) => {
  const letters: Letter[] = [];

  alphabet.forEach((char, charIndex) => {
    for (let i = 0; i < repeat; i++) {
      letters.push({
        id: `${char}${charIndex}-${i + 1}`,
        position: letters.length,
        initialPosition: letters.length,
        letter: char,
      });
    }
  });

  return letters;
};

const AlgorithmA = () => {
  const containerRef = useRef<HTMLElement>(null!);
  const [alphabet, setAlphabet] = useState("ABC".split(""));
  const [repeat, setRepeat] = useState(3);
  const [letters, setLetters] = useState(
    generateLetters({ repeat: repeat, alphabet: alphabet }),
  );

  useGSAP(
    () => {
      gsap.registerPlugin(Flip);
    },
    { scope: containerRef },
  );

  const shuffleLetters = () => {
    const state = Flip.getState(".letter-box");

    flushSync(() => {
      setLetters((prev) => {
        const shuffled = [...prev].sort(() => random() - 0.5);
        return shuffled.map((item, index) => ({
          ...item,
          position: index,
        }));
      });
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.01,
    });
  };

  const orderLetters = () => {
    const state = Flip.getState(".letter-box");

    flushSync(() => {
      setLetters((prev) => {
        const ordered = [...prev].sort(
          (a, b) => a.initialPosition - b.initialPosition,
        );
        return ordered.map((item, index) => ({
          ...item,
          position: index,
        }));
      });
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.01,
    });
  };

  const changeAlphabet = (newAlphabet: string[]) => {
    const state = Flip.getState(".letter-box");
    const containerAState = Flip.getState(containerRef.current);

    flushSync(() => {
      setAlphabet(newAlphabet);
      setLetters(generateLetters({ repeat, alphabet: newAlphabet }));
    });

    Flip.from(containerAState, {
      duration: 0.5,
      delay: 0.1,
      ease: "power1.inOut",
      simple: true,
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.05,
      overwrite: "auto",
    });
  };

  const changeRepeat = (newRepeat: number) => {
    const containerAState = Flip.getState(containerRef.current);

    const state = Flip.getState(".letter-box");
    const minRepeat = 1;
    const maxRepeat = 10;
    newRepeat = Math.max(minRepeat, Math.min(maxRepeat, newRepeat));

    flushSync(() => {
      setRepeat(newRepeat);
      setLetters(generateLetters({ repeat: newRepeat, alphabet }));
    });

    Flip.from(containerAState, {
      duration: 0.5,
      delay: 0.1,
      ease: "power1.inOut",
      simple: true,
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.05,
      overwrite: "auto",
    });
  };
  return (
    <section
      className="flex flex-col sm:gap-4 gap-6 bg-neutral-800 p-4 rounded-sm"
      ref={containerRef}
    >
      <h1 className="sm:text-3xl text-2xl font-bold text-center">
        Algoritmo A
      </h1>

      <article className="w-full flex justify-center gap-4 flex-wrap">
        <label className="flex items-center gap-2">
          <span className="text-neutral-50">Alfabeto:</span>
          <input
            type="text"
            value={alphabet.join("")}
            onChange={(e) => changeAlphabet(e.target.value.split(""))}
            className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-20"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-neutral-50">Repeticiones:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => changeRepeat(repeat - 1)}
              disabled={repeat <= 1}
            >
              -
            </Button>
            {repeat}

            <Button
              variant="ghost"
              onClick={() => changeRepeat(repeat + 1)}
              disabled={repeat >= 10}
            >
              +
            </Button>
          </div>
        </label>
      </article>

      <article className="w-full flex flex-wrap justify-center gap-4 bg-neutral-900 p-4 rounded-md overflow-hidden">
        {letters
          .sort((a, b) => a.position - b.position)
          .map(({ id, letter }) => (
            <div
              key={id}
              data-id={id}
              className={cn("flex items-center justify-center letter-box")}
            >
              <p className={cn("text-neutral-50 rounded-sm px-4 py-2")}>
                {letter}
              </p>
            </div>
          ))}
      </article>

      <article className="w-full flex justify-center gap-4 flex-wrap">
        <Button onClick={shuffleLetters} variant="primary">
          {" "}
          Mezclar Letras
        </Button>
        <Button variant="ghost" onClick={orderLetters}>
          Ordenar Letras
        </Button>
      </article>
    </section>
  );
};

export default AlgorithmA;
