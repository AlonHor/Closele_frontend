# Closele
Wordle, but better :D

## Game Mechanics
### The secret word
When the game begins, you are assigned with a secret word *(that you obviously don't know)*, and your mission is *(obviously)* to find that secret word.

At the begginning, you are given the length of the secret word and the first letter of it:<br />
![image](https://user-images.githubusercontent.com/57628667/197333031-b80fa51b-afd7-44a3-93e9-5ab7c38739e6.png)

Every 5 rounds, you will be hinted with another letter that the word contains *(unsorted)*:<br />
![image](https://user-images.githubusercontent.com/57628667/197333128-a147fc07-fa58-4bda-802b-c7ec4db58489.png)
![image](https://user-images.githubusercontent.com/57628667/197333161-b4c9b0c1-b850-44c8-94b9-02bdcd5313be.png)
...

### Guessing
Each guess (also referred to as a round) must have between 3 to 8 letters, and can be entered by typing on the keyboard or tapping the keyboard that should appear in mobile.

To submit, press `Enter`.<br />
To delete the entire word, press `Delete`.<br />
To delete the last letter, press `Backspace`.

If your guess was **correct**, you *(obviously)* win.

If your guess was **incorrect**, you are given a hint (word), that its meaning is closer to the secret word, and also close to your guess.<br />
You are also given a "similarity" bar, that has a blue line and a green line.<br />
The **blue** line is the similarity (in meaning) between your guess and the secret word.<br />
The **green** line is the similarity (in meaning) between the hint to the secret word.

The green bar will always be larger than the blue bar.

![image](https://user-images.githubusercontent.com/57628667/197333864-97c99277-2d14-4c0d-a9ca-1fc3794918a4.png)
![image](https://user-images.githubusercontent.com/57628667/197333911-9cde45ee-d936-451d-be98-675dd4a9b349.png)

In case only the **blue** bar is visible and the hint is `no hint`, that means your guess was **REALLY** close.<br />
![image](https://user-images.githubusercontent.com/57628667/197334192-59bd2d70-4fc9-40af-b9b8-c89a2de178e3.png)

In case only the **green** bar is visible and there's no hint, that means you have won!<br />
![image](https://user-images.githubusercontent.com/57628667/197334233-445664d0-1b8d-42d6-a229-aeb3cc4adcbb.png)

If you wish to give up, press the give up button in the top left:<br />
![image](https://user-images.githubusercontent.com/57628667/197333349-729cca09-a0ca-4646-85f2-560839d5f8ac.png)<br />
That will reveal the secret word and end the game.

After winning (or giving up) you can play again by pressing the play again button in the top left:<br />
![image](https://user-images.githubusercontent.com/57628667/197333378-5207fe3b-6dd9-4bd9-a7f1-e1f67a24229a.png)

## Mobile Responsiveness
### The keyboard
If you're on mobile, a keyboard should appear:<br />
![image](https://user-images.githubusercontent.com/57628667/197333196-a5e33c44-423a-48aa-80b3-ed76b6e2b1c0.png)<br />
Pressing on it will vibrate your device *(if supported)*.

### Vibrations
*(if supported)*

Upon **pressing keys** on the keyboard, the device will vibrate for **50ms each key** pressed.<br />
Upon guessing **correctly** or giving up, the device will vibrate for **3 times, 300ms each**.<br />
Upon guessing **incorrectly**, the device will vibrate **once for 200ms**.<br />
If there's an **error** (for example if a word is not found), the device will vibrate **twice, 50ms each**.<br />
