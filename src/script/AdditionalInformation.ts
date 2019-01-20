import EditableField from "@/script/EditableField";

export default class AdditionalInformation {
    public additionalInformationTitle: string;
    public additionalInformationContent: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "additionalInformationTitle"), new EditableField(String, "additionalInformationContent", true)];

    constructor(title: string = "", content: string = "") {
        this.additionalInformationTitle = title;
        this.additionalInformationContent = content;
    }
}