function getSegregated(data) {
    const finalData = [];
    for (var i = 0; i < data.length; i++) {
        let month = parseInt((data[i]['Date of Purchase']).split('/')[0])
        if(typeof finalData[month] === 'undefined') {
            finalData[month] = 1;
        } else {
            finalData[month] += 1;
        }
    }
    finalData.shift()
    return {
        chartData_x : [{data : finalData , label : 'Policy Count'}],
        chartLabels_y : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
}

module.exports = {  getSegregated   };