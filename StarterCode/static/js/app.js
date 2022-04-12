//Set the path to the json file
const path = "./samples.json";

// Using D3 to get Promise Pending to the data
const dataPromise = d3.json(path);
//console.log("Data Promise: ", dataPromise);


// // Fetch the JSON data and console log it
d3.json(path).then(function(data) {
console.log("All JSON:",data);

});
// Function called by DOM changes
// function getData() {
// var optionsData = data.names;
// console.log(optionsData)
// var selectTag = d3.select("#selDataset")
// selectTag.forEach((sample)=> {
// d3.select("#selDataset").append("option").text(sample).property("value",sample);
// //console.log(sample)
// })};
//console.log(sample)

// Function get Data called by DOM changes
function getData(data) {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var selected_id = dropdownMenu.property("value");
    console.log("Selected ID:",selected_id);
    // Find the matching ID 
    var match = data.filter(obj => {
      return obj.names === selected_id;
    })};


function init(){
d3.json(path).then(function(data){
data.names.forEach((sample)=> {
d3.select("#selDataset").append("option").text(sample).property("value",sample);      
})})};      


init();

d3.json(path).then(function(data){
    console.log("Data found:",data.samples)
    var otu_ids=data.samples.map(function (data1) {return data1.otu_ids})
    console.log("OTU ID:",otu_ids)
    var otu_values=data.samples.map(function (data1) {return data1.sample_values})
    console.log("OTU Value:",otu_values)
    var hovers=data.samples.map(function (data1) {return data1.otu_labels})
    console.log("OTU Labels:",hovers)

    let trace1 = [{
        x: otu_values.slice(0,10),
        y: otu_ids,
        type: "bar",
        orientation: 'h'
    }];
    var layout = {
        autosize: false,
        //title: "Top Categories by Most Trending Days",
        //titlefont: { size:25 },
        width: 300,
        height: 500,
        xaxis: {
          title: {
            text: 'Categories'
          },
          automargin: true,
          titlefont: { size:20 },
        },
        yaxis: {
        title: '',
        automargin: true,
        titlefont: { size:20 },
        },
    };

    Plotly.newPlot("bar", trace1,layout)

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        mode: 'markers',
        marker: {
          size: [40, 60, 80, 100]
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Marker Size',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data2, layout2);

      var data3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "<b>Bully Button Washing Frequency</b> <br> Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout3);
    
    d3.selectAll("#selDataset").on("change", function () {
        getData(data)});
})



d3.json(path).then(function(mdata){
    console.log("Data found:",mdata.id)
    var id=mdata.metadata.map(function (mdata1) {return mdata1.id} )
    console.log("ID:",id)
    var ethnicity=mdata.metadata.map(function (mdata1) {return mdata1.ethnicity})
    console.log("Ethnicity:",ethnicity)
    var gender=mdata.metadata.map(function (mdata1) {return mdata1.gender} )
    console.log("Gender:",gender)
    var age=mdata.metadata.map(function (mdata1) {return mdata1.age} )
    console.log("Age:",age)
    var location=mdata.metadata.map(function (mdata1) {return mdata1.location} )
    console.log("Location:",location)
    var bbtype=mdata.metadata.map(function (mdata1) {return mdata1.age} )
    console.log("Age:",bbtype)
    var wfreq=mdata.metadata.map(function (mdata1) {return mdata1.location} )
    console.log("Location:",wfreq)

// The new ID and add to the table
var newID = [id[0]];


// Use d3 to create a bootstrap striped table
//http://getbootstrap.com/docs/3.3/css/#tables-striped

// Use D3 to select the table
var table = d3.select("table");
table.attr("class", "table table-striped");


var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("ID:"+id[0]); // Append one cell for the student name
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("Ethnicity:"+ethnicity[0]);
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("Gender:"+gender[0]);
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("Age:"+age[0]);
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("Location:"+location[0]);
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("BB Type:"+bbtype[0]);
var tbody = d3.select("tbody"); // Use D3 to select the table body
var row = tbody.append("tr"); // Append one table row `tr` to the table body
row.append("td").text("W Freq:"+wfreq[0]);
})