import EditableField from "@/script/EditableField";

export default class SecondaryAction {
    public secondaryActionContent: string;
    public secondaryActionUrl: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "secondaryActionContent"), new EditableField(String, "secondaryActionUrl")];

    constructor(content: string = "", url: string = "") {
        this.secondaryActionContent = content;
        this.secondaryActionUrl = url;
    }
}