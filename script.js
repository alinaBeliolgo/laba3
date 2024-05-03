let transactions = [];
let transactionId = 0;

// Форма добавления транзакций
const form = document.getElementById('transaction-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');
    
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;
    const category = categoryInput.value;


    if (amount === 0) {
        alert("Сумма транзакции не может быть равна нулю.");
        return;
    }
    
    // Создание новой транзакции
    const transaction = {
        id: transactionId++,
        date: new Date().toLocaleString(),
        amount: amount,
        category: category,
        description: description
    };
    
    // Добавление транзакции в массив
    transactions.push(transaction);
    
    // Отображение транзакции в таблице
    displayTransaction(transaction);
    
    // Подсчет общей суммы
    calculateTotal();
    
    // Очистка формы
    form.reset();
});

// Функция для отображения транзакции в таблице
function displayTransaction(transaction) {
    const table = document.getElementById('transactions-table').querySelector('tbody');
    
    const row = table.insertRow();
    
    const colorClass = transaction.amount > 0 ? 'positive-amount' : 'negative-amount';
    row.classList.add(colorClass);
    
    // Заполнение ячеек таблицы
    row.insertCell().textContent = transaction.id;
    row.insertCell().textContent = transaction.date;
    row.insertCell().textContent = transaction.category;
    row.insertCell().textContent = transaction.description.split(' ').slice(0, 4).join(' ');
    
    const actionCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.dataset.id = transaction.id;
    deleteButton.addEventListener('click', () => removeTransaction(transaction.id, row));
    actionCell.appendChild(deleteButton);
    
    row.addEventListener('click', () => showTransactionDetail(transaction));
}

// Функция для удаления транзакции
function removeTransaction(transactionId, row) {
    // Удаление транзакции из массива
    transactions = transactions.filter(transaction => transaction.id !== transactionId);
    
    // Удаление строки из таблицы
    row.remove();
    
    // Подсчет общей суммы
    calculateTotal();
}

// Функция для отображения полного описания транзакции
function showTransactionDetail(transaction) {
    const detailElement = document.getElementById('transaction-detail');
    detailElement.innerHTML = `
        <p>ID: ${transaction.id}</p>
        <p>Дата и время: ${transaction.date}</p>
        <p>Сумма: ${transaction.amount}</p>
        <p>Категория: ${transaction.category}</p>
        <p>Описание: ${transaction.description}</p>
    `;
}

// Функция для подсчета и отображения общей суммы транзакций
function calculateTotal() {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}
