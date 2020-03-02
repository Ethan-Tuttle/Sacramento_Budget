/*======================================================================
@title:         index.js
@author:        Ethan Tuttle
@last modified: 03/01/2020
========================================================================*/

//Fetch all the data from a JSON file for 2015-2016 using Fetch API
//Current URL to fetch is Ethan Tuttle's public repo 
fetch('https://raw.githubusercontent.com/Ethan-Tuttle/Sacramento_Budget/master/sacbudget_15-16.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //calculate the total expenses for 2015
        let sumOfFY15Expenses = calculateTotalExpensesForAGivenYear( 'FY15' , data );
        //calculate the total expenses for 2016
        let sumOfFY16Expenses = calculateTotalExpensesForAGivenYear( 'FY16' , data );

         //calculate the total revenues for 2015
         let sumOfFY15Revenues = calculateTotalRevenuesForAGivenYear( 'FY15' , data );
         //calculate the total revenues for 2016
         let sumOfFY16Revenues = calculateTotalRevenuesForAGivenYear( 'FY16' , data );

         //Totlal amount of money left after all costs/gains
         let totalAmountLeftFY15 = (sumOfFY15Revenues) - (sumOfFY15Expenses);
         let totalAmountLeftFY16 = (sumOfFY16Revenues) - (sumOfFY16Expenses);
         drawBarsFor2Years( totalAmountLeftFY15 , totalAmountLeftFY16 , 'chartA' , 'FY15' , 'FY16');
    });

//Fetch all the data from a JSON file for 2017-2018 using Fetch API
//Current URL to fetch is Ethan Tuttle's public repo 
fetch('https://raw.githubusercontent.com/Ethan-Tuttle/Sacramento_Budget/master/sacbudget_17-18.json')
.then((response) => {
    return response.json();
})
.then((data) => {
    //calculate the total expenses for 2017
    let sumOfFY17Expenses = calculateTotalExpensesForAGivenYear( 'FY17' , data );
    //calculate the total expenses for 2018
    let sumOfFY18Expenses = calculateTotalExpensesForAGivenYear( 'FY18' , data );

    //calculate the total revenues for 2017
    let sumOfFY17Revenues = calculateTotalRevenuesForAGivenYear( 'FY17' , data );
    //calculate the total revenues for 2018
    let sumOfFY18Revenues = calculateTotalRevenuesForAGivenYear( 'FY18' , data );

    //Totlal amount of money left after all costs/gains
    let totalAmountLeftFY17 = (sumOfFY17Revenues) - (sumOfFY17Expenses);
    let totalAmountLeftFY18 = (sumOfFY18Revenues) - (sumOfFY18Expenses);
    drawBarsFor2Years( totalAmountLeftFY17 , totalAmountLeftFY18, 'chartB' , 'FY17' , 'FY18');
});

//Fetch all the data from a JSON file for 4 years using Fetch API
//Current URL to fetch is Ethan Tuttle's public repo 
fetch('https://raw.githubusercontent.com/Ethan-Tuttle/Sacramento_Budget/master/sacbudget_15-16_17-18.json')
.then((response) => {
    return response.json();
})
.then((data) => {
    //calculate the total expenses for 2015
    let sumOfFY15Expenses = calculateTotalExpensesForAGivenYear( 'FY15' , data );
    //calculate the total expenses for 2016
    let sumOfFY16Expenses = calculateTotalExpensesForAGivenYear( 'FY16' , data );
    //calculate the total expenses for 2017
    let sumOfFY17Expenses = calculateTotalExpensesForAGivenYear( 'FY17' , data );
    //calculate the total expenses for 2018
    let sumOfFY18Expenses = calculateTotalExpensesForAGivenYear( 'FY18' , data );
    //calculate the total revenues for 2015
    let sumOfFY15Revenues = calculateTotalRevenuesForAGivenYear( 'FY15' , data );
    //calculate the total revenues for 2016
    let sumOfFY16Revenues = calculateTotalRevenuesForAGivenYear( 'FY16' , data );
    //calculate the total revenues for 2017
    let sumOfFY17Revenues = calculateTotalRevenuesForAGivenYear( 'FY17' , data );
    //calculate the total revenues for 2018
    let sumOfFY18Revenues = calculateTotalRevenuesForAGivenYear( 'FY18' , data );

    //Totlal amount of money left after all costs/gains
    let totalAmountLeftFY15 = (sumOfFY15Revenues) - (sumOfFY15Expenses);
    let totalAmountLeftFY16 = (sumOfFY16Revenues) - (sumOfFY16Expenses);
    //Totlal amount of money left after all costs/gains
    let totalAmountLeftFY17 = (sumOfFY17Revenues) - (sumOfFY17Expenses);
    let totalAmountLeftFY18 = (sumOfFY18Revenues) - (sumOfFY18Expenses);

    //draw graph
    drawBarsForAllYears( totalAmountLeftFY15 , totalAmountLeftFY16 , totalAmountLeftFY17 , totalAmountLeftFY18 , 'chartC' , 'FY15' , 'FY16' , 'FY17' , 'FY18' )

});

// Function handles the calculation for each years total expenses (departments dont matter in this case)
// Params: year to calculate , data from the json file
// Returns: total expenses for a given year
function calculateTotalExpensesForAGivenYear( year , jsonData ) {
    //Value will accumulate a sum for the years expenses. Want a decimal value since we are dealing with money
    let totalExpenses = 0.0;
    //Loop through the entire data set
    for ( let i = 0; i < jsonData.length; i++ ) {
        //Check if the current data is the year we are calculating
        if ( jsonData[i].budget_year === year ) 
        {
            //Check if the current data is an expense
            if ( jsonData[i].account_type === 'Expenses' ) {
                 //We add to the total spent since the only other option is an expense
                 totalExpenses = totalExpenses + jsonData[i].amount;
            }
        }
    }

    return totalExpenses;
}

// Function handles the calculation for each years total Revenues (departments dont matter in this case)
// Params: year to calculate , data from the json file
// Returns: total revenues for a given year
function calculateTotalRevenuesForAGivenYear( year , jsonData ) {
    //Value will accumulate a sum for the years expenses. Want a decimal value since we are dealing with money
    let totalRevenues = 0.0;
    //Loop through the entire data set
    for ( let i = 0; i < jsonData.length; i++ ) {
        //Check if the current data is the year we are calculating
        if ( jsonData[i].budget_year === year ) 
        {
            //Check if the current data is an expense
            if ( jsonData[i].account_type === 'Revenues' ) {
                 //We add to the total spent since the only other option is an expense
                 totalRevenues = totalRevenues + jsonData[i].amount;
            }
        }
    }

    return totalRevenues;
}

// Function handles the drawing of independent graphs for the entire Fiscal year between a range
// Params: total amount left over for year 1 , total amount left over for year 2 , name of the chart we want to draw to , year1 string , year2 string
// Returns: nothing. Job is to draw something 
function drawBarsFor2Years( x , y , chartName , year1 , year2 ) {
    var ctx = document.getElementById(chartName).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [ year1 + ' - ' + year2 ],
        datasets: [{
            label: 'Total amount leftover for ' + year1,
            data: [x],
            backgroundColor: [
                "blue"
            ],
            borderColor: [
                "purple"
            ],
            borderWidth: 1
        },
        {
            label: 'Total amount leftover ' + year2,
            data: [y],
            backgroundColor: [
                "red"
            ],
            borderColor: [
                "orange"
            ],
            borderWidth: 1
        }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
return;
}

// Function handles the drawing of a graph for 4 Fiscal years between a range
// Params: total amount left over for year 1 , total amount left over for year 2 , total amount left over for year 3 , total amount left over for year 4 , name of the chart we want to draw to , year1 string , year2 string , year3 string , year4 string
// Returns: nothing. Job is to draw something 
function drawBarsForAllYears( totalForFirstYear , totalForSecondYear , totalForThirdYear , TotalForFourthYear , chartName , year1 , year2 , year3 , year4 ) {
    var ctx = document.getElementById(chartName).getContext('2d');
    
    var graphData = {
        labels: [year1 + '-' + year2 + ' vs ' + year3 + '-' + year4],
        datasets: [{
          label: ['Total Left FY15-FY16 ($USD)'],
          backgroundColor: "blue",
          data: [totalForFirstYear + totalForSecondYear]
        }, 
        {
          label: ['Total Left FY17-FY18 ($USD)'],
          backgroundColor: "orange",
          data: [totalForThirdYear + TotalForFourthYear]
        }]
      };
      
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: graphData,
        options: {
          tooltips: {
            callbacks: {
                label:  function(t, d) {
                    var xLabel = d.datasets[t.datasetIndex].label;
                    var yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
                    return xLabel + ': ' + yLabel;
                }
            }
          },  
          barValueSpacing: 20,
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
                callback: function(value, index, values) {
                    return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                }
              }
            }]
          }
        }
      });      
    return;
}