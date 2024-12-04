const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encryptText() {
  const plaintext = document.getElementById("encrypt-plaintext").value;
  const key = parseInt(document.getElementById("encrypt-key").value);
  let ciphertext = "";

  // Convert to uppercase for simplicity
  const upperPlaintext = plaintext.toUpperCase();

  for (let i = 0; i < upperPlaintext.length; i++) {
    const char = upperPlaintext[i];

    if (alphabet.includes(char)) {
      // Find the new character after shifting by the key
      const index = (alphabet.indexOf(char) + key) % 26;
      ciphertext += alphabet[index];
    } else {
      // Leave non-alphabet characters as they are
      ciphertext += char;
    }
  }

  // Display the encrypted text
  document.getElementById("encrypt-output").innerHTML = `
    <p>Encrypted Text: <b>${ciphertext}</b></p>
  `;
}

function decryptText() {
  const ciphertext = document.getElementById("decrypt-ciphertext").value;
  const key = parseInt(document.getElementById("decrypt-key").value);
  let plaintext = "";

  const upperCiphertext = ciphertext.toUpperCase();

  for (let i = 0; i < upperCiphertext.length; i++) {
    const char = upperCiphertext[i];

    if (alphabet.includes(char)) {
      const index = (alphabet.indexOf(char) - key + 26) % 26;
      plaintext += alphabet[index];
    } else {
      plaintext += char;
    }
  }

  document.getElementById("decrypt-output").innerHTML = `
    <p>Decrypted Text: <b>${plaintext}</b></p>
  `;
}
