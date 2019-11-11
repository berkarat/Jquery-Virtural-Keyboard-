let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: ["1 2 3", "4 5 6", "7 8 9", ". 00 0", "{bksp}" ],
     
  },
  theme: "hg-theme-default hg-layout-numeric numeric-theme"
});

 
document.querySelectorAll(".input").forEach(input => {
  input.addEventListener("focus", onInputFocus);
  
  
  
});

function onInputFocus(event) {
 
  selectedInput = `#${event.target.id}`;
 alert(selectedInput)
 keyboard.setOptions({
    inputName: event.target.id
  });
}

function onInputChange(event) {
 keyboard.setInput(event.target.value, event.target.id);
}

function onChange(input) {
  console.log("Input changed", input);
  document.querySelector(selectedInput || ".input").value = input;
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * Shift functionality
   */
  if (button === "{lock}" || button === "{shift}") handleShiftButton();
}

function handleShiftButton() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}







// /**
//  * Update simple-keyboard when input is changed directly
//  */
// document.querySelector(".input").addEventListener("input", event => {
//   keyboard.setInput(event.target.value);
// });

// console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
 
}
// var cardtype;
// function onKeyPress(button) {
//     if(document.getElementById("inputtext").value.toString().length>0  ) 	{
//     if (button === "{enter}"){
// switch (cardtype){

//     case"idcard":     

//   // alert(document.getElementById("inputtext").value.toString());
//   object.goselectcurrencypage("selectcurrencypage",document.getElementById("inputtext").value.toString());

//     break;

//     case "passport":
//   // alert( 	$("#ddowntoggle").text() + document.getElementById("inputtext").value.toString());

//   object.goselectcurrencypage("selectcurrencypage",$("#ddowntoggle").text() + document.getElementById("inputtext").value.toString());

//     break;
// }

// }}




 
// }















function gonext(val){
  if(document.getElementById("inputtext").value.toString().length>0  ) 	{
switch (cardtype){

    case"idcard":     
 
  object.goselectcurrencypage("selectcurrencypage",document.getElementById("inputtext").value.toString(),val);
    break;

    case "passport":

  object.goselectcurrencypage("selectcurrencypage",$("#ddowntoggle").text() + document.getElementById("inputtext").value.toString(),val);

    break;
 

}
}else {
  $("#inputtext").css("color","red" );
  $("#inputtext").val("Boş Geçilemez !!" );

 
}}

 