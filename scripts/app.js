function init() {
    // create alphabet 
    const lettersSection = document.querySelector('.letters-div');

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];


    const animals = ["Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Aardvark", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala"]

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
            let lett = event.target.textContent.toLowerCase()
            // console.log(word)
            // this will output letter if correct / or change pic if not correct ->  and change color of the button
            if (word.includes(lett)) {
                event.target.classList.add('green')
                for (let index in word) {
                    if (word[index] == lett) {
                        hiddenword[index] = event.target.textContent
                        wordSection.innerHTML = hiddenword.join(' ')
                    }
                }
                if (!hiddenword.includes('- ')) {
                    winOrfail.innerHTML = 'you Win !!'
                }
            }
            else {
                event.target.classList.add('red')
                image.src = 'images/' + images[counter]
                counter++
                if (counter == 7) {
                    winOrfail.innerHTML = 'Try again !!'
                    return
                }
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

}
window.addEventListener('DOMContentLoaded', init)