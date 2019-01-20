import EditableField from "@/script/EditableField";

export default class CustomPage {
    public customPageId: string;
    public customPageName: string;
    public customPageContent: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "customPageId"), new EditableField(String, "customPageName"), new EditableField(String, "customPageContent", true)];

    constructor(id: string = "", name: string = "", content: string = "") {
        this.customPageId = id;
        this.customPageName = name;
        this.customPageContent = content;
    }
}