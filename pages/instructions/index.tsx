import Link from 'next/link'

export default function Index() {
  return (
    <div id="instructions">
      <Link href="/"><button className='TopRightButton' style={{ color: 'white' }}>Continue playing</button></Link>
      <h1 id="closele">Closele</h1>
      <p>Wordle, but better :D</p>
      <h2 id="game-mechanics">Game Mechanics</h2>
      <h3 id="the-secret-word">The secret word</h3>
      <p>When the game begins, you are assigned with a secret word <em>(that you obviously don&#39;t know)</em>, and your mission is <em>(obviously)</em> to find that secret word.</p>
      <p>At the begginning, you are given the length of the secret word and the first letter of it:<br />
        <img src="https://user-images.githubusercontent.com/57628667/197333031-b80fa51b-afd7-44a3-93e9-5ab7c38739e6.png" alt="image" /></p>
      <p>Every 5 rounds, you will be hinted with another letter that the word contains <em>(unsorted)</em>:<br />
        <img src="https://user-images.githubusercontent.com/57628667/197333128-a147fc07-fa58-4bda-802b-c7ec4db58489.png" alt="image" />
        <img src="https://user-images.githubusercontent.com/57628667/197333161-b4c9b0c1-b850-44c8-94b9-02bdcd5313be.png" alt="image" />
        ...</p>
      <p>In addition, if your guess contains letters that the secret word has, it will also appear there.</p>
      <h3 id="guessing">Guessing</h3>
      <p>Each guess (also referred to as a round) must have between 3 to 8 letters, and can be entered by typing on the keyboard or tapping the keyboard that should appear in mobile.</p>
      <p>To submit, press <code>Enter</code>.<br />
        To delete the entire word, press <code>Delete</code>.<br />
        To delete the last letter, press <code>Backspace</code>.</p>
      <p>If your guess was <strong>correct</strong>, you <em>(obviously)</em> win.</p>
      <p>If your guess was <strong>incorrect</strong>, you are given a hint (word), that its meaning is closer to the secret word, and also close to your guess.<br />
        You are also given a &quot;similarity&quot; bar, that has a blue line and a green line.<br />
        The <strong>blue</strong> line is the similarity (in meaning) between your guess and the secret word.<br />
        The <strong>green</strong> line is the similarity (in meaning) between the hint to the secret word.</p>
      <p>The green bar will always be larger than the blue bar.</p>
      <p><img src="https://user-images.githubusercontent.com/57628667/197333864-97c99277-2d14-4c0d-a9ca-1fc3794918a4.png" alt="image" />
        <img src="https://user-images.githubusercontent.com/57628667/197333911-9cde45ee-d936-451d-be98-675dd4a9b349.png" alt="image" /></p>
      <p>In case only the <strong>blue</strong> bar is visible and the hint is <code>no hint</code>, that means your guess was <strong>REALLY</strong> close.<br />
        <img src="https://user-images.githubusercontent.com/57628667/197334192-59bd2d70-4fc9-40af-b9b8-c89a2de178e3.png" alt="image" /></p>
      <p>In case only the <strong>green</strong> bar is visible and there&#39;s no hint, that means you have won!<br />
        <img src="https://user-images.githubusercontent.com/57628667/197334233-445664d0-1b8d-42d6-a229-aeb3cc4adcbb.png" alt="image" /></p>
      <p>If you wish to give up, press the give up button in the top left:<br />
        <img src="https://user-images.githubusercontent.com/57628667/197333349-729cca09-a0ca-4646-85f2-560839d5f8ac.png" alt="image" /><br />
        That will reveal the secret word and end the game.</p>
      <p>After winning (or giving up) you can play again by pressing the play again button in the top left:<br />
        <img src="https://user-images.githubusercontent.com/57628667/197333378-5207fe3b-6dd9-4bd9-a7f1-e1f67a24229a.png" alt="image" /></p>
      <h2 id="mobile-responsiveness">Mobile Responsiveness</h2>
      <h3 id="the-keyboard">The keyboard</h3>
      <p>If you&#39;re on mobile, a keyboard should appear:<br />
        <img src="https://user-images.githubusercontent.com/57628667/197333196-a5e33c44-423a-48aa-80b3-ed76b6e2b1c0.png" alt="image" /><br />
        Pressing on it will vibrate your device <em>(if supported)</em>.</p>
      <h3 id="vibrations">Vibrations</h3>
      <p><em>(if supported)</em></p>
      <p>Upon <strong>pressing keys</strong> on the keyboard, the device will vibrate for <strong>10ms each key</strong> pressed.<br />
        Upon guessing <strong>correctly</strong> or giving up, the device will vibrate for <strong>3 times, 300ms each</strong>.<br />
        Upon guessing <strong>incorrectly</strong>, the device will vibrate <strong>once for 200ms</strong>.<br />
        If there&#39;s an <strong>error</strong> (for example if a word is not found), the device will vibrate <strong>twice, 50ms each</strong>.<br /></p>
    </div>
  )
}
