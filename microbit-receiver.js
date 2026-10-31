// MIGUEL - RECEIVER micro:bit (stays plugged into the computer by USB)
// Paste into makecode.microbit.org -> New Project -> JavaScript tab, then Download.
//
// Passes every radio message from the controller to the game over USB.

radio.setGroup(42)              // must be the same number on the controller
radio.setTransmitPower(7)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)

let lastHeard = -10000
let linked = false
basic.showIcon(IconNames.No)    // X = can't hear the controller

radio.onReceivedString(function (msg) {
    serial.writeLine(msg)
    lastHeard = control.millis()
})

basic.forever(function () {
    let ok = control.millis() - lastHeard < 1000
    if (ok && !linked) {
        linked = true
        basic.showIcon(IconNames.Yes)   // tick = controller connected
    } else if (!ok && linked) {
        linked = false
        basic.showIcon(IconNames.No)
    }
    basic.pause(200)
})
