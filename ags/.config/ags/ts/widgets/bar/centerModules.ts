import { mpris } from "resource:///com/github/Aylur/ags/service/mpris.js";
import { CenterBox, EventBox, Label, Box, Revealer } from "resource:///com/github/Aylur/ags/widget.js";
import { ellipsisTruncate } from "../../utils";

const MprisInfo = () => EventBox({
    child: Label({
        class_name: "box-center",
        label: "No Players Available"
    }).hook(mpris, self => {
        if (mpris.players.length == 0) {
            return "No Players Available"
        }
        let p = mpris.players[0]

        let a = p.track_title
        let b = p.track_artists.join(", ")

        self.label = `${ellipsisTruncate(a, 20)} - ${ellipsisTruncate(b, 15)}`
    })
})


export const CenterModules = () => Box({
    child: Revealer({
        transition_duration: 200,
        transition: "slide_down",
        vpack: "start",
        child: MprisInfo(),
    }).hook(mpris, self => {
        self.reveal_child = mpris.players.length > 0
    }),
})
