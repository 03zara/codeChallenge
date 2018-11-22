var input = document.getElementById("input");
var button = document.getElementById("button");

var myData;


 // when search button is clicked, load API data  - loadData function is below                   
button.addEventListener("click", loadData, false);

function loadData() {

var myRequest = new XMLHttpRequest();
        
var picName = input.value;

    myRequest.open('GET', 'https://api.unsplash.com/search/photos?query='+picName+'&client_id=140120bc30e6c09ea6aaa58b9cd72b66eb4b565a3b31ef26b790c1ac75227690', true);

     myRequest.onload = function() {


            if (myRequest.readyState == 4 && myRequest.status == 200){

                myData = JSON.parse(myRequest.responseText);
                    
                // create a function that clears all previous results/images
                function clearAll() {
                    var hideText = document.getElementsByClassName('results');
    				
                    for(var i = 0; i < hideText.length; i++){
                        hideText[i].style.display = "none";
    				    }
                }

                    // if nothing is typed or wrong input in the search bar, display error message.

                    if (picName === "") {

                        clearAll();

                        document.getElementById("message").innerHTML = "Please type in a recipe name to load data...";

                    } 

                    else {

                    clearAll();


                    document.getElementById("message").innerHTML = "";


                    for (var j = 0; j < myData.results.length; j++) {


                            // create a div to display each image 
                        var showItems = document.createElement("div");

                        showItems.setAttribute('class', 'results'); 
                        document.body.appendChild(showItems);

                        showItems.style.display = "block";

                        // hide all divs is no image is found
                        if (j > myData.results.length - 1) {
                            showItems.style.display = "none";; 
                        }
                        else {



                              // displaying the results of all the images 

                            var images = myData.results[j].urls.regular;
                            showItems.innerHTML = '<img src="' + images + '">.';

                        }
                    }
                }
            }

            else {

                document.getElementById("message").innerHTML = "We successfully connected to the server but it returned an ERROR!";
            }
        
        
        
            
    }

    myRequest.onerror = function() {

		document.getElementById("message").innerHTML = "You are not connected online and can't reach the server!";
	}
    
    
    myRequest.send();
     
}
    