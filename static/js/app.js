// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
//var selectData =[];
var selectData = new Object();


// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    console.log(elementValue);
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    console.log(filterId);  
// 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {

      selectData[filterId]=elementValue;
    }
    else {
      delete selectData[filterId];
    } 
  
    // 6. Call function to apply all filters and rebuild the table
    console.log("call the function");
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    console.log(selectData);

    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    if (selectData){
      console.log(selectData);
      const entries = Object.entries(selectData);
      console.log(entries);
      var i=0;
      var temp = " && ";
      for (const [col_key, col_val] of entries) {
        console.log(`col_name  ${col_key} col_values  ${col_val}`);
        if (i== 0){
          str1 = `row.${col_key} ==  ${col_val}`;
        }
        else {
          str0 = str1;
          str1 = `row.${col_key} ==  ${col_val}`;
          str1 = str0.concat(temp,str1);
        }
        i++;
        //str ="filteredData = filteredData.filter(row => row.datetime === date && row.country === x);
      }
     console.log(`string created ${str1}`);
     filteredData =filteredData.filter(row => str1);
    }
    
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);

  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters);
  d3.selectAll("#filter-btn").on("click", filterTable);

  
  // Build the table when the page loads
  buildTable(tableData);
