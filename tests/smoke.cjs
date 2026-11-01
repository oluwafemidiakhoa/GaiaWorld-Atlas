const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', route =>
    route.fulfill({status:200, contentType:'application/json',body:JSON.stringify({type:'FeatureCollection',metadata:{generated:Date.now()},features:[{type:'Feature',id:'test-event',properties:{mag:4.2,place:'Test Region',time:Date.now(),updated:Date.now(),status:'reviewed',url:'https://earthquake.usgs.gov/earthquakes/eventpage/test-event'},geometry:{type:'Point',coordinates:[-120,35,10]}}]})}));
  await page.goto('http://127.0.0.1:8080/',{waitUntil:'domcontentloaded'});
  await page.locator('#summary').waitFor();
  assert.match(await page.locator('#summary').innerText(),/4 of 4/);
  await page.selectOption('#dataset','usgs');await page.click('#loadBtn');
  await page.getByText('M 4.2 · Test Region',{exact:false}).first().waitFor({timeout:15000});
  assert.match(await page.locator('#status').innerText(),/USGS feed generated/);
  await page.fill('#search','nothingmatches');
  assert.match(await page.locator('#summary').innerText(),/0 of 1/);
  await page.fill('#search','');
  await page.selectOption('#dataset','demo');await page.click('#loadBtn');
  assert.match(await page.locator('#summary').innerText(),/4 of 4/);
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log('PASS: demo, USGS mock load, search filtering, demo restore, no page errors');
})().catch(e=>{console.error(e);process.exit(1);});