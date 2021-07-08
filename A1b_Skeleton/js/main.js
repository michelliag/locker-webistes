/** 
 * main.js 
 * This file contains code that runs on load for index.html
 
Author : Michellia G. Herman
 ID     : 31837409
 Desc   : This file contains the function that will be run when we load the main page of the Digital Locker System.
 */
"use strict";
// TODO: Write the function displayLockers
//The function is used to display all the locker inside the array of global variable 'lockers' with its parameter called 'data' 
function displayLockers(data){
    let listLocker = "";
    for(let i = 0; i < data.count; i++){
        listLocker += "<div class=\"mdl-cell mdl-cell--4-col\"><div class=\"mdl-card mdl-shadow--2dp locker\" style=\"background-color:#"+data.lockers[i].color+"\"><div class=\"mdl-card__title mdl-card--expand\"><h2>"+data.lockers[i].id+"</h2><h4>&nbsp;"+data.lockers[i].label+"'s locker</h4></div><div class=\"mdl-card__actions mdl-card--border\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"view("+i+")\">"+"Open Locker"+"</a><div class=\"mdl-layout-spacer\"></div>"
        
        if(data.lockers[i].locked === true){ //check if the attribute of locker inside array is locked
            listLocker += "<i class=\"material-icons\">lock</i></div></div></div>"
        }
        else{
            listLocker += "<i class=\"material-icons\">lock_open</i></div></div></div>"
        }
    }
    let outputArea = document.getElementById("lockerDisplay"); 
    outputArea.innerHTML = listLocker;
}

// TODO: Write the function addNewLocker
//The function is run whenever the user click 'add new locker' in HTML and it will generate a sequence ID number
function addNewLocker(){
    let id = "";
    let i = lockers.count;

    if(i === 0){ //check if the element inside array is 0
        id = "A00" + (i+1);
    }
    else if(i >= 1 && i <= 8){ //check if the element inside array is between 1 and 8
        id = "A00" + (i+1);
    }
    else if(i >= 9 && i <= 98){ //check if the element inside array is between 9 and 98
        id = "A0" + (i+1);
    }
    else if(i > 99){ //check if the element inside array is greater than 99
        id = "A" + (i+1);
    }
    
    lockers.addLocker(id);
    updateLocalStorage(lockers);
}


// TODO: Write the function view
//The function is used to store the selected locker index inside the key that will be used inside the view.js
//the index of the locker will be obtained from the parameter given to the function
function view(index){
    let theData = JSON.stringify(index);
    localStorage.setItem(LOCKER_INDEX_KEY, theData);
    window.location = "view.html"; //redirected the user to another page
}

function deleteLocker(index){
    console.log(localStorage.getItem(LOCKER_INDEX_KEY))
    let tp = localStorage.getItem(LOCKER_INDEX_KEY)
    console.log(index)
    let tr = lockers.getLocker(index)
    
    let toConfirm = confirm("Press OK to delete this locker.") //to confirm if the user want to delete the locker
    
    if (toConfirm===true){ //if it's true
        let toDelete = tr.id;
        console.log(tr.id)
        lockers.removeLocker(tr.id); //called the LockerList class method to delete the locker with the particular id
        updateLocalStorage(lockers);

        alert("This locker has been deleted."); //give an alert if their locker has been deleted
        window.location = "index.html"; //redirect them to the main page
    } //if the user do not confirm, do nothing
    
}

// TODO: Write the code that will run on load here
displayLockers(lockers);