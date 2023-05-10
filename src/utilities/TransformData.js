export function TransformDataForDB(data, uniqueID, clientId) {
    let datasetArray = [];
    data.forEach(d => {
        datasetArray.push({
            col1_data: Object.values(d)[0],
            col2_data: Object.values(d)[1],
            unique_id: uniqueID,
            clientId: clientId,
        });
    });
    return datasetArray;
}
