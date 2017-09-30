//two routes:
//a GET route with the url /api/friends -- this displays a JSON of possible friends

var friends = require("../data/friends");

module.exports = function(app){

app.get("/api/friends", function(req, res){
	res.json(friends);
});


app.post("/api/friends", function(req, res){
	//user data
	var newUser = req.body;
	
	var arrayForSums = [];
	for (var i = 0; i < friends.length; i++){
		var comparisonArray = [];
		for (var j = 0; j < friends[i].scores.length; j++) {
		  comparisonArray.push(Math.abs(friends[i].scores[j] - newUser.scores[j]));
		};
		console.log(comparisonArray);
		var sum = comparisonArray.reduce(function(total, amount){
			return total + amount;
		});
		console.log("the sum is " + sum);
		arrayForSums.push(sum);
		console.log("array for sums " + arrayForSums)

	};	
	Array.min = function( array ){
    	return Math.min.apply( Math, array );
};
	var minimum = Array.min(arrayForSums);
	console.log("min: "+ minimum);
	var indexOfMatch = arrayForSums.indexOf(minimum);

	console.log(friends[indexOfMatch]);
	var matchName = friends[indexOfMatch].name;
	var match = friends[indexOfMatch];
	friends.push(newUser);
	res.send(match);
});


};