//income
const incomeTitle = document.getElementById('incomeTitle');
const incomeValue = document.getElementById('incomeValue');
const incomeForm = document.getElementById('incomeForm');
const incomesList = document.getElementById('incomesList');
const incomesCash = document.getElementById('incomesValue');
// outcome
const expenseTitle = document.getElementById('expenseTitle');
const expenseValue = document.getElementById('expenseValue');
const expenseForm = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const expenseCash = document.getElementById('expensesValue');
// Balance
const BalanceValue = document.getElementById('budgetValue');

// arrays
const incomesArr = [];
const expensesArr = [];

//vars
let Cash = 0; //
let Outgoes = 0;
let Balance = 0;
let info = '';
//INIT
BalanceValue.innerHTML = 'Możesz wciąż wydać: XXX PLN';
////////////////////////////////INCOMES
const addIncome = () => {
  const newItem = {
    title: incomeTitle.value,
    amount: incomeValue.value,
    id: Math.random(),
  };
  incomesArr.push(newItem);
  renderIncomes();

  refreshSum(newItem); //
};

/////
const refreshSum = (item) => {
  incomesCash.innerHTML = '';
  Cash += parseFloat(incomeValue.value);
  calcBalance();
  incomesCash.innerHTML = Cash;
};

////
incomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addIncome();
});

const createElement = (item) => {
  const listItem = document.createElement('li');
  const text = document.createElement('p');
  const amount = document.createElement('p');
  text.innerText = item.title;
  amount.innerText = item.amount;
  //   <p>wypłata</p>
  //   <p>5000</p>

  listItem.appendChild(text);
  listItem.appendChild(amount);
  // <li>
  //   <p>wypłata</p>
  //   <p>5000</p>
  // </li>
  incomesList.appendChild(listItem);
};

const renderIncomes = () => {
  incomesList.innerHTML = '';
  console.log(incomesArr);
  incomesArr.forEach((item) => {
    createElement(item);
  });
};
////////////////////////////////EXPENSES
const addExpense = () => {
  const newItem = {
    title: expenseTitle.value,
    amount: expenseValue.value,
    id: Math.random(),
  };
  expensesArr.push(newItem);
  renderExpenses();

  refreshExpensesSum(newItem); //
};

/////
const refreshExpensesSum = (item) => {
  expenseCash.innerHTML = '';
  Outgoes += parseFloat(expenseValue.value);
  calcBalance();
  expenseCash.innerHTML = Outgoes;
};

////
expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addExpense();
});

const createElementExpense = (item) => {
  const listItem = document.createElement('li');
  const text = document.createElement('p');
  const amount = document.createElement('p');
  text.innerText = item.title;
  amount.innerText = item.amount;
  //   <p>wypłata</p>
  //   <p>5000</p>

  listItem.appendChild(text);
  listItem.appendChild(amount);
  // <li>
  //   <p>wypłata</p>
  //   <p>5000</p>
  // </li>
  expensesList.appendChild(listItem);
};

const renderExpenses = () => {
  expensesList.innerHTML = '';
  console.log(expensesArr);
  expensesArr.forEach((item) => {
    createElementExpense(item);
  });
};
////////////////////////////////BALANCE
const calcBalance = () => {
  Balance = Cash - Outgoes;

  switch (true) {
    case Balance > 0:
      info = 'możesz wciąż wydać:';

      break;
    case Balance < 0:
      info = 'balans jest ujemny';
      break;
    default:
      info = 'balans wynosi zero';
  }

  BalanceValue.innerHTML = '';

  BalanceValue.innerHTML = info + ' ' + Balance + ' ' + 'PLN';
};

//case

//METODY FOREACH I MAP
/*
const arr = [1, 2, 3, 4];

function forEactFn(array) {
  array.forEach((item) => {
    console.log(item + 1);
  });
}
function mapEactFn(array) {
  const modifiedArr = array.map((item) => {
    return item + 1;
  });

  return modifiedArr;
}

forEactFn(arr);
console.log(mapEactFn(arr));

const myDiv = document.getElementById('myDiv');

const incomesValue = [
  {
    title: 'wypłata',
    amount: 3000,
  },
];
*/
