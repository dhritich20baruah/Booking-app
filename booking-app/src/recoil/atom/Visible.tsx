import {atom} from "recoil";

export const VisibilityAtom = atom({
    key: "visibilityState",
    default: true
})

export const passengerVisibilityState = atom({
    key: "passengerVisibilityState",
    default: false
})