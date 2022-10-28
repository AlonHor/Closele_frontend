import Guess from "./Guess";

export default function Guesses(props: { guesses: any; isMobile: any }) {
  return (
    <div className="Guesses">
      {props.guesses.map((guessObj: any, index: number) => (
        <Guess key={index} obj={guessObj} isMobile={props.isMobile} />
      ))}
    </div>
  );
}
