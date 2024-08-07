let quantity = 1;
let voucherValue = 30;
let itemValue = 0;

function updateTotalValue() {
    const totalValueDisplay = document.getElementById('totalValue');
    const pathname = window.location.pathname;

    if (pathname.includes('item.html')) {
        const total = itemValue * quantity;
        totalValueDisplay.textContent = `£${total.toFixed(2)}`;
    } else if (pathname.includes('voucher.html')) {
        const total = voucherValue * quantity;
        totalValueDisplay.textContent = `£${total.toFixed(2)}`;
    }
}

function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    quantity = Math.max(1, quantity + change);
    quantityInput.value = quantity;
    updateTotalValue();
}

function purchaseVoucher() {
    alert(`Purchased ${quantity} items`);
}

function initializeVoucherFunctions() {
    const quantityInput = document.getElementById('quantity');
    const totalValueDisplay = document.getElementById('totalValue');
    const clothingValueElement = document.getElementById('clothingValue');

    if (clothingValueElement) {
        itemValue = parseFloat(clothingValueElement.textContent.replace('£', ''));
    }

    quantity = parseInt(quantityInput.value, 10);

    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            const value = parseInt(quantityInput.value, 10);
            if (isNaN(value) || value < 1) {
                quantityInput.value = quantity; // revert to previous valid value
            } else {
                quantity = value;
                updateTotalValue();
            }
        });
    }

    // Set initial total value
    updateTotalValue();

    // Attach functions to the global scope for button onclick
    window.updateQuantity = updateQuantity;
    window.purchaseVoucher = purchaseVoucher;
}

document.addEventListener("DOMContentLoaded", () => {
    // Observe changes to the DOM to detect when clothingValue is added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                const clothingValueElement = document.getElementById('clothingValue');
                if (clothingValueElement) {
                    itemValue = parseFloat(clothingValueElement.textContent.replace('£', ''));
                    updateTotalValue();
                    initializeVoucherFunctions();
                    observer.disconnect();  // Stop observing once initialization is done
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback in case clothingValue is already present when DOMContentLoaded fires
    if (document.getElementById('clothingValue')) {
        initializeVoucherFunctions();
    }
});
