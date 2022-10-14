import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('wss://closele-backend.herokuapp.com');

type guess = {
  guess: string;
  hint: string;
  similarity: number;
  newSimilarity: number;
  win: boolean;
};

function App() {
  let GUESS = '';

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [liveGuess, setLiveGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<guess[]>([]);
  const [firstLetter, setFirstLetter] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [hintLetters, setHintLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const scrollIntoViewRef = useRef<HTMLDivElement>(null);
  const focusInputRef = useRef<HTMLInputElement>(null);

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    focusInputRef.current?.focus();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('info', (data: { firstLetter: string; length: number }) => {
      setFirstLetter(data.firstLetter);
      setLength(data.length);
    });

    socket.on('gameOver', (data: { secretWord: string }) => {
      setGameOver((go) => {
        if (!go) {
          toast.error(`You gave up! The secret word was ${data.secretWord}`);
          setGuesses((g) => [
            ...g,
            {
              guess: data.secretWord,
              hint: '',
              similarity: 1,
              newSimilarity: 1,
              win: true,
            },
          ]);
        }
        return true;
      });
      socket.disconnect();
      scrollToBottom();
      setLiveGuess('');
    });

    socket.on('hint', (data: any) => {
      if (data.win === true) {
        toast.success(`Thats it! The word is ${data.guess}!`);
        setGameOver(true);
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
        socket.disconnect();
        scrollToBottom();
        setLiveGuess('');
      } else if (data.hint) {
        if (data.hint === 'not in dict') {
          toast.warning('There is no such word in the dictionary!');
        } else if (data.hint === 'error') {
          toast.error('Error: ' + data.err);
        } else if (data.hint === 'no word') {
          toast.warning('You must enter a word!');
        } else {
          toast.info(`Hint: ${data.hint}`);
          setHintLetters(data.letters);
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
          setLiveGuess('');
        }
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('hint');
      socket.off('gameOver');
      socket.off('info');
    };
  }, []);

  window.onkeydown = (e) => {
    if (e.key === ' ') e.preventDefault();
    if (e.key === 'Enter') guess();
    else if (e.key === 'Backspace') setLiveGuess((lg) => lg.slice(0, -1));
    else if (e.key === 'Delete') setLiveGuess('');
    else if (
      e.key.length === 1 &&
      letters.includes(e.key.toLowerCase()) &&
      liveGuess.length < 8
    ) {
      setLiveGuess((lg) => lg + e.key.toLowerCase());
      scrollToBottom();
    }
  };

  window.onblur = () => {
    focusInputRef.current?.focus();
  };

  function scrollToBottom() {
    setTimeout(() => {
      scrollIntoViewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  function giveUp() {
    socket.emit('giveUp');
  }

  function guess() {
    if (gameOver) return;
    if (liveGuess.match(/^\s*$/)) {
      setLiveGuess('');
      toast.warning('You must enter a word!');
      return;
    }
    setLiveGuess((lg) => lg.toLowerCase());
    GUESS = liveGuess.toLowerCase();
    socket.emit('guess', GUESS);
  }

  return (
    <>
      <div className="Guesses">
        {guesses.map((guess, index) => (
          <div key={index}>
            <span className="Guess">{guess.guess}</span>
            {!guess.win && (
              <span className="Hint">
                {guess.hint === "You're very close!" ? 'no hint' : guess.hint}
              </span>
            )}
            <span
              className={`${
                guess.win ? 'Similarity__Win' : 'Similarity__Full'
              }`}
              style={{ width: `${460}px` }}
            >
              {!guess.win ? (
                <>
                  {guess.hint !== "You're very close!" && (
                    <>
                      <span
                        className="Similarity__New"
                        style={{ width: `${guess.newSimilarity * 460}px` }}
                      ></span>
                      <span
                        className="Similarity__Inside"
                        style={{ width: `${guess.similarity * 460}px` }}
                      ></span>
                    </>
                  )}
                </>
              ) : (
                <div></div>
              )}
            </span>
          </div>
        ))}
      </div>
      <div>
        {liveGuess.split('').map((char, index) => (
          <span key={index} className="Char">
            {char}
          </span>
        ))}
      </div>
      <ToastContainer theme="dark" pauseOnHover={true} autoClose={2000} />
      {liveGuess.length === 0 && guesses.length === 0 && (
        <div className="Instructions">
          <h1>Guess the word!</h1>
          <p>Enter a word and press enter to guess.</p>
          <p>Press delete to clear the word.</p>
          <p>A hint will be given if the word is not correct.</p>
          <p>
            The blue bar shows how close the guessed word is to the correct
            word.
          </p>
          <p>The green bar shows how close the hint is to the correct word.</p>
        </div>
      )}
      {firstLetter && length && !gameOver && (
        <div>
          <p>
            The word starts with {firstLetter} and is {length} letters long.
          </p>
          {hintLetters.length > 0 && (
            <p>
              The word contains the letter(s){' '}
              {hintLetters.map((letter, index) => (
                <span key={index}>
                  {letter}
                  {index === hintLetters.length - 1 ? '' : ', '}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
      <p>Socket is {isConnected ? 'connected' : 'disconnected'}.</p>
      {!gameOver && guesses.length > 0 && (
        <button className="GiveUp" onClick={giveUp}>
          Give up
        </button>
      )}
      <div ref={scrollIntoViewRef}></div>
      <input style={{opacity: 0}} ref={focusInputRef} />
    </>
  );
}

export default App;
