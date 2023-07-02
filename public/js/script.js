async function random_film_image(json_file)
{
    try
    {
        const response = await fetch(json_file);
        const data = await response.json();

        const keys = Object.keys(data);
        const random_key = keys[Math.floor(Math.random() * keys.length)];
        const random_film = data[random_key];

        const image = document.getElementsByTagName('img')[0];
        image.src = random_film.imageUrl;

        return random_film.displayName;
       
    }
    catch(err)
    {
        console.log(err);
    }

}


function guess_mode(guess)
{
   guess_input = document.getElementsByTagName('input')[0];

   if(guess_input.value === guess)
   {
       return true;
   }
   return false;

}


document.addEventListener('DOMContentLoaded', async () => {
    var start = await random_film_image('films.json');
    const guess_button = document.getElementsByTagName('button')[0];
    guess_button.addEventListener('click', async () => {
        if(guess_mode(start))
        {
            start = await random_film_image('films.json');
        }
    });
});