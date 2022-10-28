export default function Guess(props: { obj: any; isMobile: any }) {
  return (
    <div className="guess">
      <span className={`Guess`}>{props.obj.guess}</span>
      {!props.obj.win && (
        <span className={`Hint`}>
          {props.obj.hint === "You're very close!" ? "no hint" : props.obj.hint}
        </span>
      )}
      <span
        className={props.obj.win ? "Similarity__Win" : "Similarity__Full"}
        style={{ width: `${props.isMobile ? 230 : 460}px` }}
      >
        {!props.obj.win && (
          <>
            {props.obj.hint !== "You're very close!" && (
              <span
                className={"Similarity__New"}
                style={{
                  width: `${
                    props.obj.newSimilarity * (props.isMobile ? 230 : 460)
                  }px`,
                }}
              />
            )}
            <span
              className={"Similarity__Inside"}
              style={{
                width: `${
                  props.obj.similarity * (props.isMobile ? 230 : 460)
                }px`,
              }}
            />
          </>
        )}
      </span>
    </div>
  );
}
