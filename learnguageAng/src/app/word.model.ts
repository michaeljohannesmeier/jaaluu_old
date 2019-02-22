
export class Word {
    public wordSingle: string;
    public wordPlural: string;
    public example: string;
    public categories: string[];
    public urlSingle: string;
    public urlPlural: string;
    public urlExample: string;

    constructor(
        wordSingle: string,
        wordPlural: string,
        example: string,
        categories: string[],
        urlSingle: string,
        urlPlural: string,
        urlExample: string) {
            this.wordSingle = wordSingle;
            this.wordPlural = wordPlural;
            this.example = example;
            this.categories = categories;
            this.urlSingle = urlSingle;
            this.urlPlural = urlPlural;
            this.urlExample = urlExample;
        }
}



