const test = function() {
    console.log('testing');
}

console.log('testing');


async function loadScript(url) {
    let response = await fetch(url);
    let script = await response.text();
    eval(script);
}

let scriptUrl = 'https://raw.githubusercontent.com/Sander-Brilman/lester_cheat_remastered/master/engels-script.js'
loadScript(scriptUrl);