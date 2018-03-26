// funcion para relogear la pagina y poner en 0 todo
$(document).ready(function() {
        $('.reload').click(function() {
            location.reload();
        });
});

//conecto con la api 
fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium')
.then((response)=>{
    return response.json();
  }) .then((data)=>{
    console.log(data) // imprimo la data
    //contador de buenas y de preguntas
    let correctAnswers = 0;
    let counter = 0; 
    $('.multiple_option').on('click', function(){
      $('.info').empty(); // ocultar info 
      $('.other_option').hide(); // ocultar boton de true or false
      //obtengo los valores de la data
      let category = data.results[counter].category
      let typeOp = data.results[counter].type
      let difficult = data.results[counter].difficulty
      let question = data.results[counter].question
      let allAnswers = [];

      //los meto en un contenedor
      allAnswers.push(data.results[counter].correct_answer)
      allAnswers.push(data.results[counter].incorrect_answers[0])
      allAnswers.push(data.results[counter].incorrect_answers[1])
      allAnswers.push(data.results[counter].incorrect_answers[2])
      allAnswers.sort();

      //paso la informacion al div vacio del index y paso los datos (categoria, dificultad, pregunta y opciones multiples de respuestas)
      $('.info').append(`<h5 class="inf">${category} </h5> 
        <h5 class="inf"> Difficulty: ${difficult}</h5>
        <h3 class="question">${question}</h3><div>
        <div><button class="options btn-default btn">${allAnswers[0]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[1]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[2]}</button></div>
        <div><button class="options btn-default btn" >${allAnswers[3]}</button></div>`)

      $('.options').on('click', function(){ // evento para respuestas
        if($(this).text() === data.results[counter].correct_answer  && counter !== 15){//verifico si la opcion es correcta
          $('.info').empty(); // vaciar div contenedor info
          $('.multiple_option').show(); // vuelvo a mostrar mi boton
          $('.multiple_option').text('Next'); // cambio contenido del boton
          $('.info').append(`<h4><i class="far fa-check-square"></i> Correct answer!</h4>`);

          //y aumento la informacion al array de respuestas correctas
          correctAnswers ++; console.log(correctAnswers) //contador de respuestas correctas
        }
        //  si las respuestas son incorrectas, imprimo el error y la opcion correcta
        if($(this).text() !== data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty();
          $('.multiple_option').show();
          $('.multiple_option').text('Next');
          $('.info').append(`<h4><i class="fas fa-times"></i> Wrong answer!</h4><h5><i class="far fa-check-square"></i> Correct Answer is:
          ${data.results[counter].correct_answer}</h5>`);
          
        }counter ++; // contador general

        //al finalizar si acaba el quiz me retorna al inicio
        if(counter === 15){
          $('.info').empty();
          $('.multiple_option').hide();
          $('.info').append(`<button class="go_back btn-default btn">HOME</button>
          <h4>Your results</h4><h5>You got ${correctAnswers} out of 5</h5>`)
         
        } 
      });

  }) 
}); 



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
      $('.info').empty();
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

      $('.options').on('click', function(){ 
        if($(this).text() === data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty(); 
          $('.other_option').show(); 
          $('.other_option').text('Next'); 
          $('.info').append(`<h4 class="correct"><i class="far fa-check-square"></i> Correct answer!</h4>`);

          correctAnswers ++; console.log(correctAnswers)
        }
        if($(this).text() !== data.results[counter].correct_answer  && counter !== 15){
          $('.info').empty();
          $('.other_option').show();
          $('.other_option').text('Next');
          $('.info').append(`<h4 class="error"><i class="fas fa-times"></i> Wrong answer!</h4><h5 class="correct-answer"><i class="far fa-check-square"></i> Correct Answer is: 
          ${data.results[counter].correct_answer}</h5>`);
          
        }counter ++; 

        if(counter === 15){
          $('.info').empty();
          $('.multiple_option').hide();
          $('.info').append(`<button class="go_back btn-default btn">HOME</button>
          <h4>Your results</h4><h5>You got ${correctAnswers} out of 15</h5>`)
         
        } 

      }); 

  })
});
