const puppeteer = require('puppeteer'),
    fs = require('fs');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://buscheb.ru/');
    page.on('response', async function (response) {
        if (response.url().includes("https://buscheb.ru/php/getVehiclesMarkers.php")) {
            console.log(response.url());
            let text = await response.text();
            let time = parseInt((new Date()).getTime() / 1000);
            fs.writeFile(`runtime/${time}.json`, text, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
    });

    while (true) {
        await sleep(2000);
    }

    await browser.close();
})();
