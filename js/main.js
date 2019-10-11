// before run > npm install -g browserify
// once your js file is up, run > browserify main.js -o bundle.js
// then go into index.html and include <script src="./js/bundle.js"></script>
const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://rankedboost.com/pokemon-go/';
const regex = /[+-]?\d+(\.\d+)?/g;

var weakness = [
    '.Normal',
    '.Fire',
    '.Water',
    '.Grass',
    '.Electric',
    '.Ice',
    '.Fighting',
    '.Poison',
    '.Ground',
    '.Flying',
    '.Psychic',
    '.Bug',
    '.Rock',
    '.Ghost',
    '.Dark',
    '.Dragon',
    '.Steel',
    '.Fairy',
];
var weakMod = [];
var strgMod = [];

document.getElementById('pokebutton').addEventListener("click", () => {
    rp(url+document.getElementById('pokename').value, {mode: 'no-cors'}, 
    (error, response, body) => {
        if(error){
            console.log(error);
        } else {
            console.log(response + body);
        }
    })
    .then((html) => {
        weakness.forEach((type) => {
            let typeMod = (cheerio(type, html).text());
            if (typeMod != "") {
                let number = typeMod.match(regex).map(v => parseFloat(v));
                //console.log(type+' '+number);
                if(number < 1){
                    strgMod.push(type+' '+number);
                }
                if(number > 1){
                    weakMod.push(type+' '+number);
                }
            }
        });
        console.log(strgMod);
        console.log(weakMod);
    })
    .then(() => {
        console.log('secondo then()!');
        let box = document.createElement('div');
        let text = document.createTextNode(weakMod+'<br>'+strgMod);
        box.appendChild(text);
    })
    .catch((err) => {
        console.log(err);
    });
});
