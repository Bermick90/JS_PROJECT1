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
// Buttons
const allButtons = document.querySelectorAll('.button-test');

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

  refreshSum(newItem.amount); //
};

const refreshSum = (value) => {
  incomesCash.innerHTML = '';
  Cash += parseFloat(value);
  calcBalance();
  incomesCash.innerHTML = Cash;
};

incomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addIncome();
});

const createElement = (item) => {
  const listItem = document.createElement('li');
  listItem.id = item.id; //
  listItem.classList = 'flex flex--space-between budget__list__item'; //
  const text = document.createElement('p');
  text.innerText = item.title;
  const amount = document.createElement('p');
  const buttonEdit = document.createElement('button'); //
  buttonEdit.innerText = 'Edytuj'; //
  const buttonRemove = document.createElement('button'); //
  buttonRemove.innerText = 'Usuń'; //

  amount.innerText = item.amount;

  listItem.appendChild(text);
  listItem.appendChild(amount);
  listItem.appendChild(buttonEdit); //
  listItem.appendChild(buttonRemove); //
  incomesList.appendChild(listItem);

  buttonEdit.addEventListener('click', () => {
    //
    editItem(item, text, listItem); //
  });

  buttonRemove.addEventListener('click', () => {
    //
    removeItem(item); //
  }); //
};
const editItem = (item, text, listItem) => {
  console.log(incomesArr);
  listItem.contentEditable = true;
  const editForm = document.createElement('form');
  editForm.classList = 'budget__list__item_edit';
  const titleInput = document.createElement('input');
  const valueInput = document.createElement('input');
  valueInput.setAttribute('type', 'number');
  valueInput.setAttribute('min', 1);
  titleInput.value = item.title;
  valueInput.value = item.amount;
  const saveBtn = document.createElement('input');
  saveBtn.type = 'submit';
  saveBtn.value = 'SAVE';
  editForm.appendChild(titleInput);
  editForm.appendChild(valueInput);
  editForm.appendChild(saveBtn);
  incomesList.appendChild(editForm);

  saveBtn.addEventListener('click', () => {
    incomesArr.find((element) => {
      if (element.id === item.id) {
        refreshSum(valueInput.value - element.amount);
        element.title = titleInput.value;
        element.amount = valueInput.value;
      }
    });

    renderIncomes();
  });
};

/////////////////////////////////////////////////////////////////
const renderIncomes = () => {
  incomesList.innerHTML = '';
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

const refreshExpensesSum = (item) => {
  expenseCash.innerHTML = '';
  Outgoes += parseFloat(expenseValue.value);
  calcBalance();
  expenseCash.innerHTML = Outgoes;
};

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
  listItem.appendChild(text);
  listItem.appendChild(amount);
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
      info = 'bilans jest ujemny';
      break;
    default:
      info = 'bilans wynosi zero';
  }

  BalanceValue.innerHTML = '';

  BalanceValue.innerHTML = info + ' ' + Balance + ' ' + 'PLN';
};

const removeItem = (element) => {
  const indexToRemove = incomesArr.findIndex(
    (item) => item.id === element.id
  );
  incomesArr.splice(indexToRemove, 1);
  renderIncomes();
  refreshSum(0 - element.amount);
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
