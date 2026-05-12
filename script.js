document.addEventListener('DOMContentLoaded', () => {
    const pName = document.getElementById('p-name');
    const pQty = document.getElementById('p-qty');
    const pPrice = document.getElementById('p-price');
    const addItemBtn = document.getElementById('add-item');
    const itemsList = document.getElementById('items-list');
    const totalAmountSpan = document.getElementById('total-amount');
    const currentTimeSpan = document.getElementById('current-time');
    const clearAllBtn = document.getElementById('clear-all');

    let items = [];

    // Set current date and time
    const updateTime = () => {
        const now = new Date();
        const date = now.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', hour12: false });
        currentTimeSpan.textContent = `${date} ${time}`;
    };

    updateTime();
    setInterval(updateTime, 60000);

    // Format numbers to Uzbek currency style (space separator)
    const formatCurrency = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
    };

    const renderItems = () => {
        itemsList.innerHTML = '';
        let total = 0;

        items.forEach((item, index) => {
            const row = document.createElement('tr');
            const itemSum = item.qty * item.price;
            total += itemSum;

            row.innerHTML = `
                <td>${item.name}</td>
                <td class="num">${item.qty}</td>
                <td class="num">${formatCurrency(item.price)}</td>
                <td class="num">${formatCurrency(itemSum)}</td>
            `;
            
            // Add a click-to-remove feature (bonus)
            row.style.cursor = 'pointer';
            row.title = 'O\'chirish uchun bosing';
            row.onclick = () => {
                items.splice(index, 1);
                renderItems();
            };

            itemsList.appendChild(row);
        });

        totalAmountSpan.textContent = formatCurrency(total);
    };

    addItemBtn.addEventListener('click', () => {
        const name = pName.value.trim();
        const qty = parseInt(pQty.value);
        const price = parseInt(pPrice.value);

        if (!name) {
            alert('Mahsulot nomini kiriting!');
            return;
        }

        if (isNaN(qty) || qty <= 0) {
            alert('Donasini to\'g\'ri kiriting!');
            return;
        }

        if (isNaN(price) || price < 0) {
            alert('Narxini to\'g\'ri kiriting!');
            return;
        }

        items.push({ name, qty, price });
        renderItems();

        // Reset inputs
        pName.value = '';
        pQty.value = '1';
        pPrice.value = '0';
        pName.focus();
    });

    // Enter key support
    pPrice.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItemBtn.click();
    });

    clearAllBtn.addEventListener('click', () => {
        if (confirm('Barcha ma\'lumotlarni o\'chirib tashlaysizmi?')) {
            items = [];
            renderItems();
        }
    });
});
