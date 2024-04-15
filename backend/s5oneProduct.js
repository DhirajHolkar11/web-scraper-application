// Remove unnecessary import statements and express setup
const puppeteer = require('puppeteer');




async function runPuppeteer(searchQuery) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.goto('https://www.flipkart.com', { waitUntil: 'networkidle2' });

    try {
        await page.click('button[class="_2KpZ6l _2doB4z"]');
        console.log('Closed login popup');
    } catch (error) {
        console.log('No login popup, continuing');
    }

    await page.type('input[name="q"]', searchQuery);
    await page.keyboard.press('Enter');

    await page.waitForSelector('div[class="_1AtVbE"]', { visible: true });

    const productsData = await page.evaluate(() => {
        const products = [];

        const productNameElements = document.querySelectorAll('div[class="_4rR01T"]');
        const productPriceElements = document.querySelectorAll('div[class="_30jeq3 _1_WHN1"]');

        for (let i = 0; i < Math.min(productNameElements.length, productPriceElements.length, 10); i++) {
            const productName = productNameElements[i].innerText.trim();
            const productPrice = productPriceElements[i].innerText.trim();

            products.push({ name: productName, price: productPrice });
        }

        return products;
    });

    await browser.close();
    return productsData;
}





// Export only the runPuppeteer function
module.exports = { runPuppeteer };
