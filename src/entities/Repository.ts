import { date } from "quasar";

export default class Repository {
    private readonly DATE_FORMAT = "DD/MM/YYYY HH:mm";

    constructor(
        readonly created_at: string = '',
        readonly updated_at: string = '',
        readonly description: string = '',
        readonly name: string = '',
        readonly html_url: string = '',
        readonly fork: boolean = false,
    ) {
        this.created_at = this.getCreatedAt();
        this.updated_at = this.getUpdatedAt();
    }

    private getCreatedAt(): string {
        return date.formatDate(this.created_at, this.DATE_FORMAT);
    }

    private getUpdatedAt(): string {
        return date.formatDate(this.updated_at, this.DATE_FORMAT);
    }
}