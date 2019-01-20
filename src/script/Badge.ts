import EditableField from "@/script/EditableField";

export default class Badge {
    public badgeContent: string;
    public badgeBackgroundColor: string;
    public badgeForegroundColor: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "badgeContent"), new EditableField(String, "badgeBackgroundColor"), new EditableField(String, "badgeForegroundColor")];

    constructor(content: string = "", backgroundColor: string = "", foregroundColor: string = "") {
        this.badgeContent = content;
        this.badgeBackgroundColor = backgroundColor;
        this.badgeForegroundColor = foregroundColor;
    }
}