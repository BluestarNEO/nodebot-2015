var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board();

board.on("ready", function() {
  var speed, commands, motors;
  var led = new five.Led(11);

  speed = 100;
  commands = null;
  var motors = new five.Motors([
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2
  ]);

  this.repl.inject({
    led: led,
    motors: motors
  });

  function controller(ch, key) {
    if (key) {

      if (key.name === "a") {
        speed *= 1.5;
      }

      if (key.name === "d") {
        speed /= 1.5;
      }

      if (key.name === "space") {
        motors[0].stop();
        motors[1].stop();
      }
      if (key.name === "up") {
        motors[0].fwd(speed);
        motors[1].fwd(speed);
      }
      if (key.name === "down") {
        motors[0].rev(speed);
        motors[1].rev(speed);
      }
      if (key.name === "left") {
        motors[0].fwd(speed * 0.75);
        motors[1].rev(speed * 0.75);
      }
      if (key.name === "right") {
        motors[0].rev(speed * 0.75);
        motors[1].fwd(speed * 0.75);
      }


      commands = [].slice.call(arguments);
    } else {
      if (ch >= 1 && ch <= 9) {
        speed = five.Fn.scale(ch, 1, 9, 0, 255);
        controller.apply(null, commands);
      }
    }
  }


  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
