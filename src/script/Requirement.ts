import EditableField from "@/script/EditableField";

export default class Requirement {
    public requirementKey: string;
    public requirementValue: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "requirementKey"), new EditableField(String, "requirementValue", true)];

    constructor(key: string = "", value: string = "") {
        this.requirementKey = key;
        this.requirementValue = value;
    }
}