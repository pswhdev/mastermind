let secretCode = [];
let colours = ['blue', 'red', 'orange', 'pink', 'green', 'purple'];

//To generate the secret code (random colorpick)
for(i=0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * 6)]);
  }

