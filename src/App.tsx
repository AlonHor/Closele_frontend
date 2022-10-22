import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from 'gsap';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const socket = io('wss://closele-backend.herokuapp.com');

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
  letters: string[];
}

function App() {
  let GUESS = '';

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [liveGuess, setLiveGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [firstLetter, setFirstLetter] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [hintLetters, setHintLetters] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    handleWindowSizeChange();
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollIntoViewRef = useRef<HTMLDivElement>(null);

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
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
      setIsGameOver((go) => {
        if (!go) {
          toast.error(`You gave up! The secret word was ${data.secretWord}`);
          navigator.vibrate([300, 100, 300, 100, 300]);
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
      endGame();
    });

    socket.on('hint', (data: Hint) => {
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
        if (data.hint === 'not in dict') {
          toast.warning('There is no such word in the dictionary!');
          navigator.vibrate([50, 20, 50]);
        } else if (data.hint === 'error') {
          toast.error('Error: ' + data.err);
          navigator.vibrate([50, 20, 50]);
        } else if (data.hint === 'no word') {
          toast.warning('You must enter a word!');
          navigator.vibrate([50, 20, 50]);
        } else {
          toast.info(`Hint: ${data.hint}`);
          navigator.vibrate(200);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onKeyPress(button: string) {
    if (button !== '{enter}') navigator.vibrate(50);
    press(button.replaceAll('{', '').replaceAll('}', '').replaceAll('bksp', 'backspace'))
  }

  function press(key: string) {
    if (key.toLowerCase() === 'enter') guess();
    else if (key.toLowerCase() === 'backspace') setLiveGuess((lg) => lg.slice(0, -1));
    else if (key.toLowerCase() === 'delete') setLiveGuess('');
    else if (
      key.length === 1 &&
      letters.includes(key.toLowerCase()) &&
      liveGuess.length < MAX_LENGTH
    ) {
      // setLiveGuess(lg => lg.toLowerCase());
      setLiveGuess((lg) => {
        const LG = lg;
        setTimeout(() => {
          gsap.from(`.Char__${LG.length}`, {
            opacity: 0,
            x: 'random(-50, 50, 5)',
            y: 'random(-50, 50, 5)',
            z: 'random(-50, 50, 5)',
            duration: 0.1,
          });
          setTimeout(() => {
            const elements: any = document.getElementsByClassName(`Char__${LG.length}`);
            elements[0].style.transform = 'translate(0px)';
          }, 101)
        }, SHORT_DELAY);
        return lg + key.toLowerCase();
      });
      scrollToBottom();
    }
  }

  window.onkeydown = (e) => {
    press(e.key);
    if (e.key === ' ') e.preventDefault();
  };

  function endGame() {
    setIsGameOver(true);
    socket.disconnect();
    scrollToBottom();
    setLiveGuess('');
  }

  function scrollToBottom() {
    setTimeout(() => {
      scrollIntoViewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, SHORT_DELAY);
  }

  function giveUp() {
    socket.emit('giveUp');
  }

  function guess() {
    if (isGameOver) return toast.error('The game is over!');
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
        {guesses.map((guessObj, index) => (
          <div key={index}>
            <span className={`Guess`}>{guessObj.guess}</span>
            {!guessObj.win && (
              <span className={`Hint`}>
                {guessObj.hint === "You're very close!"
                  ? 'no hint'
                  : guessObj.hint}
              </span>
            )}
            <span
              className={guessObj.win ? 'Similarity__Win' : 'Similarity__Full'}
              style={{ width: `${isMobile ? 230 : 460}px` }}
            >
              {!guessObj.win && (
                <>
                  {guessObj.hint !== "You're very close!" && (
                    <span
                      className={'Similarity__New'}
                      style={{ width: `${guessObj.newSimilarity * (isMobile ? 230 : 460)}px` }}
                    />
                  )}
                  <span
                    className={'Similarity__Inside'}
                    style={{ width: `${guessObj.similarity * (isMobile ? 230 : 460)}px` }}
                  />
                </>
              )}
            </span>
          </div>
        ))}
      </div>
      <div>
        {liveGuess.split('').map((character: string, index) => (
          <span key={index} className={`Char Char__${index}`} style={{
            width: `calc(${100 / liveGuess.length}vw - 4.4rem)`
          }}>
            {character}
          </span>
        ))}
      </div>
      <ToastContainer
        theme="dark"
        pauseOnHover={true}
        autoClose={TOAST_CLOSE_DURATION}
        style={{ userSelect: 'none' }}
      />
      {liveGuess.length === 0 && guesses.length === 0 && (
        <div className="Instructions">
          <h1>{'Guess the word!'}</h1>
          <p>
            {'Instructions can be found '}<a href="https://bit.ly/3TqIDrK" target="_blank">here</a>
          </p>
        </div>
      )}
      {firstLetter && length && !isGameOver && (
        <div>
          <p>
            {`The word starts with ${firstLetter} and is ${length} letters long.`}
          </p>
          {hintLetters.length > 0 && (
            <p>
              {'The word contains the letter(s) '}
              {hintLetters.map((hintLetter: string, index) => (
                <span key={index} className="Letter">
                  {hintLetter}
                  {index === hintLetters.length - 1 ? '' : ', '}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
      {isMobile && !isGameOver && (<>
        <Keyboard
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "q w e r t y u i o p {bksp}",
              "a s d f g h j k l {enter}",
              "z x c v b n m {delete}",
            ],
          }}
        />
        <div style={{ paddingTop: '260px' }} />
      </>)}
      {!isMobile && (
        <div style={{ backgroundColor: (isConnected ? 'green' : 'red'), position: 'fixed', padding: '0.5rem', borderRadius: '0.25rem', bottom: 30, right: 30 }} />
      )}
      {!isGameOver && guesses.length > 0 && (
        <button className="TopLeftButton" onClick={giveUp}>
          {'Give up'}
        </button>
      )}
      {isGameOver && (
        <button className="TopLeftButton" onClick={() => window.location.reload()}>
          {'Play again'}
        </button>
      )}
      <div ref={scrollIntoViewRef} />
    </>
  );
}

export default App;
