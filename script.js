// array of quotes
const quotes = [
  'The ability to speak does not make you intelligent.',
  'Who\'s the more foolish, the fool or the fool who follows him?',
  'Your eyes can deceive you; don\'t trust them.',
  'I never make exceptions. An exception disproves the rule.',
  'In a dark place we find ourselves and a little more knowledge lights our way.',
  'Train yourself to let go of everything you fear to lose.',
  'Fear leads to anger, anger leads to hate, hate leads to suffering.',
  'The quick brown fox jumps over the lazy dog.',
];

// grab the page elements
const quoteElement = document.getElementById('quote');
const statusElement = document.getElementById('status');
const textBoxElement = document.getElementById('text-box');
const startButton = document.getElementById('start');

// store the list of words 
// store the word index for tracking word
let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now(); 

// start button event listener
startButton.addEventListener('click', () => {
  /*======= Add start logic ====== */
  
  /* 1. Get a quote */
  // here we are using (Math.random() * quotes.length) to randomly access the index of the array
  // the important part is, we are multiplying with quotes.length so that
  // we can only get the random number based on our array.length 
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  
  /* 2. Put the quote into an array of words */
  // String.split will convert a string into array of strings
  // here we are splitting a string based on empty space (' '). 
  words = quote.split(' '); 
  
  
  /* 3. Reset the word index for tracking */
  // reset the counter when user clicks the start button again
  wordIndex = 0;

  /* 4. UI updates */
  // Create an array of span elements so we can set a class
  // this is needed because we want to highlight individual word 
  const spanWords = words.map(function(word) { 
    return `<span>${word} </span>`;
  });
  

  /* 5. Convert back into string and set as innerHTML on quote display */
  // this will update the quoteElement in the UI
  quoteElement.className = 'quote';
  quoteElement.innerHTML = spanWords.join('');
  
  /* 6. Highlight the first word by default */
  // the quoteElement have the span elements as a childNodes.
  // highlight the first word by setting the 'highlight' class
  // on the first child node.
  quoteElement.childNodes[0].className = 'highlight';
  
  /* 7. Clear any prior status messages */
  // clear any previous status
  statusElement.innerText = '';

  /* 8. Setup the text box */
  // Clear the text box
  textBoxElement.value = '';
  // set focus on input
  textBoxElement.focus();
  
  /* 9. Start the timer */
  // it also reset the previous start time if the user
  // click the start button again
  startTime = new Date().getTime();

  /*====== Start Logic End ======*/

  /* text box event listener */
  textBoxElement.addEventListener('input', () => {
    /*===== Add typing logic =====*/

    /* 1. Get the current word */
    const currentWord = words[wordIndex];
    
    /* 2. Get the current value */
    const typedValue = textBoxElement.value;
  
    /* 3. Compare the current value with the current word */
    // Scenario #01
    // when the typedValue is equal to current word and the wordIndex
    // is equal to words array.length, then we know that this is the 
    // last word typed i.e end of sentence.
    // Scenario #02
    // if the typedValue ends with space(' ') and typedValue is equal to currentWord
    // then we know that this is the end of the word and we need to 
    // move on the next word.
    // Scenario #03
    // If the currentWord is correct, we need to remove the error class from
    // the input box.
    // Scenario #04
    // When user typed wrong word then we need add the error class
    // to the input box.
    if ((typedValue === currentWord) && (wordIndex ===  (words.length - 1))) {
      // end of sentence
      // calculate the total time elapsed 
      const totalTime = new Date().getTime() - startTime;
      // display success, divide total elapsedTime by 1000 to convert from milliseconds to seconds
      const message = `Congratulations! You finished in ${totalTime / 1000} seconds.`;
      statusElement.innerText = message;

      // clear the highlight class
      quoteElement.childNodes[wordIndex].className = '';
      // clear the input box
      textBoxElement.value = '';
      
    } else if (typedValue.endsWith(' ') && (typedValue.trim() === currentWord)) {
      // end of word
      // clear the textBoxElement for the new word
      textBoxElement.value = ''; // this will clear the input
      // move to the next word
      wordIndex++; // increment the wordIndex
      
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }

      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // Word is currently typed correctly (but not complete), 
      // indicated by currentWord started with typedValue.

      // currently correct
      // highlight the next word
      // Ensure textBoxElement is displayed as default by clearing className if any
      textBoxElement.className = ''; 
    } else {
      // error state
      textBoxElement.className = 'error';
    }

    /*===== Typing logic end =====*/
  });
});