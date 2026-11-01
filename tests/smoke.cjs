const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', route =>
    route.fulfill({status:200, contentType:'application/json',body:JSON.stringify({type:'FeatureCollection',metadata:{generated:Date.now()},features:[{type:'Feature',id:'test-event',properties:{mag:4.2,place:'Test Region',time:Date.now(),updated:Date.now(),status:'reviewed',url:'https://earthquake.usgs.gov/earthquakes/eventpage/test-event'},geometry:{type:'Point',coordinates:[-120,35,10]}}]})}));
  await page.route('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=300',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({events:[{id:'EONET_TEST',title:'Example wildfire',categories:[{title:'Wildfires'}],link:'https://eonet.gsfc.nasa.gov/',geometry:[{type:'Point',coordinates:[-122,45],date:'2026-11-01T00:00:00Z'}]}]})}));
  await page.route('https://api.gbif.org/v1/occurrence/search?**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({results:[{key:123,scientificName:'Panthera leo',decimalLatitude:-1.3,decimalLongitude:36.8,eventDate:'2026-01-01',datasetKey:'test'}]})}));
  await page.goto('http://127.0.0.1:8080/',{waitUntil:'domcontentloaded'});
  await page.locator('#summary').waitFor();
  assert.match(await page.locator('#summary').innerText(),/1 of 1/);
  await page.selectOption('#dataset','gbif');await page.click('#loadBtn');
  await page.getByText('Panthera leo',{exact:false}).first().waitFor();
  assert.match(await page.locator('#dataNotice').innerText(),/GBIF BIODIVERSITY RECORDS/);
  await page.selectOption('#dataset','nasa');await page.click('#loadBtn');
  await page.getByText('Example wildfire',{exact:false}).first().waitFor();
  assert.match(await page.locator('#dataNotice').innerText(),/NASA NATURAL EVENTS/);
  await page.selectOption('#dataset','usgs');await page.click('#loadBtn');
  await page.getByText('M 4.2 · Test Region',{exact:false}).first().waitFor({timeout:15000});
  await page.selectOption('#minimum','4.5');
  assert.match(await page.locator('#summary').innerText(),/0 of 1/);
  await page.selectOption('#minimum','2.5');
  assert.match(await page.locator('#summary').innerText(),/1 of 1/);
  assert.equal(await page.locator('#records a[href^="https://earthquake.usgs.gov/"]').count(),1);
  assert.match(await page.locator('#status').innerText(),/USGS feed generated/);
  await page.fill('#search','nothingmatches');
  assert.match(await page.locator('#summary').innerText(),/0 of 1/);
  await page.fill('#search','');
  await page.selectOption('#dataset','demo');await page.click('#loadBtn');
  assert.match(await page.locator('#summary').innerText(),/4 of 4/);

  // Import a local GeoJSON Point and confirm dataset isolation.
  const geo={type:'FeatureCollection',features:[{type:'Feature',properties:{title:'Imported test record',domain:'Climate',source:'Local fixture'},geometry:{type:'Point',coordinates:[2,48]}}]};
  await page.locator('#file').setInputFiles({name:'fixture.geojson',mimeType:'application/geo+json',buffer:Buffer.from(JSON.stringify(geo))});
  await page.getByText('Imported test record',{exact:false}).first().waitFor();
  assert.equal(await page.locator('#dataset').inputValue(),'import');
  assert.match(await page.locator('#summary').innerText(),/1 of 1/);
  // Export should contain exactly the visible imported observation.
  const [download]=await Promise.all([page.waitForEvent('download'),page.click('#exportBtn')]);
  const exportText=await require('node:fs/promises').readFile(await download.path(),'utf8');
  const exported=JSON.parse(exportText);
  assert.equal(exported.features.length,1);
  assert.equal(exported.features[0].properties.title,'Imported test record');
  // Network failure preserves imported observations.
  await page.unroute('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
  await page.route('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',route=>route.abort('failed'));
  await page.selectOption('#dataset','usgs');await page.click('#loadBtn');
  await page.getByText(/Could not load USGS data/).waitFor();
  assert.match(await page.locator('#summary').innerText(),/1 of 1/);
  await page.selectOption('#dataset','import');await page.click('#loadBtn');
  assert.match(await page.locator('#summary').innerText(),/1 of 1/);
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log('PASS: demo, mocked USGS, search, import/export, dataset isolation, network failure, no page errors');
})().catch(e=>{console.error(e);process.exit(1);});