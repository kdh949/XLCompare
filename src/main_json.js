const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function excelToJSON(inputFile) {
    const outputFolder = 'output';
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputFile);

        const totalSheets = workbook.worksheets.length;
        const sheetsToConvert = totalSheets - 5;

        workbook.eachSheet(async (worksheet, sheetId) => {
            if (sheetId < sheetsToConvert) {
                const colorTags = {
                    'FFd9e2f3': 'Buyer',      
                    'FFfbe4d5': 'Supplier',   
                    'FFfef2cb': 'Calculation',
                    'FFe2efd9': 'System'      
                };

                const jsonData = [];
                worksheet.eachRow((row, rowNumber) => {
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const columnName = `column${colNumber}`;
                        const cellValue = cell.value;
                        const cellColor = cell.fill && cell.fill.fgColor && cell.fill.fgColor.argb;
                        const tag = colorTags[cellColor] || '';
                        rowData[columnName] = {
                            value: cellValue,
                            color: cellColor,
                            tag: tag
                        };
                    });
                    jsonData.push(rowData);
                });

                const outputJsonFile = path.join(outputFolder, `${worksheet.name}.json`);
                fs.writeFileSync(outputJsonFile, JSON.stringify(jsonData, null, 2));
            }
        });
    } catch (error) {
        console.error('Error converting Excel to JSON:', error);
    }
}

const inputExcelFile = 'input.xlsx';
excelToJSON(inputExcelFile);
