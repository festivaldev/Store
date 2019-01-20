import EditableField from "@/script/EditableField";

export default class Version {
    public versionName: string;
    public versionTag: string;
    public versionUrl: string;
    public versionChangelog: string;

    public editDefinitions: EditableField[] = [new EditableField(String, "versionName"), new EditableField(String, "versionTag"), new EditableField(String, "versionUrl"), new EditableField(String, "versionChangelog", true)];

    constructor(name: string = "", tag: string = "", url: string = "", changelog: string = "") {
        this.versionName = name;
        this.versionTag = tag;
        this.versionUrl = url;
        this.versionChangelog = changelog;
    }
}