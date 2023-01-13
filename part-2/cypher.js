// The following code should encipher and decipher a string of letters and numbers according the key in the cypher.txt file
// This is an assignment for DevMountain Foundation course.  Unit-4

// Ex. -   DevMountain PT07
// Enc - $2#1$2#2%24#3$6#6%24#10$17#3$10#3%20#1%5#5$6#2$10#3*%20#5$18#1AH

// Ex. - I love cryptography
// Enc - %10#2*$6#5$10#4%25#4$2#2*$2#0%19#2$12#12$7#8%25#6$7#7%7#1%19#2$5#0%18#3%10#3$22#2

// Alphabet - a, b, c, d, e, f, g, h, i, j,  k,  l,  m, n,   o,  p,  q,  r,  s,  t, u,  v,  w,  x,  y,  z
// Index-     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21, 22, 23, 24, 25
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function encipher(string) {

  const stringArray = Array.from(string);
  let cypher = "";

  stringArray.forEach((char) => {
    const lcChar = char.toLowerCase();
    const charIndex = alphabet.indexOf(lcChar);
    const isANumber = !isNaN(lcChar);
    if (char === " ") {
        cypher += "*."
        return
    }
    switch (isANumber) {
      case true:
        cypher += `${alphabet[Number(lcChar)]}.`
        break;
      case false:
        if (alphabet.includes(lcChar)) {
            const num1 = Math.floor(Math.random() * alphabet.length)
            if (num1 > charIndex) {
            cypher += `%${String(num1)}#`
            cypher += `${String(num1 - charIndex)}.`
            } else if (num1 < charIndex) {
            cypher += `$${num1}#`
            cypher += `${String(charIndex - num1)}.`
            } else {
            cypher += `%${charIndex}#0.`
        }
        }
        break;
    }

  });

  console.log({cypher});
  return cypher
}

function decipher(string) {

    const array = string.split(".")
    array.splice(-1)
    let decipher = ""
    let letterArray;

    array.forEach( encLetter => {
        if (encLetter.charAt(0) === "$") {
            const newArray = encLetter.slice(1)
            letterArray = newArray.split("#")
            const i = Number(letterArray[0]) + Number(letterArray[1])
            decipher += alphabet[i]
        } else if (encLetter.charAt(0) === "%") {
            const newArray = encLetter.slice(1)
            letterArray = newArray.split("#")
            const i = Number(letterArray[0]) - Number(letterArray[1])
            decipher += alphabet[i]
        } else if (encLetter.charAt(0) === "*") {
            decipher += " "
        } else {
            const num = alphabet.indexOf(encLetter)
            decipher += String(num)
        }
    })
    return decipher
}

// This should print whatever you type in the encipher parameter after it has been enciphered and then deciphered.  The console will also log the enciphered version.
console.log(decipher(encipher("DevMountain Cryptology")))