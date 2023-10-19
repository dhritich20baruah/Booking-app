import {selector} from 'recoil';
import { passengerVisibilityState } from '../atom/Visible';

export const passengerVisibilitySelector = selector({
    key: 'passengerVisibilitySelector',
    get: ({get}) => get(passengerVisibilityState),
    set: ({set}) => {
        set(passengerVisibilityState, (passengerVisibility)=>!passengerVisibility)
    }
})