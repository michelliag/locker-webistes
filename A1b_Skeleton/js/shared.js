/** 
 * shared.js 
 * This file contains shared code that runs on both view.html and index.html
 
 Author : Michellia G. Herman
 ID     : 31837409
 Desc   : This file contains the function that can be used and accessed by the other .js file.
 */

"use strict";

// Constants used as KEYS for LocalStorage
const LOCKER_INDEX_KEY = "selectedLockerIndex";
const LOCKER_DATA_KEY = "lockerLocalData";

// TODO: Write code to implement the Locker class
class Locker{
    constructor(theID) {
        this._id = theID;
        this._label = "";
        this._locked = false;
        this._pin = "";
        this._color = "3399ff";
        this._contents = "";
    }
    
    get id(){
        return this._id;
    }
    
    get label(){
        return this._label;
    }
    
    get locked(){
        return this._locked;
    }
    
    get pin(){
        return this._pin;
    }
    
    get color(){
        return this._color;
    }
    
    get contents(){
        return this._contents;
    }
    
    set label(text){
        this._label = text;
    }
    
    set locked(state){
        this._locked = state;
    }
    
    set pin(pin){
        this._pin = pin;
    }
    
    set color(newColor){
        this._color = newColor;
    }
    
    set contents(text){
        this._contents = text;
    }
    
    fromData(data){
        this._id = data._id;
        this._label = data._label;
        this._locked = data._locked;
        this._pin = data._pin;
        this._color = data._color;
        this._contents = data._contents;
    }
    
}
 
// TODO: Write code to implement the LockerList class
class LockerList{
    constructor(){
        this._lockers = [];
    }
    
    get lockers(){
        return this._lockers;
    }
    
    get count(){
        return this._lockers.length;
    }
    
    addLocker(id){
        this._lockers.push(new Locker(id));
    }
    
    getLocker(index){
        return this._lockers[index];
    }
    
    removeLocker(id){
        let lockerLen = this._lockers.length;
        for(let i = 0; i < lockerLen; i++){
            if(this._lockers[i]._id===id){
                this._lockers.splice(i, 1);
            }
        }
    }
    
    fromData(data){
        let theData = data._lockers;
        this._lockers = [];
        for(let i = 0; i < theData.length; i++){
            let theLocker = new Locker();
            theLocker.fromData(theData[i]);
            this._lockers.push(theLocker);
        }
    }
}


// TODO: Write the function checkIfDataExistsLocalStorage
//The function is to check if there is a data that exist inside the local storage and it has no parameter
function checkIfDataExistsLocalStorage(){
    if(typeof(Storage) !== "undefined"){
        return true;
    }
    else{
        return false;
    }
    
}

// TODO: Write the function updateLocalStorage
//The function is to set a new data inside the local storage with particular key 
//it also has parameter called 'data' which will be stored inside the local storage by stringifying it first
function updateLocalStorage(data){ 
    localStorage.setItem(LOCKER_DATA_KEY, JSON.stringify(data));
}


// TODO: Write the function getDataLocalStorage
//The function is to get the information about a data stored inside the local storage with particular key and it has no parameter
function getDataLocalStorage(){ 
    let retrieve = JSON.parse(localStorage.getItem(LOCKER_DATA_KEY));
    return retrieve;
}


// Global LockerList instance variable
let lockers = new LockerList();

// TODO: Write the code that will run on load here
let toCheck = checkIfDataExistsLocalStorage();

if(toCheck === true){
    let theData = getDataLocalStorage();
    lockers.fromData(theData);
}
else{
    lockers.addLocker("A001"); //create a locker with default id that is A001
    updateLocalStorage(lockers);
}

