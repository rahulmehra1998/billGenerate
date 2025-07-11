function addItem() {
  const itemName = document.getElementById('itemName').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);
  const customerName = document.getElementById('customerName').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const isDiscountEnabled = document.getElementById('enableDiscount').checked;
  const discountPercent = isDiscountEnabled ? parseFloat(document.getElementById('discount').value || 0) : 0;

  if (!itemName || isNaN(quantity) || isNaN(price)) {
    alert("Please fill item name, quantity, and price.");
    return;
  }

  const discountedPrice = price - (price * discountPercent / 100);
  const total = discountedPrice * quantity;

  const tableBody = document.getElementById('billTable').getElementsByTagName('tbody')[0];
  const row = tableBody.insertRow();

  row.innerHTML = `
  <td>${itemName}</td>
  <td>${quantity}</td>
  <td>₹${price.toFixed(2)}</td>
  <td>
    <input type="number" value="${discountPercent}" class="discount-edit" min="0" max="100"
      onchange="recalculateRow(this)">
  </td>
  <td class="row-total">₹${total.toFixed(2)}</td>
  <td class="action-col"><button class="delete-btn" onclick="deleteRow(this)">🗑️</button></td>
`;


  document.getElementById('displayCustomer').innerText = `${customerName} (${customerPhone})`;
  document.getElementById('billDate').innerText = new Date().toLocaleDateString();

  updateGrandTotal();
  clearItemInputs();
}


function updateGrandTotal() {
  const table = document.getElementById('billTable').getElementsByTagName('tbody')[0];
  let grandTotal = 0;
  for (let i = 0; i < table.rows.length; i++) {
    const rowTotal = parseFloat(table.rows[i].cells[4].innerText.replace('₹', '')) || 0;
    grandTotal += rowTotal;
  }
  document.getElementById('grandTotal').innerText = `Grand Total: ₹${grandTotal.toFixed(2)}`;
}

function clearItemInputs() {
  document.getElementById('itemName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
  document.getElementById('enableDiscount').checked = false;
  document.getElementById('discount').value = '';
  document.getElementById('discountLabel').style.display = 'none';
}
function generatePDF() {
    const element = document.getElementById('billSection');
    const customerName = document.getElementById('customerName').value;
    html2pdf().from(element).save(`${customerName}_Bill.pdf`);
}
function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
  updateGrandTotal();
}
function recalculateRow(input) {
  const row = input.closest("tr");
  const qty = parseFloat(row.cells[1].innerText);
  const priceText = row.cells[2].innerText.replace('₹', '');
  const price = parseFloat(priceText);
  const discount = parseFloat(input.value) || 0;

  const discountedPrice = price - (price * discount / 100);
  const total = discountedPrice * qty;

  row.querySelector(".row-total").innerText = `₹${total.toFixed(2)}`;

  updateGrandTotal();
}

