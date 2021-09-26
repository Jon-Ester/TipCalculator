(function(){
//Form and Inputs from User 
const cost = document.getElementById('input-bill'),
      people = document.getElementById('input-users'),
      service = document.getElementById('input-service'),
      form = document.getElementById('tip-form'),
      loader = document.querySelector('.loader'),
      formControl = document.querySelectorAll('.form-control'),
      feedback = document.querySelector('.feedback'),
      results = document.querySelector('.results');
      feedback.innerText = '';
//Event listeners 
//FORM
form.addEventListener('submit', function(e){
let bill = cost.value;
    amountSplit = people.value;
    serviceLevel = service.value,
    inputs = [];

formControl.forEach(function(input){
if(input.value === ''|| input.value === '0'){
showAlert(input);
} 
inputs.push(input.value);
});

calcTip(inputs);
e.preventDefault();
});

//SERVICE SELECTOR OPTIONS & EVENT LISTENER
service.innerHTML = 
`
<option value ="">Choose...</option>
<option value =".20">Great: 20%</option>
<option value =".18">Good: 18%</option>
<option value =".15">Average: 15%</option>
`
//SERVICE EVENT LISTENER
service.addEventListener('click', function(e){

if(e.target.value === '0'){
  serviceLevel = '';
} else {
  serviceLevel = service.value;
}
});
//CALCULATE TIP FUNCTION 
function calcTip (inputs){
  console.log(inputs);
  console.log(inputs[2]);
if (inputs[0] === '' || inputs[1] === ''|| inputs[2] === ''){
  inputs = [];
} else if (inputs[0] != '' && inputs[1] != '' && inputs[2] != ''){
  let tipTotal = inputs[0] * inputs[2],
      billTotal = tipTotal + Number(inputs[0]),
      eachTip = billTotal / inputs[1];
  showTip(tipTotal, billTotal, eachTip);
}
}
//SHOW TIP FUNCTION 
function showTip(tipTotal, billTotal, eachTip){
  loader.style.display = 'block';
  setTimeout(function(){
  loader.style.display = 'none';
  results.style.display = 'block';
  console.log(results.firstChild.nextElementSibling);
  results.firstChild.nextSibling.textContent = `Tip Amount:$${tipTotal.toFixed(2)}`
  results.firstChild.nextElementSibling.nextElementSibling.textContent = `Total Amount:$${billTotal.toFixed(2)}`
  results.lastElementChild.textContent = `Each Person Owes:$${eachTip.toFixed(2)}`
  }, 3000);
  setTimeout(function(){
    results.style.display = 'none';
    cost.value ='';
    people.value ='';
    service.value = 0;
  }, 10000)
}
//SHOW ALERT FUNCTION 
function showAlert(input){
if(input.id.includes('input-bill')){
  feedback.innerHTML += `<p>Bill Amount Cannot Be Blank</p>`;
} if(input.id.includes('input-users')){
  feedback.innerHTML += `<p>Amount Of People Must Be Filled In</p>`;
} if (input.id.includes('service')){
  feedback.innerHTML += `<p>Please Select Service Level</p>`;
}
  
  feedback.classList.add('showItem', 'alert-danger');
  setTimeout(function(){
  feedback.classList.remove('showItem', 'alert-danger');
  feedback.innerHTML = '';
    },5000);
}

})();

