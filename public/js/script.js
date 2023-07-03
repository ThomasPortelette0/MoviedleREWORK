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

async function fetchFilms()
{
    try 
    {
        const response = await fetch('films.json');
        const data = await response.json();
        const keys = Object.keys(data);

        const displayNames = keys.map(key => data[key].displayName);
        return displayNames;
    }
    catch(err)
    {
        console.log(err);
    }
    return [];
}

let FILMS_ARRAY = [];

fetchFilms().then(films => FILMS_ARRAY = films);

function guess_mode(guess)
{
   guess_input = document.getElementsByTagName('input')[0];

   if(guess_input.value === guess)
   {
        guess_input.value = "";
       return true;
   }
   guess_input.value = "";
   return false;

}

function autocomplete()
{
    const input = document.getElementById("guessinput");
    const ulresults = document.getElementById("infobulle");

    input.addEventListener('input',function() 
    {
        ulresults.innerHTML = "";
        const value = this.value;
        if(!value)
        {
            return;
        }
        
        const matches = FILMS_ARRAY.filter(film => film.toLowerCase().includes(value.toLowerCase()));


        if(matches.length===0)
        {
            return;
        }

        for(var i = 0; i<matches.length; ++i)
        {
            const li = document.createElement('li');
            li.innerText = matches[i];
            li.addEventListener('click',function()
            {
                input.value = this.innerText;
                ulresults.innerHTML = "";
            });
            ulresults.appendChild(li);
        
        }

    });

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
    autocomplete();

});
