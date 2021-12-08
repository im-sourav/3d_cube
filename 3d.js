"use strict";

class Projection {
  constructor(array) {}
  static sizing(array, scale) {
    this.scale = scale * 0.5;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        array[i][j] = this.scale * array[i][j];
      }
    }
    return array;
  }
  static twoD(array, depth) {
      console.log(array);
    let narray = [];
    for (let i = 0; i < array.length; i++) {
      narray[i] = [];
      for (let j = 0; j < array[i].length; j++) {
        this.depth = depth / array[i][2];
        if (j != 2) {
          if (j == 0) {
              console.log(centerX + array[i][j] * this.depth * Math.cos(angleX));
            narray[i][j] = centerX + array[i][j] * this.depth * Math.cos(angleX);
          } else {
            narray[i][j] = centerY + array[i][j] * this.depth;
          }
        }
      }
    }
    return narray;
  }
  draw(array) {
    // this.angleX = angleX;
    // this.angleY = angleY;
    // for (let i = 0; i < array.length; i++) {
    //   // console.log(array[i][0]);
    //   cvs.arc(
    //     "#ffffff",
    //     centerX + array[i][0] * Math.cos(this.angleX),
    //     centerY + array[i][1] * Math.sin(this.angleY),
    //     2
    //   );
    // console.log(array[i][0], array[i][1]);
    // cvs.rect("#ffffff", array[i][0], array[i][1]);
    // }

    // console.log(array);

    for (let i = 0; i < points.length; i++) {
      cvs.moveTo("#ffffff", array[points[i][0]][0], array[points[i][0]][1], "", 1);
      for (let j = 1; j < points[i].length; j++) {
        cvs.lineTo(array[points[i][j]][0], array[points[i][j]][1]);
      }
      cvs.closePath();
    }
  }
}
