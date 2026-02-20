export class Url {
    constructor(code, originalUrl) {
        this.code = code;
        this.originalUrl = originalUrl;
        this.clicks = 0;
        this.createdAt = new Date();
        this.lastAccessedAt = null;
    }
}