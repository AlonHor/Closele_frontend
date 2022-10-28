import { Fragment } from "react";

const keys = [
  "q w e r t y u i o p {bksp}",
  "a s d f g h j k l {enter}",
  "z x c v b n m {delete}",
];

export default function MobileKeyboard(props: {
  isMobile: boolean;
  isGameOver: boolean;
  onKeyPress: any;
  includingKeys: string[];
  excludingKeys: string[];
}) {
  return (
    <Fragment>
      {!props.isGameOver && (
        <Fragment>
          <div className="TakeUpSpaceDiv" />
          <div className="Keyboard">
            {keys.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "33.33%",
                }}
              >
                {row.split(" ").map((key, j) => (
                  <div
                    key={j}
                    className="Key"
                    style={{
                      backgroundColor: `${
                        props.includingKeys.includes(key)
                          ? "green"
                          : props.excludingKeys.includes(key)
                          ? "#222"
                          : "#5f5f5f"
                      }`,
                    }}
                    onClick={() => props.onKeyPress(key)}
                  >
                    {key === "{bksp}"
                      ? "⌫"
                      : key === "{enter}"
                      ? "↵"
                      : key === "{delete}"
                      ? "DEL"
                      : key}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
