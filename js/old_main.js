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
        
    })
    .catch((err) => {
        console.log(err);
    })