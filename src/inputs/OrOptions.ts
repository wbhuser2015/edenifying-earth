
import { PlayerInput } from "../PlayerInput";
import { PlayerInputTypes } from "../PlayerInputTypes";

export class OrOptions implements PlayerInput {
    public cb(): undefined {
        return undefined;
    }
    public title: string = "Select one option";
    public options: Array<PlayerInput>;
    public inputType: PlayerInputTypes = PlayerInputTypes.OR_OPTIONS;
    constructor(
        ...options: Array<PlayerInput>
    ) {
        this.options = options;
    }
    public message: string = "";
}
