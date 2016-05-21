var Zoho = require('node-zoho');
var fs = require('fs');
var token = 'Enter your toke here';
if(token == 'Enter your toke here'){
    throw new Error('Enter your toke here on line 3 of file run.js');
}
zoho = new Zoho({authToken:token});

zoho.execute('crm', 'Leads', 'getRecords', function (err, result) {
    console.log('Leads loaded!');
    if (err !== null) {
        console.log(err);
    } else if (result.isError()) {
        console.log(result.message);
    } else {
        var tempArray = prepareArray(result);
        var csvContent = prepareCsv(tempArray);
        var file = 'output.csv';
        writeToFile(file,csvContent);
    }
});

function prepareArray(input){
    var index = 0;
    var headers = [];
    var temp = [];
    var final = [];
    input.data.forEach(function(el){
        if(index == 0){
            index++;
            for(key in el){
                headers.push(key);
            }
            final[0] = headers
        }
        temp = [];
        for(key in el){
            temp.push(el[key]);
        }
        final.push(temp);
    });
    console.log('Array prepared!');
    return final;
}

function prepareCsv(input){
    var formatted = input.map(function (line) {
        return line.join(';');
    }).join('\r\n');
    console.log('csv prepared!');
    return formatted;
}

function writeToFile(filename, content){
    var writeStream = fs.createWriteStream(filename);
    writeStream.write(content);
    writeStream.close();
    console.log(filename + ' written!');
}