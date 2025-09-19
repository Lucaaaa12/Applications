function rollDice() {

    const diceInput = document.getElementById("diceInput").value;
    const diceResult = document.getElementById("diceResult");
    const diceImage = document.getElementById("diceImage");
    const values = [];
    const images = [];

    for (let i = 1; i <= diceInput; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="images/dice${value}.png" alt="Dice ${value}" >`);
    }

    diceResult.textContent = `dice ${values.join(", ")}`;
    diceImage.innerHTML = images.join(" ");
}
