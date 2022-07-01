//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var nlp = window.nlp_compromise;

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'NK', //name of the chatbot
  talking = true; //when false the speach function doesn't work
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  // talking = true;
  botMessage = "I'm confused"; //the default message


  if (lastUserMessage === 'hi' || lastUserMessage =='hello') {
    const hi = ['hi','howdy','hello','whatsup','hi there','hey']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  // if (lastUserMessage === 'bored' || lastUserMessage =='blah') {
  //   const hi = ['why?','hmm','i wonder how I can cheer you up']
  //   botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  // }

  // if (lastUserMessage === 'tell me' || lastUserMessage =='say something') {
  //   const hi = ['tell what?','what you want to know?','no, you say something']
  //   botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  // }

  if (lastUserMessage === 'you are angry' || lastUserMessage === 'you are crazy') {
   botMessage = nlp.statement(lastUserMessage).replace('you are', 'i was').to_past().text()+" not now";
  }

  if (lastUserMessage === 'i am hungry' || lastUserMessage === 'i am tired') {
    botMessage = nlp.statement(lastUserMessage).to_past().negate().text();
   }

  if (lastUserMessage === 'help me' || lastUserMessage === 'save me') {
    botMessage = nlp.statement(lastUserMessage).replace('me', 'you').to_future().text();
   }

  var bname = lastUserMessage.search(/\b(your name|who are you)\b/i);
  if (bname !== -1) {
    const hi = ['you can call me NK','My creator calls me NK','My name is NK','I am NK aka Not Known', 'I am just NK','My created named me NK']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  var n = lastUserMessage.search(/\b(cat|cats|kitten|feline|kittens|puppies|dogs|doggo|puppy)\b/i);
  if (n !== -1) {
  botMessage = 'Cats are cute, I love cats!';
  } 

  var we = lastUserMessage.search(/\b(sunny|weather|rainy|snow|wind|climate)\b/i);
  if (we !== -1) {
    const hi = ['I like warmer weather','I hate rain','I want to stay home and sleep','it is cozy weather here']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  var joke = lastUserMessage.search(/\b(tell me a joke|say something funny|make me laugh)\b/i);
  if (joke !== -1) {
    const hi = ["When two egotists meet, it's an I for an I.","In democracy your vote counts. In feudalism your count votes.","A bicycle can't stand on its own because it is two-tired."]
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  // var neg = lastUserMessage.search(/\b(sad|angy|crazy|depressed|lonely)\b/i);
  // if (neg !== -1) {
  //   botMessage = nlp.statement(lastUserMessage).negate().text(); 
  // } 

  var ban = lastUserMessage.search(/\b(dick|pussy|cock|boobs|tits|blowjob|handjob|fuck)\b/i);
  if (ban !== -1) {
  botMessage = 'Use appropriate language or you will be banned';
  }

  var q = lastUserMessage.search(/\b(what|why|where|when|how|which)\b/i);
  if (q !== -1) {
    const hi = ['ask google','how do I know?','I cannot tell','i am not allowed to tell you','hmm, good question','*ignores*','no idea, next...']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  } 
  var ok = lastUserMessage.search(/\b(okay|ok|hmm|alright|sure|right)\b/i);
  if (ok !== -1) {
    const hi = ['okay','hmm','yeah','um']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  } 
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push("<b>" + "You" + ":</b> " +lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}