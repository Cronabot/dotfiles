import Quickshell
import QtQuick

PanelWindow {
    anchors {
        top: true
        bottom: true
        left: true
        right: true
    }

    surfaceFormat {
        opaque: false
    }

    Text {
        // center the bar in its parent component (the window)
        anchors.centerIn: parent
        opacity: 1
        text: "hello world"
    }
}
