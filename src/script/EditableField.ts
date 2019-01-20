export default class EditableField {
    public type: any;
    public key: string;
    public multiline: boolean = false;
    public disabled: boolean = false;
    public options: string[] = [];
    public itemType: any = Object;

    constructor(type: any = undefined, key: string = "", multiline: boolean = false, disabled: boolean = false, options: string[] = []) {
        this.type = type;
        this.key = key;
        this.multiline = multiline;
        this.disabled = disabled;
        this.options = options;
    }
}