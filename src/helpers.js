export const waait= () => new Promise ( res => setTimeout(res,Math.random() * 2000));


//Colors
const generateRandomColor = () => {
const existingBudgetLength = fetchData("budgets")?.length ?? 0;
return `${existingBudgetLength * 34} 65% 50%`;
}


// Local storage 
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}


//Get all items
export const getAllMatchingItems = ({category,key,value})  => {
const data = fetchData(category) ?? [];
return data.filter((item)=> item[key] === value);
}

//Delete an item from localstorage

export const deleteItem = ({key,id}) => {
    console.log("working");
    console.log(id,key);
const existingData = fetchData(key);
if(id){
    const newData = existingData.filter((item => item.id !== id));
    return localStorage.setItem(key,JSON.stringify(newData));
} 
return localStorage.removeItem(key);
}
//create budget

export const createBudget = ({name,amount}) => {
const newItem = {
    id: crypto.randomUUID(),
    name :name,
    createdAt : Date.now(),
    amount: +amount,
     color: generateRandomColor(),
}
const existingBudgets = fetchData("budgets") ?? []
return localStorage.setItem("budgets",JSON.stringify([...existingBudgets,newItem]));

}

//Edit expense 
export const editBudget = ({id,newAmount,newName}) => {
const budgets = fetchData("budgets");

const itemToEdit = budgets.find(el => el.id === id);
let indexOfItem = budgets.indexOf(itemToEdit);
let newItem = {
    ...itemToEdit,
    name:newName,
    amount:newAmount,
}

budgets[indexOfItem] = newItem;
return localStorage.setItem("budgets",JSON.stringify([...budgets]));
}

//create expense

export const createExpense = ({name,amount,budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name :name,
        createdAt : Date.now(),
        amount: +amount,
       budgetId: budgetId,
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newItem]));
}

//Total spent by budget

export const calculateSpentByBudget = (budgetId) => {
const expenses = fetchData("expenses" ) ?? [];
const budgetSpent = expenses.reduce((acc,expenses)=>{
    //Check if expense.id === budgetId

    if(expenses.budgetId !== budgetId) return acc;
        //Add current amount to my total

    return acc += expenses.amount;
},0 );
return budgetSpent;
}


//Formatting

//FormatDate

export const formatDateToLocal = (date) => {
  return new Date(date).toLocaleDateString();
}

//Formatting percentages 



export const formatPercentage = (amount) =>{
    return amount.toLocaleString(undefined,{
        style:"percent",
        minimumFractionDigits:0,
    })
}
//Format currency



export const formatCurrency = (amount)=>{
    return amount.toLocaleString(undefined,{
        style:"currency",
        currency:"USD",
    })
}