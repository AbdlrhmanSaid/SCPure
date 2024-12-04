// Generate a 5x5 Playfair matrix from the keyword
function generateMatrix(keyword) {
  keyword = keyword.toUpperCase().replace(/J/g, "I");
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  let unique = Array.from(new Set(keyword + alphabet));
  let matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(unique.slice(i * 5, i * 5 + 5));
  }
  return matrix;
}

// Prepare the text for encryption or decryption
function prepareText(text, isDecrypt = false) {
  text = text
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I");
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (i + 1 < text.length && text[i] === text[i + 1]) {
      result += text[i] + "X"; // Add 'X' between repeated letters
    } else {
      result += text[i];
    }
  }
  if (result.length % 2 !== 0) result += "X"; // Add padding if necessary
  return result.match(/.{1,2}/g) || [];
}

// Find the position of a character in the matrix
function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) return [row, col];
    }
  }
  return null;
}

// Process the text (encrypt or decrypt)
function processText(text, keyword, mode) {
  let matrix = generateMatrix(keyword);
  let digraphs = prepareText(text);
  let result = "";

  for (let pair of digraphs) {
    let [row1, col1] = findPosition(matrix, pair[0]);
    let [row2, col2] = findPosition(matrix, pair[1]);

    if (row1 === row2) {
      // Same row
      result += matrix[row1][(col1 + (mode === "encrypt" ? 1 : 4)) % 5];
      result += matrix[row2][(col2 + (mode === "encrypt" ? 1 : 4)) % 5];
    } else if (col1 === col2) {
      // Same column
      result += matrix[(row1 + (mode === "encrypt" ? 1 : 4)) % 5][col1];
      result += matrix[(row2 + (mode === "encrypt" ? 1 : 4)) % 5][col2];
    } else {
      // Rectangle
      result += matrix[row1][col2];
      result += matrix[row2][col1];
    }
  }

  return result;
}

// Encrypt text
function encryptText() {
  const plaintext = document.getElementById("encrypt-plaintext").value;
  const keyword = document.getElementById("encrypt-keyword").value;
  const ciphertext = processText(plaintext, keyword, "encrypt");

  document.getElementById("encrypt-output").innerHTML = `
      <p>Encrypted Text: <b>${ciphertext}</b></p>
  `;
}

// Decrypt text
function decryptText() {
  const ciphertext = document.getElementById("decrypt-ciphertext").value;
  const keyword = document.getElementById("decrypt-keyword").value;
  const plaintext = processText(ciphertext, keyword, "decrypt");

  document.getElementById("decrypt-output").innerHTML = `
      <p>Decrypted Text: <b>${plaintext}</b></p>
  `;
}
