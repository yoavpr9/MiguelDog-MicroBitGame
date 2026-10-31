// MIGUEL - CONTROLLER micro:bit (the one in your hand, on battery)
// Paste into makecode.microbit.org -> New Project -> JavaScript tab, then Download.
//
// Sends by radio every 40 ms:   PITCH,ROLL,A,B,SHAKE    e.g. "-23,41,0,1,0"
//   PITCH / ROLL = tilt in degrees
//   A / B        = 1 while the button is held
//   SHAKE        = 1 while the micro:bit is being shaken
//
// No endless loops: everything runs from MakeCode's own timed "forever" block
// and the shake event.

radio.setGroup(42)              // must be the same number on the receiver
radio.setTransmitPower(7)

basic.showLeds(`
    # . . . #
    # # . # #
    . # . # .
    . . . . .
    . . # . .
    `)

let lastShake = -10000
let a = 0
let b = 0
let s = 0

// the built-in shake gesture
input.onGesture(Gesture.Shake, function () {
    lastShake = control.millis()
})

basic.forever(function () {
    // short, hard shakes also count
    if (input.acceleration(Dimension.Strength) > 1700) {
        lastShake = control.millis()
    }
    a = 0
    b = 0
    s = 0
    if (input.buttonIsPressed(Button.A)) {
        a = 1
    }
    if (input.buttonIsPressed(Button.B)) {
        b = 1
    }
    if (control.millis() - lastShake < 350) {
        s = 1
    }
    radio.sendString("" + input.rotation(Rotation.Pitch) + "," + input.rotation(Rotation.Roll) + "," + a + "," + b + "," + s)
    basic.pause(40)
})
