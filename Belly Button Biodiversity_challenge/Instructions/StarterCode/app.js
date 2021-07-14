// from data.js



function demographic(sample) {
     d3.json("samples.json").then(function (data) {
          var metadata = data.metadata;
          var demographicInfo = metadata.filter(row => row.id === sample);
          var samples = demographicInfo[0];
          var metadataSample = d3.select("#sample-metadata");
          metadataSample.html("");
          Object.entries(samples).forEach(([key, value]) => {
               metadataSample.append("h6").text(`${key.toUpperCase()}:${value}`)
          })
     })
}

function buildPlot(sample) {
     d3.json("samples.json").then(function (belly_button_data) {
          console.log('data', belly_button_data);
          var samples = belly_button_data.samples.filter(sampleObject => sampleObject.id === sample)
          var sample_values = samples[0].sample_values
          var otu_ids = samples[0].otu_ids
          var otu_labels = samples[0].otu_labels
          console.log('sample_values', sample_values);
          console.log('otu_ids', otu_ids)
          var sample_values_slice = sample_values.slice(0, 10).reverse()
          var otu_ids_slice = otu_ids.slice(0, 10).reverse().map(item => {
               return `otu_ids ${item}`;
          });
          console.log('sample_values_slice', sample_values_slice);
          console.log('otu_ids_slice', otu_ids_slice);


          var trace1 = {
               x: sample_values.slice(0, 10).reverse(),
               y: otu_ids.slice(0, 10).reverse().map(item => {
                    return `otu_ids ${item}`;
               }),
               text: otu_labels.slice(0, 10).reverse(),
               margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
               },

               type: "bar",
               orientation: "h"

          };

          var layout = {
               title: "Top 10 OTUs",
               barmode: 'group',
          };

          Plotly.newPlot("bar", [trace1], layout);

          var trace1 = {
               x: sample_values,
               y: otu_ids,
               text: otu_labels,
               mode: 'markers',
               marker: {
                    color: otu_ids,
                    size: sample_values,
               }
          };


          var data = [trace1];

          var layout = {
               title: 'Bacteria Sample',
               showlegend: false,
               height: 600,
               width: 600
          };

          Plotly.newPlot("bubble", data, layout);


          var data = [
               {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: 450,
                    title: "Belly Button Washing Frequency Scrubs per Week",
                    type: "indicator",
                    mode: "gauge+number+delta",
                    delta: { reference: 380 },
                    gauge: {
                         axis: { range: [null, 500] },

                         steps: [
                              { range: [0, 250], color: "lightgray" },
                              { range: [250, 400], color: "gray" }
                         ],
                         threshold: {
                              line: { color: "red", width: 4 },
                              thickness: 0.75,
                              value: 490
                         }
                    }
               }
          ];

          var layout = { width: 600, height: 450, margin: { t: 100, b: 0 } };

          Plotly.newPlot("gauge", data, layout);
     })
};





//On change to the Test Subject ID No
function optionChanged(newSample) {

     buildPlot(newSample);
     demographic(newSample);


}

function init() {
     var selector = d3.select("#selDataset");
     d3.json("samples.json").then(function (data) {
          var names = data.names;
          names.forEach(function (sample) {

               selector.append("options").text(sample).property("value", sample)
          })
          var fristSample = names[0]
          buildPlot(fristSample);
          demographic(fristSample);



     })





}


init();