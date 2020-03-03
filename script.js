$(document).ready(function(){
  
 let messageId = 0; //to allow messages to have unique styling


  var sendMessage = function(){
    
    var newMessage = $("textarea").val();
    var chatHistory = $("#chat-bubble").html();
    var backcolor = "#ffa992";
    createMessage(newMessage,chatHistory,backcolor);
    
    setTimeout(function(){
                var newBotResponse = generateAnswer();
                backcolor = "#e8f5f8";
                chatHistory = $("#chat-bubble").html();
                createMessage(newBotResponse,chatHistory,backcolor);
    },1000);
  }


  var createMessage = function(newMessage,chatHistory,backgroundColor){
    
    //get current time
    var currentTime = new Date();
    var hours= currentTime.getHours();
    var minutes= currentTime.getMinutes();

    if (hours < 10){
          hours = "0" + hours;
     }
    if (minutes < 10){
          minutes = "0" + minutes;
     }
     

    var textarea = $("#chat-bubble");
    
    var side = backgroundColor == "#e8f5f8" ? "left" : "right";
    var borderSide = side == "left" ? "5px 30px 30px" : "30px 5px 30px 30px"

    //alert(side);
    textarea.html(chatHistory+ `<p id = ${messageId} >` + newMessage + '<br>' +'<span>'+ " " + hours + ":"+ minutes +'</span>' +'</p>');
    textarea.scrollTop(textarea[0].scrollHeight);
    $("#"+messageId).css({"background-color" : backgroundColor, "justify-self" : side, "border-radius": borderSide});
    $("textarea").val(''); //reset input box
    messageId++;
  }
  
  $("button").click(sendMessage);

  $(document).on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage();
    }
  }); //end enter key listener

  var listOfAnswers = ["No", "Yes", "I don't think so…", "Of course!", "Indubitably", "In your dreams."];

  var generateAnswer = function(){
            
            var randomNumber = Math.random();
            var randomNumberForListOfAnswers = randomNumber * listOfAnswers.length;
            var randomIndex = Math.floor(randomNumberForListOfAnswers);
            var answer = listOfAnswers[randomIndex];
            /*answer = listOfAnswers[0];     */
            return answer;
        };
  
  $('button').hover(function(){$(this).toggleClass('buttonHover');});


}); //end document.ready