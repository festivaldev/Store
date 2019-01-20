import AdditionalInformation from "@/script/AdditionalInformation";
import Badge from "@/script/Badge";
import CustomPage from "@/script/CustomPage";
import Requirement from "@/script/Requirement";
import SecondaryAction from "@/script/SecondaryAction";
import Version from "@/script/Version";

export default class Package {
    public packageId: string = "";
    public packageAlias: string = "neues-paket";
    public isPublic: boolean = false;
    public isVisible: boolean = true;
    public isAvailable: boolean = true;
    public packageType: string = "package";
    public bundleContentIds: string = "";

    public requirements: Requirement[] = [new Requirement("Key", "Value")];
    public requirementsSubtitle: string = "Ihr Gerät muss alle Mindestanforderungen erfüllen, um dieses Produkt öffnen zu können.";
    public requirementsTitle: string = "Minimum";

    public versions: Version[] = [ new Version("Release 1", "", "https://media.festival.ml/download/neues-paket.zip", "<li>Neue Änderung durchgeführt</li>") ];

    public accent: string = "#FF1946";
    public coverImageUrl: string = "https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg";

    public badges: Badge[] = [ new Badge("Reduziert", "#FFD800", "var(--dark)") ];

    public packageName: string = "Neues Paket";
    public iconUrl: string = "https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg";
    public projectUrl: string = "https://madebyfestival.ml/neues-projekt";
    public shortDescription: string = "<p>Kurzbeschreibung</p>";

    public hasAlternativeButton: boolean = true;
    public alternativeButtonLine1: string = "Alternativer Button";
    public alternativeButtonLine2: string = "2. Zeile";
    public seperatorContent: string = "Trenner";

    public newPrice: string = "Neuer Preis";
    public oldPrice: string = "Alter Preis";
    public priceDetail: string = "Rabattdetails – Rabattdauer";

    public hasPrimaryButton: boolean = true;
    public primaryButtonContent: string = "Primärer Button";
    public primaryButtonUrl: string = "";
    public isPrimaryButtonDisabled: boolean = false;

    public hasSecondaryButton: boolean = true;
    public secondaryActions: SecondaryAction[] = [ new SecondaryAction("Test", "https://festival.ml/") ];

    public tcsContent: string = '<p><a href="#system-requirements" class="sv-link js-open-tab">Lesen Sie die Systemanforderungen</a></p>';

    public hasPromo: boolean = true;
    public promoTitle: string = "Promo-Überschrift";
    public promoContent: string = "Promo-Text";
    public promoCtaBackgroundColor: string = "var(--accent)";
    public promoCtaForegroundColor: string = "var(--light)";
    public promoCtaContent: string = "Promo-Button";
    public promoCtaUrl: string = "#";

    public overviewPageName: string = "Übersicht";
    public hasSystemRequirementsPage: boolean = true;
    public systemRequirementsPageName: string = "Systemanforderungen";
    public hasChangelogPage: boolean = true;
    public changelogPageName: string = "Changelog";
    public hasReviews: boolean = true;
    public reviewsPageName: string = "Kritiken";
    public customPages: CustomPage[] = [];

    public availableOnTags: string[] = [ "Windows 10" ];

    public fullDescription: string = "<p>Beschreibung</p>";

    public screenshots: string[] = [ "https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg" ];

    public featureList: string = '<ul class="sv-ul"><li>Feature #1</li></ul>';

    public additionalInfo: AdditionalInformation[] = [];

    [key: string]: any;
}