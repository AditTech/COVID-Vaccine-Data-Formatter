#COVID Vaccine Data Formatter

Script which formats data that is uploaded to https://www.cdc.gov/coronavirus/2019-ncov/vaccines/distributing/jurisdiction-portfolios.html

##Setup

1. Clone repository
2. Run `npm install` at root


##Data Update Instructions

1. Open Excel file
    a. Ensure awardee_code column doesn't have extra characters
    b. Ensure that "Federal Entities" column isn't duplicated (change second column name to "Federal Entities Administrations")

2. Save Excel file as UTF-8 encoded CSV named "data.csv" at root

3. Run `node index` at root

4. Download a current copy of the json config file for the Administered chart at https://www.cdc.gov/coronavirus/2019-ncov/vaccines/distributing/covid-vaccines-administered.json
    a. Update the value of the "columns" property with the contents of this output file: outputs/administered.json
    b. Update the value of the "tooltipTitleMapping" property with the contents of tis output file: outputs/administered-tooltips.json
    c. In the WCMS chart editor, use the "Import Chart Settings" button to upload the resulting JSON config file

5. Download a current copy of the json config file for the Delivered chart at https://www.cdc.gov/coronavirus/2019-ncov/vaccines/distributing/covid-vaccines-delivered.json
    a. Update the value of the "columns" property with the contents of this output file: outputs/delivered.json
    b. Update the value of the "tooltipTitleMapping" property with the contents of tis output file: outputs/administered-delivered.json
    c. In the WCMS chart editor, use the "Import Chart Settings" button to upload the resulting JSON config file

6. In the WCMS, upload data.csv file to /coronavirus/2019-ncov/json/covid-vaccines-data.csv

7. Update/request that the web team updates the dates in the content below the charts on the page, and the review/publish dates for the page