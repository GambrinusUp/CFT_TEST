const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const resultCount = document.getElementById("resultCount");
const columnSelect = document.getElementById("column-select");

let isEditing = false;

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        tableSearch();
    }
});

searchButton.addEventListener("click", tableSearch);

function tableSearch() {
    const searchText = searchInput.value.toLowerCase();
    if(searchText !== ''){
        const selectedColumn = columnSelect.value;
        const tableCells = document.querySelectorAll(".table-cell");
        let matchCount = 0;

        tableCells.forEach((cell) => {
            cell.classList.remove("highlight");
            const columnData = cell.getAttribute("data-column");
            if (!cell.classList.contains("header-cell")) {
                if (selectedColumn === "all" || selectedColumn === columnData) {
                    if (cell.textContent.toLowerCase().includes(searchText)) {
                        cell.classList.add("highlight");
                        matchCount++;
                    }
                }
            }
        });

        if (matchCount > 0) {
            resultCount.textContent = `Найдено: ${matchCount} совпадений`;
        } else {
            resultCount.textContent = "Совпадений не найдено";
        }
    }
}

editButton.addEventListener("click", function () {
    if (!isEditing) {
        const tableRows = document.querySelectorAll(".table-row:not(.header)");
        tableRows.forEach((row) => {
            const cells = row.querySelectorAll(".table-cell");
            cells.forEach((cell) => {
                const text = cell.textContent;
                const input = document.createElement("input");
                input.value = text;
                cell.textContent = "";
                cell.appendChild(input);
            });
        });
        isEditing = true;
    }
});

saveButton.addEventListener("click", function () {
    if (isEditing) {
        const tableRows = document.querySelectorAll(".table-row:not(.header)");
        tableRows.forEach((row) => {
            const cells = row.querySelectorAll(".table-cell");
            cells.forEach((cell) => {
                const input = cell.querySelector("input");
                if (input) {
                    cell.textContent = input.value;
                }
            });
        });
        isEditing = false;
    }
});
