var express = require('express');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));
// 访问单页
app.get('/', function (req, res) {
    var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html);
});
// 监听
app.listen(8081, function () {
    console.log('success listen...8081');
});

var JsonDB = require('node-json-db');
var db = new JsonDB("meetingTime", true, false);

app.post('/storeTime', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    db.push("/home/" + req.body.project + "[]", req.body, true);
    res.send('success');


});


app.get('/predictData', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    var timeRange = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
    var projects = db.getData('/home');
    var dateSet = new Set();
    var result = {};
    var final = {};
    for (var key in projects) {
        result[key] = [];
        for (var k in projects[key]) {
            dateSet.add(projects[key][k]['date']);

        }
        var project = {};
        for (var k in projects[key]) {
            project[projects[key][k]['name']] = [];
        }
        for (var k in projects[key]) {
            project[projects[key][k]['name']].push({
            "date":projects[key][k]['date'],
            "start":projects[key][k]['start'],
            "end":projects[key][k]['end']})
            
        }

        //遍历每一天的每一个时间段
        for (var dateValue of dateSet) {
            var start = -1;
            var end = -1;
            var indexSet = new Set();//去重，合并时间段。
            for (var j = 0; j < timeRange.length - 1; j++) {
                var count = 0;


                //遍历每一个时间记录
                for (var name in project) {
                    var flag = 0 ;
                    for(var kk in project[name]){
                        if (project[name][kk]['date'] == dateValue && project[name][kk]['start'] <= timeRange[j] && timeRange[j + 1] <= project[name][kk]['end']) {
                        flag = 1;
                        }
                    }
                    if (flag){
                        count += 1;
                    }
                }
                //超过8成人的共同时间
                if (count > projects[key].length * 0.6) {
                    if (indexSet.has(j)) {
                        indexSet.delete(j);
                    } else {
                        indexSet.add(j);
                    }
                    if (indexSet.has(j + 1)) {
                        indexSet.delete(j + 1);
                    } else {
                        indexSet.add(j + 1);
                    }
                }
            }
            var indexArray = Array.from(indexSet);

            for (var i = 0; i < indexArray.length - 1; i += 2) {

                result[key].push({ "date": dateValue, "start": timeRange[indexArray[i]], "end": timeRange[indexArray[i + 1]] });
            }
            indexSet.clear();
        }

        dateSet.clear();
    }
    res.send(result);

});

app.get('/getshow', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var projects = db.getData("/home");
    var result = [];
    for (var key in projects) {
        result = result.concat(projects[key]);
    }
    res.send(result);
});

app.get('/getProject', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(db.getData("/name"));
});

app.post('/deleteProject', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.body.projectName){
    res.send('null');
    return;
	}
    db.delete('/home/' + req.body.projectName);
    var names = db.getData('/name');
    var index = names.indexOf(req.body.projectName);
    if (index > -1) {
        db.delete('/name[' + index + ']');
    }
    res.send('success');
});

app.post('/delete', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    var project = db.getData('/home/' + req.body.project);
    for (var key in project) {
        if (project[key].name == req.body.name &&
            project[key].date == req.body.date &&
            project[key].start == req.body.start &&
            project[key].end == req.body.end) {
            db.delete('/home/' + req.body.project + "[" + key + "]")
        }
    }
    res.send('success');
});

app.post('/addProject', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    db.push("/name[]", req.body.projectName, true);
    res.send('success');
});
