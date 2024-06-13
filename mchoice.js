
const optionCorrectColor = 'green'
const optionWrongColor = 'red'

const questions = [
    {
        'type': "mchocie", 
        'question': "What is the Capital of Ireland?", 
        'achoices': ["Dublin", "Dublen", "Doblin", "Oslo"], 
        'answer': 0,
        'allowHover': false
    },
    {
        'type': "sentNtoE",
        'question': "sá", 
        'achoices': ["King", "Ship", "Great", "To Be", "That (One)"], 
        'answer': 4,
        'allowHover': true
    },
    {
        'type': "sentNtoE",
        'question': "maðr", 
        'achoices': ["Man or Person", "Ship", "To Have", "To Be", "That (One)"], 
        'answer': 0,
        'allowHover': true
    },
    {
        'type': "sentEtoN",
        'question': "Denmark", 
        'achoices': ["Gormr", "Sá", "Danmörk", "dόttir", "Dansk"], 
        'answer': 0,
        'allowHover': true
    },
    {
        'type': "sentNtoE",
        'question': "maðr", 
        'achoices': ["Man or Person", "Ship", "To Have", "To Be", "That (One)"], 
        'answer': 0,
        'allowHover': false
    },
        {
            'type': "sentEtoN",
            'question': "king", 
            'achoices': ["maðr", "kona", "bók", "konungr", "skip"], 
            'answer': 3,
            'allowHover': true
        },
        {
            'type': "sentNtoE",
            'question': "maðr", 
            'achoices': ["Ship", "Man or Person", "To Have", "To Be", "That (One)"], 
            'answer': 1,
            'allowHover': false
        },
        {
            'type': "sentEtoN",
            'question': "woman", 
            'achoices': ["skip", "sonr", "kona", "bók", "land"], 
            'answer': 2,
            'allowHover': true
        },
        {
            'type': "sentNtoE",
            'question': "skip", 
            'achoices': ["Ship", "Man or Person", "King", "Son", "Woman"], 
            'answer': 0,
            'allowHover': false
        },
        {
            'type': "sentEtoN",
            'question': "land", 
            'achoices': ["korn", "fugl", "land", "maðr", "kona"], 
            'answer': 2,
            'allowHover': true
        },
        {
            'type': "sentNtoE",
            'question': "barn", 
            'achoices': ["Grain", "King", "Child", "Bird", "Man or Person"], 
            'answer': 2,
            'allowHover': false
        },
        {
            'type': "sentEtoN",
            'question': "son", 
            'achoices': ["skip", "sonr", "kona", "land", "bók"], 
            'answer': 1,
            'allowHover': true
        },
        {
            'type': "sentNtoE",
            'question': "bók", 
            'achoices': ["Woman", "Ship", "Book", "King", "Man or Person"], 
            'answer': 2,
            'allowHover': false
        },
        {
            'type': "sentEtoN",
            'question': "The king’s daughter found a hidden sword in the ancient cave.", 
            'achoices': ["Land konungs fann dóttir í helli.", "Barn konungr fann helli í fornri sverð.", "Kona maðr var konungr í helli.", "Konungs dóttir fann falda sverð í fornri helli.", "Skip í fornri helli fann sverð."], 
            'answer': 3,
            'allowHover': true
        },
        {
            'type': "sentNtoE",
            'question': "Þeirra ævintýri byrjaði í fjarlægum landi, þar sem tröll og vættir bjuggu.", 
            'achoices': ["Their adventure began in a distant land, where trolls and spirits lived.", 
                         "The brave warriors set sail to conquer new lands and seas.", 
                         "A man should not carve runes, unless he well knows how to control them.", 
                         "They traveled to a faraway land to find treasure and glory.", 
                         "The king's daughter found a hidden sword in the ancient cave.", 
                         "In the distant land, they encountered mystical creatures.",
                         "The journey led them to uncharted territories filled with dangers.",
                         "Their saga started in a remote area, home to giants and fairies.",
                         "The expedition brought them to lands unknown, where myths became reality.",
                         "Venturing into the unknown, they faced beasts and spirits."
                        ], 
            'answer': 0,
            'allowHover': false
        }
    
    
]

const hoverWords = {
    'maðr': 'Man or Person',
    'kona': 'Woman',
    'bók': 'Book',
    'konungr': 'King',
    'skip': 'Ship',
    'korn': 'Grain',
    'fugl': 'Bird',
    'land': 'Land',
    'barn': 'Child',
    'sonr': 'Son',
    'sá': 'That (One)',
    'Denmark': 'Dansk',
    'Konungs': 'King\'s',
    'dóttir': 'Daughter',
    'fann': 'Found',
    'falda': 'Hidden',
    'sverð': 'Sword',
    'fornri': 'Ancient',
    'helli': 'Cave',
    'æfintýri': 'Adventure',
    'byrjaði': 'Began',
    'fjarlægum': 'Distant',
    'landi': 'Land',
    'tröll': 'Trolls',
    'vættir': 'Spirits',
    'bjuggu': 'Lived'
};

const questionTitles = {
    'mchocie': 'Choose the Right Option.',
    'sentNtoE': 'Please translate the following sentence to English.',
    'sentEtoN': 'Please translate the following sentence to Old Norse'
}

let qNum = 0
if (localStorage.getItem("questionNum") != null){
    qNum = localStorage.getItem("questionNum")
    alert("Automatically Returned to Question Number " + (qNum+1) )
}

let selectedAnswer = null

function reset(){
    localStorage.clear() 
    location.reload()
}

function getOptionElement(idx){
    return $('#options').children()[idx]
}

function selectAnswer(idx){
    previousChoiceObject = getOptionElement(selectedAnswer)
    choiceObject = getOptionElement(idx)
    $(previousChoiceObject).removeClass('selected')
    $(choiceObject).addClass('selected')
    selectedAnswer = idx
    $('.btn-submit').addClass('btn-active')
    $('.btn-submit')[0].onclick = submitQuestion
}

function checkAnswer(answer) {
    return answer == questions[qNum].answer
}

function showMultipleChoiceQuestion(idx){
    questionObject = questions[idx]
    questionObject.question.split(" ").forEach((element, idx) => {
        $('#question-text').append(`<div class = "word-in-question">${element}</div> `)
    })
    $('#options').empty()
    questionObject.achoices.forEach( (element, idx) => {
        $('#options').append(`<button class='button btn-option btn-active outline gray' onclick = 'selectAnswer(${idx})'> ${element} </button>`)
    });
    $('.word-in-question').hover(
        (e) => {
            popupTimeout = setTimeout(showHoverPopUp, 400, e.target)
        },
        (e) => {hideHoverPopUp(e.target)}
    )
    $('#translate-directions').text(questionTitles[questionObject.type])
}

function showHoverPopUp(textElement){
    console.log("hi")
    translation = hoverWords[$(textElement).text().split('\n')[0]]
    if ( translation == undefined ) {return}
    if (!questions[qNum].allowHover) {return}
    $(textElement).append(`
    <div class = "popup" > ${translation} </div>    
    `)
}

function hideHoverPopUp(textElement){
    clearTimeout(popupTimeout)
    $('.popup').remove()
}

function submitQuestion() {
    let correct = checkAnswer(selectedAnswer)
    if (correct) {
        $(getOptionElement(selectedAnswer)).addClass('correct')
        localStorage.setItem('numCorrect', Number(localStorage.getItem('numCorrect')) + 1)
    }
    localStorage.setItem('questionNum', qNum + 1)
    let buttonObject = $('.btn-submit')
    buttonObject.addClass('btn-next-question purple')
    buttonObject.removeClass('btn-submit')
    buttonObject.text('Next Question')
    buttonObject[0].onclick = nextQuestion

    if(qNum == 14) {
        alert(`You finished this Drosslinigo lesson! The number of questions you got right: ${localStorage.getItem('numCorrect')}`)
    }
}

function nextQuestion(){
    qNum ++
    $('#question-text').empty()
    showMultipleChoiceQuestion(qNum)
    console.log(`Now Showing Question #${qNum}`)
    let buttonObject = $('.btn-next-question')
    console.log(buttonObject)
    buttonObject.addClass('btn-submit')
    buttonObject.removeClass('btn-next-question')
    buttonObject.text('Submit')
    $('.btn-submit').removeClass('btn-active')
    buttonObject[0].onclick = () => {}
    pb.now ++
    pb.syncState()

    if (qNum == 1){
        alert("Remember, You can hover over the words to see their translations.")
    }
}

showMultipleChoiceQuestion(qNum)