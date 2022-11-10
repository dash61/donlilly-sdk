export interface IToken {
    token: string;
}

interface IBasicParams {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
}

export interface IBook extends IBasicParams {
    docs: [{
        _id: string;
        name: string;
    }];
}

export interface IBookChapter extends IBasicParams {
    docs: [{
        _id: string;
        chapterName: string;
    }];
}

export interface IMovie extends IBasicParams {
    docs: [{
        _id: string;
        academyAwardNominations: number;
        academyAwardWins: number;
        boxOfficeRevenueInMillions: number;
        budgetInMillions: number;
        name: string;
        rottenTomatoesScore: number;
        runtimeInMinutes: number;
    }];
}

export interface ICharacter extends IBasicParams {
    docs: [{
        _id: string;
        height: string;
        race: string;
        gender: string;
        birth: string;
        spouse: string;
        death: string;
        realm: string;
        hair: string;
        name: string;
        wikiUrl: string;
    }];
}

export interface IChapter extends IBasicParams {
    docs: [{
        _id: string;
        chapterName: string;
        book: string;
    }];
}

export interface IChapterName extends IBasicParams {
    docs: [{
        _id: string;
        chapterName: string;
    }];
}

export interface IQuote extends IBasicParams {
    docs: [{
        _id: string;
        dialog: string;
        movie: string;
        character: string;
        id: string;
    }];
}

export enum Direction {
    Ascending = 1,
    Descending = 2,
}


// Could rewrite the code somewhat to use this enum to limit use of invalid operators.
// export enum Comparison {
//     LessThan = 1,
//     LessThanOrEqual = 2,
//     Equals = 3,
//     GreaterThan = 4,
//     GreaterThanOrEqual = 5,
// }  

export interface IOptions {
    pagination: {
        limit: number;
        page: number;
        offset: number;
    };
    sort: {
        direction: Direction;
        field: string;
    };
    filters: [{
        field: string;            // a single field returned by an API, eg: name or race or budgetInMillions, etc
        value: string;            // a value to match, eg: Gandalf or Hobbit or Human
        negate: boolean;          // set to true to invert the comparison, eg. to produce: race!=Orc,Goblin
        operator: string;         // an operator, one of: < <= = > >=
        comparisonValue: number;  // a numeric value to use in comparison operations
    }];
}

// export type AllTypes = IBook | IChapterName | IMovie | ICharacter | IQuote | IChapter;
