$(document).ready(function(){
  
 let messageId = 0; //to allow messages to have unique styling
 const humanColor = "#ffa992"; //speech bubble colors
 const botColor = "#e8f5f8";
 const listOfBotAnswers = ["No", "Yes", "I don't think so…", "Of course!", "Indubitably", "In your dreams", "As I see it, yes", "Better not tell you now"];

  const sendMessage = () => { //When message is sent
            
      if($("textarea").val().trim().length > 0){  
        let newMessage = $("textarea").val();
        let chatHistory = $("#chat-space").html();
        let bubbleColor = humanColor; //human color
    
        createMessage(newMessage,chatHistory,bubbleColor);
    
        setTimeout(function(){ //bot response after a delay
                let botAnswer = generateBotAnswer();
                bubbleColor = botColor; //bot colour
                chatHistory = $("#chat-space").html();
                createMessage(botAnswer,chatHistory,bubbleColor);
        },1000);
      }
   }//end send message

  const getTime = () => {
        
    let currentTime = new Date();
    let hours= currentTime.getHours();
    let minutes= currentTime.getMinutes();

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    
    return hours + ":" + minutes;
  }

  const createMessage = (newMessage,chatHistory,backgroundColor) =>{
    
    let timeStamp = getTime();   
    let chatSpace = $("#chat-space");
    let speechSide = backgroundColor == botColor ? "left" : "right";
    let drawBubble = speechSide == "left" ? "5px 30px 30px" : "30px 5px 30px 30px";

  
    chatSpace.html(chatHistory + `<p id = ${messageId} >` + newMessage + '<br>' +'<span>'+ timeStamp +'</span>' +'</p>'); //add new message

    $("#"+messageId).css({"background-color" : backgroundColor, "justify-self" : speechSide, "border-radius": drawBubble}); //style the new message

    chatSpace.scrollTop(chatSpace[0].scrollHeight); //scroll to bottom

    $("textarea").val(''); //clear input box
    messageId++; //generate new id for future messages
  }

  const generateBotAnswer = () => {    
      let randomAnswerIndex = Math.floor(Math.random() * listOfBotAnswers.length);
      return listOfBotAnswers[randomAnswerIndex];
  };
  
//EVENT LISTENERS Click on Button or Enter keypress

  $('button').hover(function(){$(this).toggleClass('buttonHover');});

  $("button").click(sendMessage);

  $(document).on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage();
    }
  });

}); //end document.ready
