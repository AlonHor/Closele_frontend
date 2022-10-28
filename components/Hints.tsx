import { Fragment } from "react";

export default function Hints(props: { firstLetter: string, length: number, isGameOver: boolean, hintLetters: string[] }) {
  return (
    <Fragment>
      {
        props.firstLetter && props.length && !props.isGameOver && (
          <div>
            <p>
              {`The word starts with ${props.firstLetter} and is ${props.length} letters long.`}
            </p>
            {props.hintLetters.length > 0 && (
              <p>
                {'The word contains the letter(s) '}
                {props.hintLetters.map((hintLetter: string, index: number) => (
                  <span key={index} className="Letter">
                    {hintLetter}
                    {index === props.hintLetters.length - 1 ? '' : ', '}
                  </span>
                ))}
              </p>
            )}
          </div>
        )
      }
    </Fragment>
  )
}
