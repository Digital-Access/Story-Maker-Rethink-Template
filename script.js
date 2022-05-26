const config = {
    title: "Scheduling a Blogger Post",
    instruction: "Test your knowledge by selecting the correct options, that refer to scheduling a blogger post below!",
    image: "",
    background: "https://a.storyblok.com/f/112136/1920x1080/89cb45339a/colour-bg-2.jpg",
    background_color: "#25517B",
    end_image: "",
    end_text: "Well Done! Click the “Next Video” button to proceed now.",
}

const textElement = document.getElementById('textElement');
const optionBtnsElement = document.getElementById('optionBtns');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const mainContainer = document.getElementById('container');
const endContainer = document.getElementById('endContainer');
const endImg = document.getElementById('endImg');
const endText = document.getElementById('endMessage');
const titleContainer = document.getElementById('titleContainer');
const titleText = document.getElementById('title');
const titleImg = document.getElementById('titleImage');
const instructionText = document.getElementById('instructionText');
const body = document.querySelector('body');
const image = document.getElementById('image');

body.style.backgroundImage = `url(${config.background})`
titleImage.src = config.image;
titleText.textContent = config.title;
instructionText.textContent = config.instruction;

let state = {};

const startGame = () => {
    state = {};
    showTextNode(1)
}

const showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    image.src = textNode.image;
    while (optionBtnsElement.firstChild) {
        optionBtnsElement.removeChild(optionBtnsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option))
            optionBtnsElement.appendChild(button)
        }
    })
}

const showOption = (option) => {
    return option.requiredState == null || option.requiredState(state);
}

const selectOption = (option) => {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        startGame()
    } else if (nextTextNodeId === 'endGame') {
        endGame()
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId)
}

const endGame = () => {
    mainContainer.style.display = 'none';
    endContainer.style.display = 'flex';
    endText.textContent = config.end_text;
    endImg.src = config.end_image;
    titleContainer.style.display = 'none';
}

const textNodes = [{
        id: 1,
        text: 'What is the first step in creating and scheduling a Blogger post?.',
        image: 'https://a.storyblok.com/f/112136/612x192/27f70ae76c/picture1.png',
        options: [{
                text: 'Log in to Blogger.',
                setState: {
                    id1Option1: true
                },
                nextText: 2
            },
            {
                text: 'Click on date and time.',
                setState: {
                    id1Option2: true
                },
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: 'Now it\'s time to set up your post. Where do you go?',
        image: 'https://a.storyblok.com/f/112136/527x179/90cd7a2109/picture2.png',
        options: [{
                text: 'Click on \"New Post\"',
                requiredState: (currentState) => currentState.id1Option1,
                setState: {
                    id1Option1: false,
                    id2Option1: true
                },
                nextText: 3
            },
            {
                text: 'I want to edit a current post so I click on an existing post.',
                requiredState: (currentState) => currentState.id1Option1,
                setState: {
                    id1Option1: false,
                    id2Option2: true
                },
                nextText: 11
            },
            {
                text: 'Incorrect! How would Blogger know which post you are scheduling for? Try again',
                requiredState: (currentState) => currentState.id1Option2,
                setState: {
                    id1Option1: false,
                    id2Option4: true
                },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Great! Where to next?',
        image: 'https://a.storyblok.com/f/112136/609x275/3fd20bb67d/picture3.png',
        options: [{
                text: 'Add a title, text and images to your post.',
                nextText: 6
            },
            {
                text: 'Click on Publish',
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'Incorrect! How would Blogger know which post you are scheduling for?',
        image: 'https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png',
        options: [{
            text: 'Try again',
            nextText: -1
        }]
    },
    {
        id: 5,
        text: 'Incorrect! There is no content in your post.',
        image: 'https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png',
        options: [{
            text: 'Start Again',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'Now to schedule your post. Where do you go?',
        image: '',
        options: [{
                text: 'Click dropdown \"publish on\" and select set \"date and tine\"',
                nextText: 7
            },
            {
                text: 'Pick a date and time',
                nextText: 8
            }
        ]
    },
    {
        id: 7,
        text: 'What is your final step?',
        image: 'https://a.storyblok.com/f/112136/155x246/fd68f54750/picture4.png',
        options: [{
                text: 'Set the date and time and publish',
                nextText: 10
            },
            {
                text: 'Set the time and publish',
                nextText: 9
            }
        ]
    },
    {
        id: 8,
        text: 'Incorrect! Where do you pick the date and time?',
        image: 'https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png',
        options: [{
            text: 'Start again!',
            nextText: -1
        }]
    },
    {
        id: 9,
        text: 'So close! But you missed the date!',
        image: 'https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png',
        options: [{
            text: 'Try again',
            nextText: -1
        }]
    },
    {
        id: 10,
        text: 'Correct you did it!',
        image: 'https://a.storyblok.com/f/112136/3027x1829/21e01487e4/correct.png',
        options: [{
            text: 'Finish',
            nextText: 'endGame'
        }]
    },
    {
        id: 11,
        text: 'OK where to next?',
        image: "https://a.storyblok.com/f/112136/609x275/3fd20bb67d/picture3.png",
        options: [{
                text: 'Click preview',
                nextText: 12
            },
            {
                text: 'Click dropdown “publish on” and select set \"date and time\"',
                nextText: 13
            }
        ]
    },
    {
        id: 12,
        text: 'Incorrect! Cannot edit settings in the preview section',
        image: "https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png",
        options: [{
            text: 'try again',
            nextText: -1
        }]
    },
    {
        id: 13,
        text: 'What is you final step?',
        image: "https://a.storyblok.com/f/112136/155x246/fd68f54750/picture4.png",
        options: [{
                text: 'Set the date and time and publish',
                nextText: 14
            },
            {
                text: 'Set the time and publish',
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: 'Correct! You did it!',
        image: "https://a.storyblok.com/f/112136/3027x1829/21e01487e4/correct.png",
        options: [{
            text: 'Finish',
            nextText: 'endGame'
        }]
    },
    {
        id: 15,
        text: 'So close! But you missed the date!',
        image: "https://a.storyblok.com/f/112136/1842x2109/b9a1998e72/wrong.png",
        options: [{
            text: 'Try again',
            nextText: -1
        }]
    }



]

startGame();