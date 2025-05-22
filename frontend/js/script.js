//Test function that takes two numbers sends them to the backend to be added, takes the result and prints it

const calculatorButtons = document.querySelectorAll(".calculator-button");
const calcScreenOutput = document.querySelector(".calculator-screen");

let processingNumbers = [];
let currentResult = 0;
const placeholder = calcScreenOutput.textContent;

function init() {
  processingNumbers = [];
  calcScreenOutput.textContent = placeholder;
  currentResult = 0;
}

async function setupListeners() {
  calculatorButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const btnId = button.id;
      const btnCont = button.textContent;

      if (
        btnId.startsWith("num-") &&
        currentResult !== 0 &&
        processingNumbers.length === 0
      ) {
        init();
        calcScreenOutput.textContent = btnCont;
        processingNumbers.push(btnCont);
        return;
      }

      if (btnId.startsWith("num-") && currentResult === 0) {
        if (processingNumbers.length === 0) {
          calcScreenOutput.textContent = btnCont;
        } else {
          calcScreenOutput.textContent += btnCont;
        }
        processingNumbers.push(btnCont);
        return;
      }
      if (
        btnId === "add" &&
        (processingNumbers.length > 0 || currentResult !== 0)
      ) {
        if (processingNumbers.length === 0) {
          processingNumbers.push(String(currentResult));
        }
        processingNumbers.push("+");
        calcScreenOutput.textContent += "+";
        currentResult = 0;
        return;
      }

      //add others later
      else if (btnId === "equal") {
        const parts = processingNumbers.join("").split("+").map(Number);
        let total = parts[0];
        for (let i = 1; i < parts.length; i++) {
          total = await testAdding(total, parts[i]);
        }
        calcScreenOutput.textContent = total;
        processingNumbers = [];
        currentResult = total;
        return;
      }
      if (btnId === "clear") {
        init();
        return;
      }
    });
  });
}

async function testAdding(num1, num2) {
  try {
    const res = await fetch("http://localhost:3000/adds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2 }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const { result } = await res.json();
    return result;
  } catch (err) {
    console.error("Add failed:", err);
  }
}

// Initialize and wire up everything
init();
setupListeners();
