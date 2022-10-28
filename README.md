<h1 align="center">Closele</h1>

<h3 align="center">Wordle, but better :D</h3>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f3addbb7-f780-4fef-bd39-42c5917f90b0/deploy-status)](https://app.netlify.com/sites/closele/deploys)

## Keyboard Usage

- `Letters`: type a word
- `Backspace`: remove last letter
- `Delete`: remove entire word
- `Enter`: submit guess
- `Enter` _(after game is over)_: play again

## Game Mechanics

### The secret word

When the game begins, you are assigned with a secret word _(that you obviously don't know)_, and your mission is _(obviously)_ to find that secret word.

At the begginning, you are given the length of the secret word:<br />
![image](https://user-images.githubusercontent.com/57628667/198729953-6e9f1d71-09cb-4525-aa93-cdd5113df344.png)

When guessing a word, if your word contains letters from the secret word, the keyboard will color the letters in green, and the letters that don't appear in the word in dark gray.<br />
![image](https://user-images.githubusercontent.com/57628667/198730644-aa686f0d-e174-45b7-aab6-6a7dbd5eb8c8.png)
![image](https://user-images.githubusercontent.com/57628667/198730662-97851588-cf0b-42ac-854c-0d51debe1221.png)
...

### Guessing

Guesses must be 3 - 8 letters long.

If your guess was **correct**, you _(obviously)_ win.

If your guess was **incorrect**, you are given a hint (word), that its meaning is closer to the secret word, and also close to your guess.<br />
![image](https://user-images.githubusercontent.com/57628667/198730967-8b940dc6-0760-4562-973c-a06773fc945b.png)

Guess = buying, Hint = emphasis.

You are also given a "similarity" bar, that has a blue line and a green line.<br />
The **blue** line is the similarity (in meaning) between your guess and the secret word.<br />
The **green** line is the similarity (in meaning) between the hint to the secret word.

The green bar will always be larger than the blue bar.

![image](https://user-images.githubusercontent.com/57628667/197333864-97c99277-2d14-4c0d-a9ca-1fc3794918a4.png)
![image](https://user-images.githubusercontent.com/57628667/197333911-9cde45ee-d936-451d-be98-675dd4a9b349.png)

If the **blue** bar is full and the hint is `no hint`, that means your guess was **REALLY** close.<br />
![image](https://user-images.githubusercontent.com/57628667/197334192-59bd2d70-4fc9-40af-b9b8-c89a2de178e3.png)

If the **green** bar is full, you win!<br />
![image](https://user-images.githubusercontent.com/57628667/197334233-445664d0-1b8d-42d6-a229-aeb3cc4adcbb.png)

If you wish to give up, press the give up button in the top left:<br />
![image](https://user-images.githubusercontent.com/57628667/197333349-729cca09-a0ca-4646-85f2-560839d5f8ac.png)<br />
That will reveal the secret word and end the game.

After winning (or giving up) you can play again by pressing the play again button in the top left:<br />
![image](https://user-images.githubusercontent.com/57628667/197333378-5207fe3b-6dd9-4bd9-a7f1-e1f67a24229a.png)
