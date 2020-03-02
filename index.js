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
    drawBarsForAllYears( sumOfFY15Revenues , sumOfFY15Expenses , totalAmountLeftFY15 , sumOfFY16Revenues , sumOfFY16Expenses , totalAmountLeftFY16, sumOfFY17Revenues , sumOfFY17Expenses , totalAmountLeftFY17, sumOfFY18Revenues, sumOfFY18Expenses, totalAmountLeftFY18,'chartA' , 'FY15' , 'FY16' , 'FY17' , 'FY18' )
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

// Function handles the drawing of a graph for 4 Fiscal years between a range
// Params: revenuesfory1, expensesfory1, surplusfory1 . . . , name of the graph in html, FY15 , FY16 , FY17 , FY18
// Returns: nothing. Job is to draw something 
function drawBarsForAllYears( revY1 , ExpY1 , surplusY1 , revY2 , ExpY2 , surplusY2 , revY3 , ExpY3 , surplusY3 , revY4 , ExpY4 , surplusY4 , chartName , year1 , year2 , year3 , year4 ) {
    var ctx = document.getElementById(chartName).getContext('2d');
    
    var graphData = {
        labels: [year1 + ' (Surplus: $'+ surplusY1 + ')', year2 + ' (Surplus: $' + surplusY2 + ')', year3 + ' (Surplus: $'+ surplusY3 + ')', year4 + ' (Surplus: $' + surplusY4 + ')'],
        datasets: [{
          label: ['Revenues ($USD)'],
          backgroundColor: "blue",
          data: [revY1 , revY2 , revY3 , revY4]
        }, 
        {
            label: ['Expenses ($USD)'],
            backgroundColor: "red",
            data: [ExpY1 , ExpY2 , ExpY3, ExpY4]
        }
    ]};
      
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