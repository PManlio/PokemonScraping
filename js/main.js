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

rp(url+'tyranitar/')
    .then((html) => {
        for(i=0; i<weakness.length; i++) {
            let typeMod = (cheerio(weakness[i], html).text());
            if (typeMod != "") {
                let number = typeMod.match(regex).map(v => parseFloat(v));
                //console.log(weakness[i]+' '+number);
                if(number < 1){
                    strgMod.push(weakness[i]+' '+number);
                }
                if(number > 1){
                    weakMod.push(weakness[i]+' '+number);
                }
            }
        }
        console.log(strgMod);
        console.log(weakMod);
    })
    .catch((err) => {
        console.log(err);
    })