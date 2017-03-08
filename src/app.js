var Spreadsheet = require('edit-google-spreadsheet');
var fs = require('fs');
var lanObj = {}
var header;
var generateBtn = document.querySelector('#generateBtn');
var reloadBtn = document.querySelector('#reloadBtn');
var selectFolderBtn = document.querySelector('#selectFolderBtn');
var folderSelector = document.querySelector('#folderSelector');
var loadingIcon = document.querySelector('#loadingIcon');
var folderLocation = document.querySelector('#folderLocation');
var config = require('./config.json');

init();

function init() {
    loadFolderLocation();
    loadSpreadsheet();
}

function loadFolderLocation() {
    folderLocation.value = config.folderLocation;
}

function loadSpreadsheet() {
    startLoading();
    Spreadsheet.load({
        debug: true,
        spreadsheetId: '1w1GL6VSwN44aXuoHjezENBMYZ7Z_rUsdlzhi39z5yRw',
        worksheetName: 'Resource',
        "oauth2": {
            "client_id": "603125624674-lg2joq0uaqtmcpv0k7o241lgg95mblbs.apps.googleusercontent.com",
            "client_secret": "UbeZKoW-S_bJtf_7niTy9-ZM",
            "refresh_token": "1/Bc9P66kqYk980tIE7Ib0Ec-hocdgJ4jSwYZN6vyrR-s"
        }
    }, function sheetReady(err, spreadsheet) {
        //use speadsheet!
        if (err) throw err;

        spreadsheet.receive(function (err, rows, info) {
            if (err) throw err;
            header = rows[1];
            for (var colNum in header) {
                if (colNum > 2) {
                    lanObj[colNum] = {};
                }
            }
            for (var rowNum in rows) {
                if (rowNum > 1) {
                    var row = rows[rowNum];
                    var key = row[1];
                    for (var colNum in row) {
                        if (colNum > 2) {
                            var cell = row[colNum];
                            lanObj[colNum][key] = cell;
                        }
                    }
                }
            }
            endLoading();
        });
    });
}

function startLoading() {
    generateBtn.disabled = reloadBtn.disabled = true;
    loadingIcon.style.visibility = 'visible';
}

function endLoading() {
    generateBtn.disabled = reloadBtn.disabled = false;
    loadingIcon.style.visibility = 'hidden';
}

selectFolderBtn.onclick = () => {
    folderSelector.click();
}

folderSelector.onchange = (event) => {
    var dir = event.target.files[0];
    if (dir) {
        config.folderLocation = folderLocation.value = dir.path;
    }
};

reloadBtn.onclick = loadSpreadsheet;

generateBtn.onclick = () => {
    var targetFolder = folderLocation.value;
    for (var colNum in lanObj) {
        var language = header[colNum];
        var keyVals = lanObj[colNum];
        fs.writeFileSync(`${targetFolder}/${language}.json`, JSON.stringify(keyVals));
    }
    require('child_process').exec(`start "" "${targetFolder}"`);
    fs.writeFileSync("config.json", JSON.stringify(config));
}