//Set the path to the json file
const path = "./data/samples.json";

// Using D3 to get Promise Pending to the data
const dataPromise = d3.json(path);
//console.log("Data Promise: ", dataPromise);


// // Fetch the JSON data and console log it
d3.json(path).then(function(data) {
console.log("All JSON:",data);

});

//The function that load the initial dataset of IDs to dropdown
function init(){
  d3.json(path).then(function(data){
  data.names.forEach((sample)=> {
  d3.select("#selDataset").append("option").text(sample).property("value",sample);
  

  })})};

 //Running init function SHOULD BE AT END  
 init();


  d3.select("#selDataset").on("change", getData());  
  
  // Function get Data called by DOM changes
function getData() {
    
  d3.json(path).then(function(data){ 
 
  // MATCH THE DROPDOWN SECTION  
    var dropdownMenu = d3.select("#selDataset");  //assign variable DROPDOWNMENU TO THE D3 SELECTION OF #selDataset ID
    
    var selected_id = dropdownMenu.property("value");  // Assign the value of the dropdown menu option to a variable
    // console.log("Selected ID:",selected_id);  //CONSOLE LOG THE SELECTED ID
    
      var match = data.names.filter(function(match_id) {    // Find the matching ID 
       return match_id === selected_id   // return the match id back to the parent function as variable MATCH 
           
    })

    //   console.log("Matched ID:",match) ;   //confirm the match to SELECTED_ID variable in console log 37
          
      //Find the metadata for the selected ID
      var found=data.metadata.find(mine =>mine.id==selected_id)
      console.log("Found:",found)
      //Find the samples for the selected ID
      var samples=data.samples.find(sample =>sample.id==selected_id)
      console.log("Samples:",samples)
      
      
      // var table = d3.select("#mytable");
      // //table.html("")
      // // var table = d3.select("table");
      // table.attr("class", "table table-striped");
           
      // Object.entries(found).forEach(entry => {
      //   const [key, value] = entry;
      //   console.log(key, value);
      //   var tbody = d3.select("tbody"); // Use D3 to select the table body
      //   var row = tbody.append("tr"); // Append one table row `tr` to the table body
      //   row.append("tr").text(`${key}: ${value}`);
        
      //  table.append("td").text(`${key}: ${value}`);
      var table_data=d3.select("#metadata")
      table_data.html("")
      Object.entries(found).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        table_data.append("p").text(`${key}: ${value}`);

      })
      
     
  // // FILL THE TABLE SECTION
  
//var xtest=samples.sample_values.sort(d3.descending).slice(0,10)
var xtest=samples.sample_values.slice(0,10).reverse()
var ytest=samples.otu_ids.slice(0,10).reverse()
var hover_labels=samples.otu_labels.slice(0,10).reverse()
ytest_strings=ytest.map(String)
ytestnew=ytest_strings.map(i => `OTU ID `+ i);
var wfreq_value=found.wfreq
console.log(wfreq_value)

var bubble_labels=samples.otu_labels.reverse()
var xbubble=samples.sample_values.reverse()
var ybubble=samples.otu_ids.reverse()

console.log("Sample values:", xtest)
console.log("OTU IDs:",ytestnew)
console.log("OUT Labels:",hover_labels)



  // The horitontal bar chart  
    let trace1 = [{
        x: xtest,
        y: ytestnew,
        text:hover_labels,
        type: "bar",
        orientation: 'h'

    }];
    var layout = {
        autosize: true,
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

  // The bubble chart  
    var trace2 = {
        x: ybubble,
        y: xbubble,
        text:bubble_labels,
        mode: 'markers',
        marker: {
        size: xbubble,
        color:ybubble
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: '',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', data2, layout2);

    //The gauge chart  
      var data3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq_value,
            title: { text: "<b>Bully Button Washing Frequency</b> <br> Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout3);
    

 })};


