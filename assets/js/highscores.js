//global variables
var highScoreList = document.querySelector("#high-score-list");
var highScoreArray = [];

//function that stores past user's scores 
function listHighScores() {
    //create list items for highScoreList
    var scoreList = highScoreArray[highScoreArrayIndex].scoreList;
    var scoreListLength = scoreList.length;

    for (var i = 0; i < scoreListLength; i++) {
        var scoreListItem = document.createElement("li");
        scoreListItem.className = "high-score-initials";
        scoreListItem.textContent = scoreList[i];
        highScoreList.append(scoreListItem);
    };
    // get high scores from local storage
    // highScoreList.
    // sort high scores
    // for each loop over each score
};
