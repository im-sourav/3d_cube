let cvs = new Canvas(document.documentElement.clientWidth, document.documentElement.clientHeight);

cvs.rect("#000000");
{
  // cvs.rectStroke();
  // cvs.arc();
  // cvs.arcStroke();
  // cvs.moveTo();
  // cvs.lineTo(100, 100);
  // cvs.lineTo(100, 200);
  // cvs.closePath()
}
const centerX = cvs.width / 2;
const centerY = cvs.height / 2;
const centerZ = 0;
const size = (cvs.height + cvs.width) / 9;
const depth = 100;
const FPS = 20;
let angleX = Canvas.toRadian(1),
  angleY = Canvas.toRadian(1),
  angleZ = Canvas.toRadian(1);

let vertices = [
  [centerX - size, centerY - size, centerZ - size],
  [centerX + size, centerY - size, centerZ - size],
  [centerX + size, centerY + size, centerZ - size],
  [centerX - size, centerY + size, centerZ - size],
  [centerX - size, centerY - size, centerZ + size],
  [centerX + size, centerY - size, centerZ + size],
  [centerX + size, centerY + size, centerZ + size],
  [centerX - size, centerY + size, centerZ + size],
];

let edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0], // back face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4], // front face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7], // connecting sides
];

let sides = [
    [0, 1, 2, 3, "#ff00ff22"],
    [4, 5, 6, 7, "#ff000022"],
    [0, 4, 7, 3, "#00ff0022"],
    [1, 5, 6, 2, "#000fff22"],
    [0, 4, 5, 1, "#0000ff22"],
    [3, 7, 6, 2, "#ffff0022"],
]

{
  // let p = new Projection(cubePoints);
  // cubePoints = Projection.sizing(cubePoints, scale);
  // console.table(cubePoints);
  // let d2 = Projection.twoD(cubePoints, depth);
  // p.draw(d2);
  // console.table(d2);
}

for (let i = 0; i < edges.length; i++) {
  cvs.moveTo("#ffffff", vertices[edges[i][0]][0], vertices[edges[i][0]][1], "");
  for (let j = 1; j < edges[i].length; j++) {
    cvs.lineTo(vertices[edges[i][j]][0], vertices[edges[i][j]][1]);
  }
  cvs.closePath();
}

let loop = () => {
  cvs.clearRect();
  cvs.rect("#000000");
  let v = vertices;

  for (let i = 0; i < v.length; i++) {
    let dx = v[i][0] - centerX;
    let dy = v[i][1] - centerY;
    let x = dx * Math.cos(angleX) - dy * Math.sin(angleX);
    let y = dx * Math.sin(angleX) + dy * Math.cos(angleX);
    v[i][0] = x + centerX;
    v[i][1] = y + centerY;
  }

  for (let i = 0; i < v.length; i++) {
    let dy = v[i][1] - centerY;
    let dz = v[i][2] - centerZ;
    let y = dy * Math.cos(angleY) - dz * Math.sin(angleY);
    let z = dy * Math.sin(angleY) + dz * Math.cos(angleY);
    v[i][1] = y + centerY;
    v[i][2] = z + centerZ;
  }

  for (let i = 0; i < v.length; i++) {
    let dx = v[i][0] - centerX;
    let dz = v[i][2] - centerZ;
    let x = dz * Math.sin(angleZ) + dx * Math.cos(angleZ);
    let z = dz * Math.cos(angleZ) - dx * Math.sin(angleZ);
    v[i][0] = x + centerX;
    v[i][2] = z + centerZ;
  }

  for (let i = 0; i < sides.length; i++) {
      cvs.moveTo(
          "#ffffff",
          v[sides[i][0]][0],
          v[sides[i][0]][1],
          sides[i][4]
          );
          for (let j = 1; j < sides[i].length - 1; j++) {
              cvs.lineTo(v[sides[i][j]][0], v[sides[i][j]][1]);
    }
    cvs.context.closePath();
    cvs.closePath();
}
  for (let i = 0; i < edges.length; i++) {
    cvs.moveTo(
      "#fff000",
      v[edges[i][0]][0],
      v[edges[i][0]][1],
      "",
      3
    );
    for (let j = 1; j < edges[i].length; j++) {
      cvs.lineTo(v[edges[i][j]][0], v[edges[i][j]][1],);
    }
    cvs.closePath();
  }

  setTimeout(() => {
    loop();
  }, 1000 / FPS);
};
loop();
