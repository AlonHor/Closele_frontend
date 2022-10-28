import { Fragment } from "react";

export default function Hints(props: { length: number; isGameOver: boolean }) {
  return (
    <Fragment>
      {props.length && !props.isGameOver && (
        <div>
          <p>{`Length: ${props.length} letters.`}</p>
        </div>
      )}
    </Fragment>
  );
}
