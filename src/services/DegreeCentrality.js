import cytoscape from 'cytoscape';
import { readCsv } from '../utilities/ReadCsv.js';
import { getEles } from '../utilities/GetEles.js';

export async function degreeCentrality(dataset) {
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

    //Find the normalized degree centrality of each node
    let dcn = cy.elements().degreeCentralityNormalized();
    let degree = [];
    cy.nodes().forEach(n => {
        n.data({
            dcn: dcn.degree(n),
        });
        //Push normalized degree centrality of each node into an array
        degree.push({
            id: n.data().id,
            dcn: dcn.degree(n),
        });
    });

    degree.sort((a, b) => {
        return b.dcn - a.dcn;
    });

    return degree;
    // return cy.elements().markovClustering({
    //     attributes: [
    //         function (edge) {
    //             return edge.data('degree');
    //         },
    //     ],
    // });
}
