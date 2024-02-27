const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const ammount = document.querySelector(".ammount input");
const fromCurrency = document.querySelector(".from select");
const toCurrency =  document.querySelector(".to select");
const result = document.querySelector(".msg p");

console.log(dropdowns);


for (const select of dropdowns) { 
    for (const currencyCode in countryList) { //for in  print only the key part .
        let newOption = document.createElement("option"); //creat new option
        newOption.innerText = currencyCode; // assign the  cuntry's currency shoet name in inner text
        newOption.value =currencyCode; // assign the  cuntry's currency short name in value .

        if ((select.name === "from" && currencyCode === "USD") || (select.name ==="to" && currencyCode === "INR")) {
            newOption.selected="selected"; // for select at 1st USD and INR
        }

        select.append(newOption); // append in dropdown select 
    }

    select.addEventListener("change",(evt)=>{
        // console.log(evt);
        updateFlag(evt.target);
    })
}

// * change the flag with chnge the dropdown

const updateFlag = (element)=>{

    let currencyCode = element.value ; //value extract
    let countryCode = countryList[currencyCode]; 


    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = element.parentElement.querySelector(".img-box img");
    img.src = newSrc ;

}

//* button click work 

btn.addEventListener("click",async (evt) => {
    evt.preventDefault() ;//stop defult behaviour like relode .

    let ammountValue = ammount.value ; // input ammount value 

    // console.log(ammountValue);                                          

    if (ammountValue > 0) {
        
    }
    else{
        ammountValue = 1;
        ammount.value = "1";
    }

    console.log(fromCurrency.value.toLowerCase());
    // console.log(toCurrency.value);

    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCurrency.value.toLowerCase()]; // at the key[value] 
    
    //* show result in html
    // console.log(ammount.value);
    
    result.innerText = ` ${ammount.value} ${fromCurrency.value} = ${ammount.value * rate} ${toCurrency.value} ` ;




    console.log(rate);
})
