import cytoscape from 'cytoscape';
import { readCsv } from '../utilities/ReadCsv.js';
import { getEles } from '../utilities/GetEles.js';

export async function closenessCentrality(dataset) {
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

    //Find the normalized closeness centrality of each node
    let ccn = cy.elements().closenessCentralityNormalized({
        /* my options */
    });
    let closeness = [];
    cy.nodes().forEach(n => {
        n.data({
            ccn: ccn.closeness(n),
        });
        //Push normalized closeness centrality of each node into an array
        closeness.push({
            id: n.data().id,
            ccn: ccn.closeness(n),
        });
    });

    closeness.sort((a, b) => {
        return b.ccn - a.ccn;
    });

    return closeness;
}
