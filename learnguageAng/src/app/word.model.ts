
export class Word {
    public articleSingle: string;
    public wordSingle: string;
    public articlePlural: string;
    public wordPlural: string;
    public example: string;
    public categories: string[];
    public urlSingle: string;
    public urlPlural: string;
    public urlExample: string;

    constructor(
        articleSingle: string,
        wordSingle: string,
        articlePlural: string,
        wordPlural: string,
        example: string,
        categories: string[],
        urlSingle: string,
        urlPlural: string,
        urlExample: string) {
            this.articleSingle = articleSingle;
            this.wordSingle = wordSingle;
            this.articlePlural = articlePlural;
            this.wordPlural = wordPlural;
            this.example = example;
            this.categories = categories;
            this.urlSingle = urlSingle;
            this.urlPlural = urlPlural;
            this.urlExample = urlExample;
        }
}



