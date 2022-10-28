"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Guesses from "../components/Guesses";
import LiveGuess from "../components/LiveGuess";
import Hints from "../components/Hints";
import MobileKeyboard from "../components/MobileKeyboard";

const socket = io("wss://closele-backend.herokuapp.com");

const MAX_LENGTH = 8;
const SHORT_DELAY = 10;
const TOAST_CLOSE_DURATION = 2000;

interface Guess {
  guess: string;
  hint: string;
  similarity: number;
  newSimilarity: number;
  win: boolean;
}

interface Hint {
  guess: string;
  hint: string;
  similarity: number;
  newSimilarity: number;
  win: boolean;
  err: string;
  includes: string[];
  excludes: string[];
}

function App() {
  let GUESS = "";

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [liveGuess, setLiveGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [firstLetter, setFirstLetter] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const [includingKeys, setIncludingKeys] = useState<string[]>([]);
  const [excludingKeys, setExcludingKeys] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
    scrollToBottom();
  }

  useEffect(() => {
    window.onkeydown = (e) => {
      press(e.key);
      if (e.key === " ") e.preventDefault();
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {});
    }

    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollIntoViewRef = useRef<HTMLDivElement>(null);

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("info", (data: { firstLetter: string; length: number }) => {
      setFirstLetter(data.firstLetter);
      setLength(data.length);
    });

    socket.on("gameOver", (data: { secretWord: string }) => {
      setIsGameOver((go) => {
        if (!go) {
          toast.error(`You gave up! The secret word was ${data.secretWord}`);
          navigator.vibrate([300, 100, 300, 100, 300]);
          setGuesses((g) => [
            ...g,
            {
              guess: data.secretWord,
              hint: "",
              similarity: 1,
              newSimilarity: 1,
              win: true,
            },
          ]);
        }
        return true;
      });
      endGame();
    });

    socket.on("hint", (data: Hint) => {
      if (data.win === true) {
        toast.success(`Thats it! The word is ${data.guess}!`);
        navigator.vibrate([300, 100, 300, 100, 300]);
        endGame();
        setGuesses((g) => [
          ...g,
          {
            guess: data.guess,
            hint: data.hint,
            similarity: data.similarity,
            newSimilarity: data.newSimilarity,
            win: true,
          },
        ]);
      } else if (data.hint) {
        if (data.hint === "not in dict") {
          toast.warning("There is no such word in the dictionary!");
          navigator.vibrate([50, 20, 50]);
          const OG = data.guess;
          setTimeout(() => {
            setLiveGuess((lg) => (lg === OG ? "" : lg));
          }, 2000);
        } else if (data.hint === "error") {
          toast.error("Error: " + data.err);
          navigator.vibrate([50, 20, 50]);
        } else if (data.hint === "no word") {
          toast.warning("You must enter a word!");
          navigator.vibrate([50, 20, 50]);
        } else {
          toast.info(`Hint: ${data.hint}`);
          navigator.vibrate(200);
          setIncludingKeys(data.includes);
          setExcludingKeys(data.excludes);
          setGuesses((g) => [
            ...g,
            {
              guess: data.guess,
              hint: data.hint,
              similarity: data.similarity,
              newSimilarity: data.newSimilarity,
              win: false,
            },
          ]);
          scrollToBottom();
          setLiveGuess("");
        }
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("hint");
      socket.off("gameOver");
      socket.off("info");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onKeyPress(button: string) {
    if (button !== "{enter}") navigator.vibrate(10);
    press(
      button
        .replaceAll("{", "")
        .replaceAll("}", "")
        .replaceAll("bksp", "backspace")
    );
  }

  function press(key: string) {
    setLiveGuess((lg) => {
      let newLiveGuess = lg;
      if (key.toLowerCase() === "enter") guess();
      else if (key.toLowerCase() === "backspace")
        newLiveGuess = lg.slice(0, -1);
      else if (key.toLowerCase() === "delete") newLiveGuess = "";
      else if (
        key.length === 1 &&
        letters.includes(key.toLowerCase()) &&
        lg.length < MAX_LENGTH
      ) {
        newLiveGuess = `${lg}${key.toLowerCase()}`;
        scrollToBottom();
      }
      return newLiveGuess;
    });
  }

  function endGame() {
    setIsGameOver(true);
    socket.disconnect();
    scrollToBottom();
    setLiveGuess("");
  }

  function scrollToBottom() {
    setTimeout(() => {
      scrollIntoViewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, SHORT_DELAY);
  }

  function giveUp() {
    socket.emit("giveUp");
  }

  function guess() {
    if (isGameOver) return toast.error("The game is over!");
    setLiveGuess((lg) => {
      let newLiveGuess = lg;
      if (lg.match(/^\s*$/)) {
        newLiveGuess = "";
        toast.warning("You must enter a word!");
        navigator.vibrate([50, 20, 50]);
        return newLiveGuess;
      }
      newLiveGuess = lg.toLowerCase();
      GUESS = newLiveGuess;
      socket.emit("guess", GUESS);
      return newLiveGuess;
    });
  }

  return (
    <div id="game">
      <Guesses guesses={guesses} isMobile={isMobile} />
      <LiveGuess liveGuess={liveGuess} />
      <ToastContainer
        theme="dark"
        pauseOnHover={true}
        autoClose={TOAST_CLOSE_DURATION}
        style={{ userSelect: "none" }}
      />
      {liveGuess.length === 0 && guesses.length === 0 && (
        <Link href="/instructions">
          <button className="MiddleButton" style={{ color: "white" }}>
            Instructions
          </button>
        </Link>
      )}
      <Hints
        firstLetter={firstLetter}
        length={length}
        isGameOver={isGameOver}
      />
      <MobileKeyboard
        onKeyPress={onKeyPress}
        isMobile={isMobile}
        isGameOver={isGameOver}
        includingKeys={includingKeys}
        excludingKeys={excludingKeys}
      />
      {!isMobile && (
        <div
          style={{
            backgroundColor: isConnected ? "green" : "red",
            position: "fixed",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            bottom: 30,
            right: 30,
          }}
        />
      )}
      {!isGameOver && guesses.length > 0 && (
        <button className="TopLeftButton" onClick={giveUp}>
          {"Give up"}
        </button>
      )}
      {isGameOver && (
        <button
          className="TopLeftButton"
          onClick={() => window.location.reload()}
        >
          {"Play again"}
        </button>
      )}
      <div ref={scrollIntoViewRef} />
    </div>
  );
}

export default App;
