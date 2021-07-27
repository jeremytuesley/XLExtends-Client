const Canvas = () => {
  let canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let c = canvas.getContext("2d");
  //   mouse interactive
  let mouse = {
    x: undefined,
    y: undefined
  };
  let colors = ["#6a0dad", "#00CCFF", "#FFD700", "#FF69B4", "#FF0000"];
  let maxR = 40;
  //   construct circles
  function Circles(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minR = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.lineWidth = 10;
      c.fillStyle = this.color;
      c.fill();
    };
    //  function for moving balls
    this.update = function () {
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      // interactivity condition
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxR) {
          this.radius += 1;
        }
      } else if (this.radius > this.minR) {
        this.radius -= 1;
      }
      this.draw();
    };
  }

  let circleArr = [];
  // function looping for produce 500 balls
  function init() {
    for (let i = 0; i < 500; i++) {
      let radius = Math.random() * 3 + 1;
      let x = Math.random() * (window.innerWidth - radius * 2) + radius,
        y = Math.random() * (window.innerHeight - radius * 2) + radius,
        dx = (Math.random() - 0.5) * 2,
        dy = (Math.random() - 0.5) * 2;
      circleArr.push(new Circles(x, y, dx, dy, radius));
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let k = 0; k < circleArr.length; k++) {
      circleArr[k].update();
    }
  }
  animate();
  window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  window.addEventListener("resize", function () {
    canvas.width = window.window.innerWidth;
    canvas.height = window.innerHeight;
  });
  init();
};

export default Canvas;
