/**
 * 
 * @param {*} data : generating dashboard data based on every month
 * @returns an array of object containing data and label
 */
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
        chartData_y : [{data : finalData , label : 'Policy Count'}],
        chartLabels_x : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
}

module.exports = {  getSegregated   };