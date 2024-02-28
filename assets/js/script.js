let secretCode = [];
let colours = ['blue', 'red', 'orange', 'pink', 'green', 'purple'];

//To generate the secret code (random colorpick). Note: It can add the same colour multiple times
function generateSecretCode(){
    for (i = 0; i < 4; i++) {
        secretCode.push(colours[Math.floor(Math.random() * 6)]);
      }
    return secretCode;
}

let newCode = generateSecretCode();







