import cytoscape from 'cytoscape';
import { readCsv } from '../utilities/ReadCsv.js';
import { getEles } from '../utilities/GetEles.js';

export async function betweennessCentrality(dataset) {
    //Initialize Cytoscape graph
    let cy = cytoscape({
        headless: true,
    });
    //Read CSV file as JSON data
    // const data = await readCsv('datakegiatanorganisasimhs_2016-20200-FULL.csv');
    //Convert JSON data into array
    const eles = getEles(dataset);
    //Add the data array into cytoscape graph
    cy.add(eles);

    //Find the betweenness centrality of each node
    let bcn = cy.elements().betweennessCentrality();
    let betweenness = [];
    cy.nodes().forEach(n => {
        n.data({
            bcn: bcn.betweenness(n),
        });
        //Push betweenness centrality of each node into an array
        betweenness.push({
            id: n.data().id,
            bcn: bcn.betweenness(n),
        });
    });

    betweenness.sort((a, b) => {
        return b.bcn - a.bcn;
    });

    return betweenness;
}
