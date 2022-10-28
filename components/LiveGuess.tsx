import { Fragment } from "react";

export default function LiveGuess(props: { liveGuess: any }) {
  return (
    <Fragment>
      {props.liveGuess.split("").map((character: string, index: number) => (
        <span
          key={index}
          className={`Char Char__${index}`}
          style={{
            width: `calc(${100 / props.liveGuess.length}vw - 4.4rem)`,
          }}
        >
          {character}
        </span>
      ))}
    </Fragment>
  );
}
