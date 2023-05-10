// change this function to use the dataset from endpoint
function getEles(data) {
    let nodes = [];
    let edges = [];
    let i = 0;
    let j = 0;
    data.forEach(d => {
        j = 1;
        Object.entries(d).forEach(([key, val]) => {
            val = typeof val === 'number' ? val : val.trim();
            if (nodes.indexOf(val) < 0) {
                if (nodes.key !== 'weight' || j != 3) {
                    nodes.push({ group: 'nodes', data: { id: val } });
                }
            }
            j++;
        });
        edges.push({
            group: 'edges',
            data: {
                id: 'e' + i.toString(),
                source: Object.values(d)[0],
                target: Object.values(d)[1],
                ...(Object.values(d)[2] ||
                Object.values(d)[2] != null ||
                Object.values(d)[2] == 'weight'
                    ? { weight: Object.values(d)[2] }
                    : {}),
            },
        });
        i++;
    });
    return {
        nodes,
        edges,
    };
}

// New run method where it calls the endpoint to fetch the dataset

async function run(graphID, clustering) {
    const response = await fetch(
        `http://localhost:3000/temp/graphs/${graphID}/dataset`,
    );
    renderGraph(await response.json(), clustering);
    createEndEl();
}

function renderGraph(results, clustering) {
    const eles = getEles(results);
    let cy = cytoscape({
        container: document.querySelector('#cy'),
        fit: true,
        padding: 30,
        centerGraph: true,
    });

    cy.add(eles);

    if (clustering.toLowerCase() == 'kmeans') {
        cy.elements().kMeans();
        console.log(cy.elements().kMeans());
    } else if (clustering.toLowerCase() == 'kmedoids') {
        cy.elements().kMedoids();
    } else if (clustering.toLowerCase() == 'fuzzycmeans') {
        cy.elements().fuzzyCMeans();
    } else if (clustering.toLowerCase() == 'hierarchical') {
        cy.elements().hierarchicalClustering();
    } else {
        cy.elements().markovClustering();
    }
    cy.layout({
        name: 'cose',
    }).run();
}

function createEndEl() {
    const EndEl = document.createElement('div');
    EndEl.setAttribute('id', 'end');
    document.querySelector('body').appendChild(EndEl);
}

// Here you would
// await run(graphID)
await run(graphID, clustering);
