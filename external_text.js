/*this is for putting text files in multipule html pages*/
var fs = require("fs");
fs.readFile("test_text.txt", function(text){
    var test = text.split("\n");
});
function test(){
    var text = "test_text";
    document.getElementById("test").innerHTML += test;
};
