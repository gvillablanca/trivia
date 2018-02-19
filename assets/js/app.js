$(document).ready(function() {
        $('.reload').click(function() {
            location.reload();
        });
});

fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=medium')
.then((response)=>{
    return response.json();
  }) .then((data)=>{
    console.log(data)
    let correctAnswers = 0;
    let counter = 0; 
    $('.multiple_option').on('click', function(){
      $('.info').empty(); // ocultar info 
      $('.other_option').hide();
      let category = data.results[counter].category
      let typeOp = data.results[counter].type
      let difficult = data.results[counter].difficulty
      let question = data.results[counter].question
      let allAnswers = [];

      allAnswers.push(data.results[counter].correct_answer)
      allAnswers.push(data.results[counter].incorrect_answers[0])
      allAnswers.push(data.results[counter].incorrect_answers[1])
      allAnswers.push(data.results[counter].incorrect_answers[2])
      allAnswers.sort();

      $('.info').append(`<h5 class="inf">${category} </h5> 
        <h5 class="inf"> Difficulty: ${difficult}</h5>
        <h3 class="question">${question}</h3><div>
        <div><button class="options btn-default btn">${allAnswers[0]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[1]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[2]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[3]}</button></div>`)

      $('.options').on('click', function(){ // evento para respuestas
        if($(this).text() === data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty(); // vaciar div contenedor info
          $('.multiple_option').show(); // vuelvo a mostrar mi boton
          $('.multiple_option').text('Next Question'); // cambio contenido del boton
          $('.info').append(`<h4><i class="far fa-check-square"></i> Correct answer!</h4>`);

          correctAnswers ++; console.log(correctAnswers) //contador de respuestas correctas
        }
        if($(this).text() !== data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty();
          $('.multiple_option').show();
          $('.multiple_option').text('Next Question');
          $('.info').append(`<h4><i class="fas fa-times"></i> Wrong answer!</h4><h5><i class="far fa-check-square"></i> Correct Answer is:
          ${data.results[counter].correct_answer}</h5>`);
          
        }counter ++; // contador general

        if(counter === 15){
          $('.info').empty();
          $('.multiple_option').hide();
          $('.info').append(`<button class="go_back btn-default btn">HOME</button>
          <h4>Your results</h4><h5>You got ${correctAnswers} out of 5</h5>`)
         
        } 
      }); //end answers function

  }) //end multiple_option
}); //end then data



  // TRUE/FALSE OPTION

fetch('https://opentdb.com/api.php?amount=15&difficulty=hard&type=boolean')
.then((response)=>{
    console.log(response);
    return response.json();
  }).then((data)=>{
    console.log(data)
    let correctAnswers = 0;
    let counter = 0; 
    $('.other_option').on('click', function(){
      $('.info').empty(); // ocultar info 
      $('.multiple_option').hide();
      let category = data.results[counter].category
      let difficult = data.results[counter].difficulty
      let question = data.results[counter].question
      let allAnswers = [];

      allAnswers.push(data.results[counter].correct_answer)
      allAnswers.push(data.results[counter].incorrect_answers[0])
      allAnswers.sort();

      $('.info').append(`<h5 class="inf">${category}</h5> 
        <h5 class="inf"> Difficulty: ${difficult}</h5>
        <h3 class="question">${question}</h3><div>
        <div><button class="options btn-default btn">${allAnswers[0]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[1]}</button></div>
       `);

      $('.options').on('click', function(){ // evento para respuestas
        if($(this).text() === data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty(); // vaciar div contenedor info
          $('.other_option').show(); // vuelvo a mostrar mi boton
          $('.other_option').text('Next Question'); // cambio contenido del boton
          $('.info').append(`<h4 class="correct"><i class="far fa-check-square"></i> Correct answer!</h4>`);

          correctAnswers ++; console.log(correctAnswers) //contador de respuestas correctas
        }
        if($(this).text() !== data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty();
          $('.other_option').show();
          $('.other_option').text('Next Question');
          $('.info').append(`<h4 class="error"><i class="fas fa-times"></i> Wrong answer!</h4><h5 class="correct-answer"><i class="far fa-check-square"></i> Correct Answer is: 
          ${data.results[counter].correct_answer}</h5>`);
          
        }counter ++; // contador general

        if(counter === 15){
          $('.info').empty();
          $('.multiple_option').hide();
          $('.info').append(`<button class="go_back btn-default btn">HOME</button>
          <h4>Your results</h4><h5>You got ${correctAnswers} out of 15</h5>`)
         
        } 

      }); //end answers function

  }) //end multiple_option
}); //end then data
