export default class Dialog {
    public accent: string = "#0078D7";
    public title: string;
    public content: string;
    public hasPrimary: boolean;
    public primaryContent: string;
    public primaryRoute: string;
    public hasSecondary: boolean = true;
    public secondaryContent: string = "Schließen";
    public hasInput: boolean;
    public inputPlaceholder: string;
    public inputContent: string;    
    public hasClose: boolean;
    public callback: string = "empty-dialog-callback-return";

    public static Empty: Dialog = new Dialog("empty-dialog-do-not-use");

    constructor(content: string = "", title: string = "") {
        this.content = content;
        this.title = title;
    }
}