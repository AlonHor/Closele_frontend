import { Fragment } from "react";

export default function Hints(props: { length: number; isGameOver: boolean }) {
  return (
    <Fragment>
      {props.length && !props.isGameOver ? (
        <div>
          <p>{`${props.length} letters`}</p>
        </div>
      ) : null}
    </Fragment>
  );
}
