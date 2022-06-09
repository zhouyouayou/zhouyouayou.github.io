//@ts-check
async function mainFunc() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const json = await response.json();
        initialize(json);
    } catch (error) {
        console.error(`Fetch problem: ${error.message}`)
    }
}

mainFunc();

function initialize(products) {
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');

    let categoryValue = category.value.toLowerCase();
    let searchValue = searchTerm.value.trim().toLowerCase();

    let filteredGroup;
    let finalGroup = products;
    updateDisplay();

    searchBtn.addEventListener('click', selectCategory);
    function selectCategory() {
        if (categoryValue === category.value.toLowerCase() && searchValue === searchTerm.value.trim().toLowerCase()) {
            return;
        }
        categoryValue = category.value.toLowerCase();
        searchValue = searchTerm.value.trim().toLowerCase();

        if (categoryValue === 'all') {
            filteredGroup = products;
        } else {
            filteredGroup = products.filter(product => product.type === categoryValue)
        }
        finalGroup = [];
        selectProducts();

    }

    function selectProducts() {
        if (searchValue === '') {
            finalGroup = filteredGroup;
        } else {
            finalGroup = filteredGroup.filter(product => product.name.contains(searchValue));
        }
        updateDisplay();
    }

    function updateDisplay() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No result found.';
            main.appendChild(para);
        } else {
            for (const product of products) {
                const sec = document.createElement('section');
                const h2 = document.createElement('h2');
                const para = document.createElement('p');
                const img = document.createElement('img');

                sec.setAttribute('class', product['type']);

                h2.textContent = product.name.replace(product.name.charAt([0]), product.name.charAt([0]).toUpperCase());

                para.textContent = `$${product.price}`;

                img.src = `images/${product.image}`;
                img.alt = `${product.name}`;

                main.appendChild(sec);
                sec.appendChild(h2);
                sec.appendChild(para);
                sec.appendChild(img);
            }
        }
    }

}