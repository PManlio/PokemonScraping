const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const regex = /[+-]?\d+(\.\d+)?/g;
const url = 'https://rankedboost.com/pokemon-go/';

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

document.getElementById('pokebutton')
.addEventListener('click', async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width:1920, height: 926});
    await page.goto(url+document.getElementById('pokename').value);

    weakness.forEach(type => {
        try {
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
        }
        catch (exception) {
            console.log(exception);
        }
    });
    
    return () => {
        let box = document.createElement('div');
        let text = document.createTextNode(weakMod+'<br>'+strgMod);
        box.appendChild(text);
    }
})