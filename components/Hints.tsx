import { Fragment } from "react";

export default function Hints(props: {
  firstLetter: string;
  length: number;
  isGameOver: boolean;
}) {
  return (
    <Fragment>
      {props.firstLetter && props.length && !props.isGameOver && (
        <div>
          <p>
            {`The word starts with ${props.firstLetter} and is ${props.length} letters long.`}
          </p>
        </div>
      )}
    </Fragment>
  );
}
