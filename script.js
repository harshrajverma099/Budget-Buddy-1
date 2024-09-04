const bendDiv = document.querySelectorAll('.bend-div');

bendDiv.forEach((bendDiv)=>{
    bendDiv.addEventListener('mousemove', (e) => {
        const rect = bendDiv.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        bendDiv.style.scale = "105%"

        const rotateX = ((y - rect.height / 2) / rect.height) * 40;
        const rotateY = ((x - rect.width / 2) / rect.width) * -40;


        bendDiv.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });


    bendDiv.addEventListener('mouseleave', () => {
        bendDiv.style.transform = `rotateX(0deg) rotateY(0deg)`;
        bendDiv.style.scale = "100%"
    });
})





function addBalance() { 
    const inputElement = document.querySelector(".input"); 
    const inputElementValue = inputElement.value.trim(); 
    const balance = document.getElementById('balance'); 
    const leftBalance = document.getElementById("leftBalance");
    const number = parseFloat(inputElementValue);

    if (inputElementValue === "" || number < 0) {
        alert("Enter valid income");
    } else {
        balance.innerHTML = number;
        leftBalance.innerHTML = number;
        inputElement.value = ""
    }
}

// let expenseprice = document.querySelector("#expenses")

// expenseprice.addEventListener("input",function(){

//     let button3 = document.querySelector(".button3")

//     if(expenseprice.value == ""){
//         button3.disabled = true
//     }
//     else{
//         button3.disabled = false
//     }
// })



let expenses = []
 
function addExpenses(){

    const expenseprice = document.querySelector("#expenses")
    const expensesDescription = document.querySelector("#addExpenses")
    const expensesType = document.querySelector("#expensesType")
    const leftBalance = document.getElementById("leftBalance")
    const totalExpenses = document.getElementById("totalExpenses")

    if(leftBalance.innerHTML <= 0 || leftBalance.innerHTML == "0/-"){
        alert("You have Zero balance Left")
    }
    else if(expenseprice.value > leftBalance.innerHTML){
        alert("Expenses is more than Balance")
    }
    else if(expensesDescription.value == ""){
        alert("Expenses Description is missing")
    }
    else if(expenseprice.value == ""){
        alert("Expenses is missing")
    }
    else{
        expenses.push({
            Description: expensesDescription.value,
            Type: expensesType.value,
            price: expenseprice.value
        })

        leftBalance.innerHTML = leftBalance.innerHTML - expenseprice.value
        totalExpenses.innerHTML = parseFloat(totalExpenses.innerHTML || 0) + parseFloat(expenseprice.value)
        expenseprice.value = ""
        expensesDescription.value = ""
        render()
    }
}

let listAll = document.querySelector(".tab-1")
let listFood = document.querySelector(".tab-2")
let listClothes = document.querySelector(".tab-3")
let listTravel = document.querySelector(".tab-4")
let listRent = document.querySelector(".tab-5")
let listOther = document.querySelector(".tab-6")

function deleteBtn(index){
    const totalExpenses = document.getElementById("totalExpenses")
    const leftBalance = document.getElementById("leftBalance")

    totalExpenses.innerHTML =totalExpenses.innerHTML - expenses[index].price
    leftBalance.innerHTML = parseFloat(leftBalance.innerHTML || 0) + parseFloat(expenses[index].price)

    expenses.splice(index,1)
    render()
}

function createExpensesComponent(expenses, index) {
    let div = document.createElement("div")
    div.setAttribute("class", `hover:shadow-red-200 shadow-lg transition-all duration-300 hover:border-gray-600 border-2 text-white hover:scale-105 hover:bg-gray-800`)
    let div2 = document.createElement("div")
    let Description = document.createElement("p")
    Description.style.color = "rgb(255, 255, 255)"
    let Type = document.createElement("p")
    Type.style.color = "rgb(200, 200, 200)"
    let price = document.createElement("p")
    price.style.color = "rgb(150, 150, 150)"
    let div3 = document.createElement("div")
    div.setAttribute("id", "all-1")
    let deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteBtn.setAttribute("onclick",`deleteBtn(${index})`)
    deleteBtn.setAttribute("id","deleteBtn")
    div2.style.width = "80%"
    div3.style.width = "20%"
    div3.style.height = ""
    Description.innerHTML = `Expenses Description: ${expenses.Description}`
    Type.innerHTML = `Category: ${expenses.Type}`
    price.innerHTML ='Expenses: ' + '<i class="fa-solid fa-indian-rupee-sign"></i>'+` ${expenses.price}`
    div3.appendChild(deleteBtn)
    div2.appendChild(Description)
    div2.appendChild(Type)
    div2.appendChild(price)
    div.appendChild(div2)
    div.appendChild(div3)
    return div;
}

function render(){
    listAll.innerHTML = ""
    listFood.innerHTML =""
    listClothes.innerHTML =""
    listTravel.innerHTML =""
    listRent.innerHTML =""
    listOther.innerHTML =""
    for(let i=0; i<expenses.length; i++){
        let element = createExpensesComponent(expenses[i],i)
        listAll.appendChild(element)
        if(expenses[i].Type == "Food"){
            let element = createExpensesComponent(expenses[i],i)
            listFood.appendChild(element)
        }
        if(expenses[i].Type == "Clothes and Fashion"){
            let element = createExpensesComponent(expenses[i],i)
            listClothes.appendChild(element)
        }
        if(expenses[i].Type == "Travel"){
            let element = createExpensesComponent(expenses[i],i)
            listTravel.appendChild(element)
        }
        if(expenses[i].Type == "Rent of House/Flat"){
            let element = createExpensesComponent(expenses[i],i)
            listRent.appendChild(element)
        }
        if(expenses[i].Type == "Others"){
            let element = createExpensesComponent(expenses[i],i)
            listOther.appendChild(element)
        }
    }
}


function showDiv() {
    var selectBox = document.getElementById("listExpenses");
    var selectedValue = selectBox.value;
    
    
    for (var i = 1; i <= 6; i++) {
        document.querySelector(".tab-" + i).style.display = "none";
    }
    
    
    document.querySelector(".tab-" + selectedValue).style.display = "block";
    render()
}


document.getElementById('downloadPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    doc.setFontSize(70);
    doc.setTextColor(200, 200, 200);
    doc.text("Budget Buddy",0,150)

  
    const balance = document.getElementById('balance').innerHTML + " rs"
    const totalExpenses = document.getElementById('totalExpenses').innerHTML + " rs"
    const leftBalance = document.getElementById('leftBalance').innerHTML + " rs"
  
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Budget Summary Created Budget Buddy:", 10, 10);
    doc.text(`Total Balance = ${balance}`, 10, 20);
  
    let yOffset = 30; 
  
    for (let i = 0; i < expenses.length; i++) {
      const budgetData = `
        ${i + 1}. Expense
        Expenses Description: ${expenses[i].Description}
        Category: ${expenses[i].Type}
        Budget: ${expenses[i].price + " rs"}
    `;
      
      const lines = doc.splitTextToSize(budgetData, 180);
      doc.text(lines, 10, yOffset);
      yOffset += lines.length * 5; 
    }
  
    doc.text('Total Budget = ' + `${totalExpenses}`, 10, yOffset);
    yOffset += 10;
    doc.text('Saving Balance = ' +`${leftBalance}`, 10, yOffset);
  
    doc.save('budget-summary.pdf');
  });