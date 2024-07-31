document.addEventListener("DOMContentLoaded", function () {
    const voucherValueInput = document.getElementById('voucherValue');
    const quantityInput = document.getElementById('quantity');
    const totalValueDisplay = document.getElementById('totalValue');

    let quantity = parseInt(quantityInput.value, 10);
    let voucherValue = parseInt(voucherValueInput.value, 10);

    function updateTotalValue() {
        const total = voucherValue * quantity;
        totalValueDisplay.textContent = `£${total}`;
    }

    function updateQuantity(change) {
        quantity = Math.max(1, quantity + change);
        quantityInput.value = quantity;
        updateTotalValue();
    }

    voucherValueInput.addEventListener('input', function () {
        const value = parseInt(voucherValueInput.value, 10);
        if (isNaN(value) || value < 30 || value > 800 || value % 5 !== 0) {
            voucherValueInput.value = voucherValue; // revert to previous valid value
        } else {
            voucherValue = value;
            updateTotalValue();
        }
    });

    quantityInput.addEventListener('input', function () {
        const value = parseInt(quantityInput.value, 10);
        if (isNaN(value) || value < 1) {
            quantityInput.value = quantity; // revert to previous valid value
        } else {
            quantity = value;
            updateTotalValue();
        }
    });

    // Set initial total value
    updateTotalValue();
    
    // Example function for purchase
    function purchaseVoucher() {
        alert(`Purchasing ${quantity} voucher(s) of £${voucherValue} each. Total: £${voucherValue * quantity}`);
        // Implement actual purchase logic here
    }

    // Attach purchaseVoucher function to global scope for button onclick
    window.purchaseVoucher = purchaseVoucher;
    window.updateQuantity = updateQuantity;
});