// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// The follow two lines work with data in the js files
// This data is only persistent until the server is restarted
// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");

var connection = require("../config/connection");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {

    connection.query("SELECT * FROM reservations ORDER BY createdAt LIMIT 0,5", function(err, results){
      res.json(results);
    });

    //res.json(tableData);
  });

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    // If using .json files and objects
    tableData = [];
    waitListData = [];

    // Lets Clear the Table/Wait List

    connection.query("DELETE FROM reservations", function(error, results){
      if(error) throw error;

      console.log('deleted ' + results.affectedRows + ' rows');
    }); // close connection.query

    // console.log(tableData);
  }); // close app.post

}; // function(app)