function random_film_image(json_file)
{
    const image = document.getElementsByTagName('img')[0];

    fetch(json_file)
    .then(response => {
        return response.json();
    })
    .then(data => { 
        const keys = Object.keys(data);
        const random_key = keys[Math.floor(Math.random() * keys.length)];
        const random_film = data[random_key];
        image.src = random_film.imageUrl;
        return random_film.displayName;
  
    })
    .then(guess_mode)
    .then(isCorrect => {
        if (isCorrect)
        random_film_image('films.json')})
    .catch(err => {
        console.log(err);
    });

}


function guess_mode(guess)
{
    return new Promise((resolve, reject) => {
    guess_input = document.getElementsByTagName('input')[0];
    const guess_button = document.getElementsByTagName('button')[0];

    console.log(guess);
    console.log(guess_input.value);
  
    guess_button.addEventListener('click', () => {
        if (guess_input.value === guess)
        {
            resolve(true);

        }
        else
        {
           resolve(false);
        }
    });

    });


}


document.addEventListener('DOMContentLoaded', () => 
    random_film_image('films.json'));
