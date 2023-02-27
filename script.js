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
const balanceValue = document.getElementById('budgetValue');
// Buttons
const allButtons = document.querySelectorAll('.button-test');

// arrays
const incomesArr = [];
const expensesArr = [];

//vars
let cash = 0; //
let outgoes = 0;
let balance = 0;
let info = '';
//INIT
balanceValue.innerHTML = 'Możesz wciąż wydać: XXX PLN';
////////////////////////////////INCOMES
const addIncome = () => {
  const newItem = {
    title: incomeTitle.value,
    amount: Number(incomeValue.value),
    id: Math.random(),
  };
  incomesArr.push(newItem);
  renderIncomes();

  refreshSum(newItem.amount); //
};

const refreshSum = (value) => {
  cash = incomesArr.reduce(
    (prevVal, currValue) => prevVal + currValue.amount,
    0
  );
  calcBalance();
  incomesCash.innerHTML = cash;
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

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    incomesArr.find((element) => {
      if (element.id === item.id) {
        element.title = titleInput.value;
        element.amount = Number(valueInput.value);
        refreshSum(valueInput.value - element.amount);
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
  const newItemE = {
    titleE: expenseTitle.value,
    amountE: Number(expenseValue.value),
    idE: Math.random(),
  };
  expensesArr.push(newItemE);
  renderExpenses();
  refreshExpensesSum(newItemE); //
};
//OK
const refreshExpensesSum = (item) => {
  expenseCash.innerHTML = '';
  outgoes += parseFloat(expenseValue.value);
  calcBalance();
  expenseCash.innerHTML = outgoes;
};
const refreshExpensesDelete = (item) => {
  expenseCash.innerHTML = '';
  outgoes -= parseFloat(item);
  calcBalance();
  expenseCash.innerHTML = outgoes;
};

//OK

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addExpense();
});
//OK
const createElementExpense = (itemE) => {
  const listItemE = document.createElement('li');
  listItemE.idE = itemE.id; //
  listItemE.classList = 'flex flex--space-between budget__list__item'; //
  const textE = document.createElement('p');
  textE.innerText = itemE.titleE;
  const amountE = document.createElement('p');
  const buttonEditE = document.createElement('button'); //
  buttonEditE.innerText = 'Edytuj'; //
  const buttonRemoveE = document.createElement('button'); //
  buttonRemoveE.innerText = 'Usuń'; //

  amountE.innerText = itemE.amountE;
  listItemE.appendChild(textE);
  listItemE.appendChild(amountE);
  listItemE.appendChild(buttonEditE); //
  listItemE.appendChild(buttonRemoveE); //
  expensesList.appendChild(listItemE);

  buttonEditE.addEventListener('click', () => {
    //
    editItemE(itemE, textE, listItemE); //
  });

  buttonRemoveE.addEventListener('click', () => {
    //
    removeItemE(itemE); //
  }); //
};
//OK
const editItemE = (itemE, text, listItemE) => {
  listItemE.contentEditable = true;
  const editFormE = document.createElement('form');
  editFormE.classList = 'budget__list__item_edit';
  const titleInputE = document.createElement('input');
  const valueInputE = document.createElement('input');
  valueInputE.setAttribute('type', 'number');
  valueInputE.setAttribute('min', 1);
  titleInputE.value = itemE.titleE;
  valueInputE.value = itemE.amountE;
  const saveBtnE = document.createElement('input');
  saveBtnE.type = 'submit';
  saveBtnE.value = 'SAVE';
  editFormE.appendChild(titleInputE);
  editFormE.appendChild(valueInputE);
  editFormE.appendChild(saveBtnE);
  expensesList.appendChild(editFormE);

  editFormE.addEventListener('submit', (event) => {
    event.preventDefault();
    expensesArr.find((elementE) => {
      if (elementE.id === itemE.id) {
        elementE.title = titleInputE.value;
        elementE.amount = Number(valueInputE.value);
        refreshExpensesSum(valueInputE.value - elementE.amountE);
      }
    });

    renderExpenses();
  });
};
const renderExpenses = () => {
  expensesList.innerHTML = '';
  expensesArr.forEach((itemE) => {
    createElementExpense(itemE);
  });
};

////////////////////////////////BALANCE
const calcBalance = () => {
  balance = cash - outgoes;

  switch (true) {
    case balance > 0:
      info = 'możesz wciąż wydać:';

      break;
    case balance < 0:
      info = 'bilans jest ujemny';
      break;
    default:
      info = 'bilans wynosi zero';
  }

  balanceValue.innerHTML = '';

  balanceValue.innerHTML = info + ' ' + balance + ' ' + 'PLN';
};

const removeItem = (element) => {
  const indexToRemove = incomesArr.findIndex(
    (item) => item.id === element.id
  );
  incomesArr.splice(indexToRemove, 1);
  renderIncomes();
  refreshSum(0 - element.amount);
};

const removeItemE = (elementE) => {
  const indexToRemoveE = expensesArr.findIndex(
    (itemE) => itemE.idE === elementE.idE
  );
  expensesArr.splice(indexToRemoveE, 1);
  renderExpenses();
  refreshExpensesDelete(elementE.amountE);
};
