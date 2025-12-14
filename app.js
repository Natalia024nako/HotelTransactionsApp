let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

localStorage.setItem("hotelName", "Natalia Hotel");
const hotelName = localStorage.getItem("hotelName");
console.log("Loaded hotel name:", hotelName);

const form = document.getElementById("transactionForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const guestName = document.getElementById("guestName").value;
        const roomNumber = document.getElementById("roomNumber").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;

        const newTransaction = {
            guestName,
            roomNumber,
            amount,
            date
        };

        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        alert("Transaction Saved!");
        form.reset();
    });
}

const tableBody = document.querySelector("#transactionTable tbody");

if (tableBody) {
    tableBody.innerHTML = "";

    transactions.forEach((t, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.guestName}</td>
            <td>${t.roomNumber}</td>
            <td>$${t.amount}</td>
            <td>${t.date}</td>
            <td>
                <button onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    location.reload();
}
