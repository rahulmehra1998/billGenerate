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

  // Calculate total after discount
  const discountedPrice = price - (price * discountPercent / 100);
  const total = discountedPrice * quantity;

  // Add row to bill table
  const table = document.getElementById('billTable').getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  row.innerHTML = `
    <td>${itemName}</td>
    <td>${quantity}</td>
    <td>₹${price.toFixed(2)}</td>
    <td>${discountPercent}%</td>
    <td>₹${total.toFixed(2)}</td>
  `;

  // Update customer name and date
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