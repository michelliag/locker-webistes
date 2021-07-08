/** 
 * view.js 
 * This file contains code that runs on load for view.html
 
 Author : Michellia G. Herman
 ID     : 31837409
 Desc   : This file contains the function that will display the value of every attributes in the current locker.
 */

"use strict";
// TODO: Write the function displayLockerInfo
//The function is used to display the information from current locker into HTML page
//it has a parameter called 'locker' which is a locker or element inside the array of LockerList
function displayLockerInfo(locker){
    //Below code is to get the HTML id where the locker information will be displayed
    let idHTML = document.getElementById('lockerId');
    let labelHTML = document.getElementById('lockerLabel');
    let colorHTML = document.getElementById('lockerColor');
    let contentHTML = document.getElementById('lockerContents');
    
    //Below code is to display the locker info in HTML page
    idHTML.innerHTML = locker.id;
    labelHTML.innerHTML = locker.label;
    colorHTML.innerHTML = locker.color;
    contentHTML.innerHTML = locker.contents;
}


// TODO: Write the function unlock
//The function is used to unlock the locked locker
//it has a parameter called 'locker' which is a locker or element inside the array of LockerList
function unlock(locker){
    let thePin = locker.pin; //get the locker pin that saved 
    let theInput;
    theInput = prompt('Please enter the pin to unlock.',''); //to get the input from the user
    
    if(theInput === thePin){ //if the input and saved pin matches
        locker.locked = false; //change the locked info to 'false' that will change the lock icon as well
        locker.pin = ""; //clear the current pin
        displayLockerInfo(locker); //successfully open the locker and will be shown the info inside that locker
    }
    
    else{ //if not
        alert("Your pin is incorrect!"); //give an alert if the pin is incorrect
        window.location = "index.html"; //redirect the user into the main page
    }  
}

// TODO: Write the function deleteThisLocker
//The function is used to delete the current locker
function deleteThisLocker(){
    let toConfirm = confirm("Press OK to delete this locker.") //to confirm if the user want to delete the locker
    
    if (toConfirm===true){ //if it's true
        let toDelete = locker.id;
        lockers.removeLocker(toDelete); //called the LockerList class method to delete the locker with the particular id
        updateLocalStorage(lockers);

        alert("This locker has been deleted."); //give an alert if their locker has been deleted
        window.location = "index.html"; //redirect them to the main page
    } //if the user do not confirm, do nothing
}

// TODO: Write the function lockLocker
//The function is to lock the current locker
function lockLocker(){
    if(confirm("Are you sure going to lock this locker?")){ //to confirm if the user want to lock the locker and if it's true
        let p1 = prompt("Please enter your pin.", ""); //ask for the pin
        let p2;
        if(p1){ //if the user enter the pin
            p2 = prompt("Please enter your pin one more time to confirm.", ""); //ask for the confirmation pin
            let currentCons = document.getElementById("lockerContents").value;
            let currentLabel = document.getElementById("lockerLabel").value;
            let currentColor = document.getElementById("lockerColor").value;


            if(p1 === p2){ //if both pin and confirmation matches
                //update all information to what the user has input
                locker.pin = p1;
                locker.locked = true;
                locker.contents = currentCons;
                locker.label = currentLabel;
                locker.color = currentColor;

                updateLocalStorage(lockers);

                alert("Your locker has been successfully locked!"); //give an alert if the locker has been successfully locked

                window.location = "index.html"; //redirect them to the main page
            }
            else{ //if both pin and confirmation doesn't matches
                alert("Your pin and the confirmation pin do not match!"); //give an alert
            }
        } //if the user click 'cancel' then do nothing   
    } //if the user do not confirm, then do nothing
}

// TODO: Write the function closeLocker
//The function is used to close the locker without locking it
function closeLocker(){
    if(confirm("Close the locker without locking it?")){ //to confirm if the user want to close the locker without locking it and if it's true  
        let currentCons = document.getElementById("lockerContents").value;
        let currentLabel = document.getElementById("lockerLabel").value;
        let currentColor = document.getElementById("lockerColor").value;
        
        //update all information to what the user has input
        locker.contents = currentCons;
        locker.label = currentLabel;
        locker.color = currentColor;

        updateLocalStorage(lockers);
        
        alert("Your locker has been successfully closed!"); //give an alert that the user has successfully closed their locker
        
        window.location = "index.html"; //redirect them into the main page
    }
}

// Retrieve the stored index from local storage
let index = localStorage.getItem(LOCKER_INDEX_KEY);
index = parseInt(index); //change the index into an integer

// using the getLocker method, retrieve the current Locker instance
let locker = lockers.getLocker(index); 

// TODO: Write the code that will run on load here
if(locker.locked === true){ //check if the locker is locked
    unlock(locker); //if yes, called the unlock() function
}
else{
    displayLockerInfo(locker); //if no, called the displayLockerInfo() function
}