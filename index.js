const csv = require('csv-parser');
const fs = require('fs');

const inputFile = 'data.csv';
const deliveredOutputFile = 'output/delivered.json';
const administeredOutputFile = 'output/administered.json';
const deliveredTooltipsOutputFile = 'output/delivered-tooltips.json';
const administeredTooltipsOutputFile = 'output/administered-tooltips.json';

const stateDataKey = 'awardee';
const abbrDataKey = 'awardee_code';
const deliveriesKey = 'Total Deliveries';
const deliveriesJurisdictionKey = 'Jurisdiction';
const deliveriesPharmacyKey = 'Federal Retail Pharmacy Program';
const deliveriesHRSAKey = 'HRSA FQHC Program';
const deliveriesFEMAKey = 'FEMA CVC Pilot Program';
const deliveriesHHS = 'HHS/NIH Program';
const deliveriesDialysis = 'Renal Dialysis Program';
const deliveriesFederalKey = 'Federal Entities';

const administeredKey = 'Total Administrations';
const administeredFederalKey = 'Federal Entities Administrations';
const administeredJurisdictionKey = 'Jurisdiction + Federal Programs';

const deliveredDataHeaderRow = ['x'];
const deliveredDataKeys = [deliveriesFederalKey, deliveriesJurisdictionKey, deliveriesFEMAKey, deliveriesPharmacyKey, deliveriesHRSAKey, deliveriesHHS, deliveriesDialysis];
const deliveredDataRows = {};
const deliveredTooltips = {};

const administeredDataHeaderRow = ['x'];
const administeredDataKeys = [administeredFederalKey, administeredJurisdictionKey];
const administeredDataRows = {};
const administeredTooltips = {};

deliveredDataKeys.forEach((dataKey) => {
    deliveredDataRows[dataKey] = [dataKey.trim()];
});

administeredDataKeys.forEach((dataKey) => {
    administeredDataRows[dataKey] = [dataKey.trim()];
});

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {console.log(row);
    let deliveredTotal = parseInt(row[deliveriesKey].replace(/,/g, ''));
    let administeredTotal = parseInt(row[administeredKey].replace(/,/g, ''));

    deliveredDataHeaderRow.push(`${row[abbrDataKey]} (${Math.round(deliveredTotal / 10000) /100})`);
    administeredDataHeaderRow.push(`${row[abbrDataKey]} (${Math.round(administeredTotal / 10000) /100})`);

    deliveredTooltips[`${row[abbrDataKey]} (${Math.round(deliveredTotal / 10000) /100})`] = row[stateDataKey];
    administeredTooltips[`${row[abbrDataKey]} (${Math.round(administeredTotal / 10000) /100})`] = row[stateDataKey];

    deliveredDataKeys.forEach((dataKey) => {
        let value = row[dataKey] ? parseInt(row[dataKey].replace(/,/g, '')) : undefined;
        if(!value){
            deliveredDataRows[dataKey].push(0);
        } else {
            deliveredDataRows[dataKey].push(Math.round(value / deliveredTotal * 10000) / 10000);
        }
    });
    administeredDataKeys.forEach((dataKey) => {
        let value = row[dataKey] ? parseInt(row[dataKey].replace(/,/g, '')) : undefined;
        if(!value){
            administeredDataRows[dataKey].push(0);
        } else {
            administeredDataRows[dataKey].push(Math.round(value / administeredTotal * 10000) / 10000);
        }
    });
  })
  .on('end', () => {
    let deliveredOutput = [deliveredDataHeaderRow];
    let administeredOutput = [administeredDataHeaderRow];

    deliveredDataKeys.forEach((dataKey) => {
        deliveredOutput.push(deliveredDataRows[dataKey]);
    });

    administeredDataKeys.forEach((dataKey) => {
        administeredOutput.push(administeredDataRows[dataKey]);
    });

    fs.writeFile(deliveredOutputFile, JSON.stringify(deliveredOutput), {flag: 'w'}, (err) => {
        console.log(err);
    });

    fs.writeFile(administeredOutputFile, JSON.stringify(administeredOutput), {flag: 'w'}, (err) => {
        console.log(err);
    });

    fs.writeFile(deliveredTooltipsOutputFile, JSON.stringify(deliveredTooltips), {flag: 'w'}, (err) => {
        console.log(err);
    });

    fs.writeFile(administeredTooltipsOutputFile, JSON.stringify(administeredTooltips), {flag: 'w'}, (err) => {
        console.log(err);
    });
  });
