// including xmlhttprequest for doing the requests
import XMLHttpRequest from 'xhr2';
var xmlhttprequest = new XMLHttpRequest();

// url from the api
let url = "https://api.ayo.so/check-username/";

// cooldown for interval
let cooldown = 250;

// make an array for working names/words.
let availablenames = [];

// length of the random strings
let lngth = 5;

function generateName(length)
{
    let dic = "abcdefghijklmnopqrstuvwxyz0123456789";
    var generatedName = "";
    for(var x = 0; x < length; x++)
    {
        generatedName += dic.charAt(Math.floor(Math.random() * dic.length))
    }
    return generatedName;
}

function checkUsername(username)
{
    xmlhttprequest.open("GET", `${url}${username}`)

    xmlhttprequest.onreadystatechange = function()
    {
        // if the request is succesfully
        if(xmlhttprequest.readyState == 4)
        {
            let response = JSON.parse(xmlhttprequest.responseText);
            
            // name is taken
            if(response.taken == true)
            {
                console.log(`[NOT AVAILABLE] ${username} is taken and cant be used.`)
            }
            // name is not taken
            else
            {
                console.log(`[AVAILABLE] ${username} is not taken and can be used for registration.`)
                availablenames.push(username);
                addToSuccesfullyNames(username);
            }
        }
    }

    xmlhttprequest.send();
}

function addToSuccesfullyNames(name)
{
    try
    {
        fs.readFile('Names.txt', 'utf8', function(error, data)
        {
            data += `\n${name}`;
            fs.writeFile('Names.txt', data, function(error, result)
            {
                if(error) console.log(error);
            });
        })
    }
    catch(error)
    {   
        console.log(error);
    }
}

setInterval(() => {
    checkUsername(generateName(lngth))
}, cooldown);