function init() {
    // create alphabet 
    const lettersSection = document.querySelector('.letters-div');

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

//  const animals = ["aabbcc"]
    const animals = ["Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Aardvark", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala"]

    const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',]
    const image = document.querySelector('.snowman img')
    function buttons() {
        for (let i = 0; i < alphabet.length; i++) {
            let letter = document.createElement('button');
            letter.textContent = alphabet[i]
            letter.classList.add('letters')
            lettersSection.appendChild(letter)
        }
    }
    buttons()

    let index = Math.floor(Math.random() * animals.length)
    let word = animals[index].toLowerCase().split("")
    let hiddenword = []
    const wordSection = document.querySelector('.word')

    function ChooseWord() {
        // this function will but a lines as much as word have 

        for (let i = 0; i < word.length; i++) {
            hiddenword.push('- ')
            const letter = document.createElement('span')
            letter.textContent = hiddenword[i]
            wordSection.appendChild(letter)
        }

    }
    ChooseWord()

    let counter = 0
    const winOrfail = document.querySelector('p')

    function buttonsEvent(event) {
        if (hiddenword.includes('- ') && counter != 7) {
            const lett = event.target.textContent.toLowerCase();
            
            // Check if the button is green (already guessed correctly) or red (already guessed incorrectly)
            if (event.target.classList.contains('green') || event.target.classList.contains('red')) {
                return; // Do nothing if the button has already been guessed
            }
    
            if (word.includes(lett)) {
                event.target.classList.add('green');
                for (let index in word) {
                    if (word[index] == lett) {
                        hiddenword[index] = event.target.textContent;
                        wordSection.innerHTML = hiddenword.join(' ');

                    }
                }
                if (!hiddenword.includes('- ')) {
                    winOrfail.innerHTML = 'You Win!';
                    winOrfail.classList.add("win-message")
       
                }
            } else {
                event.target.classList.add('red');
                image.src = 'images/' + images[counter];
                counter++;
                if (counter == 7) {
                    winOrfail.innerHTML = 'Try Again!';
                    winOrfail.classList.add("fail-message")
                    wordSection.innerHTML = word.join('');
                    lettersbutton.forEach((lettButton) => {
                        lettButton.disabled = true;
                    });
                    return;
                }
            }
    
            // Check if the game has ended
            if (!hiddenword.includes('- ') || counter === 7) {
                // Disable all letter buttons
                lettersbutton.forEach((lettButton) => {
                    lettButton.disabled = true;
                });
            }
        }
    }
    
    

    const lettersbutton = document.querySelectorAll('.letters')

    lettersbutton.forEach(lett => {
        lett.addEventListener('click', buttonsEvent)
    })

    const restart = document.querySelector('#reset')

    function reloadPage(){
       location.reload()
    }
    restart.addEventListener('click', reloadPage)

    const help= document.querySelector('#help')
    let hintsection=document.querySelector('#hint')

    // Initialize hint count
let totalHints = 2; // Set the initial number of hints
let remainingHints = totalHints; // Initialize the remaining hints variable
const hintCountElement = document.getElementById('hint-count-text');
hintCountElement.textContent = remainingHints; // Set the initial hint count in the HTML

function helps() {
    if (winOrfail.textContent === 'You Win!' || winOrfail.textContent === 'Try Again!') {
      // Game has ended, so return without doing anything
      return;
    }
    if (remainingHints > 0) {
      const letterToReveal = word.find((letter, index) => hiddenword[index] === '- ');
      if (letterToReveal) {
        word.forEach((letter, index) => {
          if (letter === letterToReveal) {
            hiddenword[index] = letterToReveal;
            // Find the corresponding letter button and change its color to green
            lettersbutton.forEach((lett) => {
              if (lett.textContent.toLowerCase() === letterToReveal) {
                lett.classList.remove('red');
                lett.classList.add('green');
              }
            });
          }
        });
        wordSection.innerHTML = hiddenword.join(' ');
  
        remainingHints--; // Decrease the remaining hints count
        hintCountElement.textContent = remainingHints; // Update the hint count in the HTML
  
        if (remainingHints === 0) {
          // No more hints remaining, so hide the hint button, hint text, and hint count text
          help.style.display = 'none'; // Hide the hint button
          hintsection.style.display = 'none'; // Hide the hint text
          hintCountElement.style.display = 'none'; // Hide the hint count text
        }
  
        // Check if the player has won
        if (!hiddenword.includes('- ')) {
          winOrfail.innerHTML = 'You Win!';
          winOrfail.classList.add("win-message");
          lettersbutton.forEach((lettButton) => {
            lettButton.disabled = true;
        });
        }
      }
    }
  }
  

help.addEventListener('click', helps);

}
window.addEventListener('DOMContentLoaded', init)


