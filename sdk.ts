import {
    Direction,
    IBook,
    IChapter,
    IChapterName,
    ICharacter,
    IMovie,
    IOptions,
    IQuote,
    IToken,
} from "./interfaces";

const baseUrl = "https://the-one-api.dev/v2";


/**
 * Books
 */

/**
 * Get all books, or information on just one book.
 * 
 * @param token secret token needed for api requests
 * @param bookId (optional) id of a particular book
 * @param options (optional) object with user-specified options filled out
 * @returns an IBook object on success, or undefined on failure
 */
export async function getBooks(token: IToken, bookId?: string, options?: IOptions): Promise<IBook | undefined> {
    const url = bookId ? `book/${bookId}` : `book`;
    return await getData(token, url, options);
}

/**
 * Get all chapters for all books, or all chapters for the specified book.
 * 
 * @param token secret token needed for api requests
 * @param bookId (optional) id of a particular book
 * @param options (optional) object with user-specified options filled out
 * @returns an IChapter object on success, or undefined on failure
 */
export async function getBookChapters(token: IToken, bookId: string, options?: IOptions): Promise<IChapter | undefined> {
    const url = `book/${bookId}/chapter`;
    return await getData(token, url, options);
}


/**
 * Movies
 */

/**
 * Get all movies or information on one particular movie.
 * 
 * @param token secret token needed for api requests
 * @param movieId (optional) id of a particular movie
 * @param options (optional) object with user-specified options filled out
 * @returns an IMovie object on success, or undefined on failure
 */
export async function getMovies(token: IToken, movieId?: string, options?: IOptions): Promise<IMovie | undefined> {
    const url = movieId ? `movie/${movieId}` : `movie`;
    return await getData(token, url, options);
}

/**
 * Get all movie quotes, or all quotes for a particular movie.
 * 
 * @param token secret token needed for api requests
 * @param movieId id of a particular movie
 * @param options (optional) object with user-specified options filled out
 * @returns an IQuote object on success, or undefined on failure
 */
export async function getMovieQuotes(token: IToken, movieId: string, options?: IOptions): Promise<IQuote | undefined> {
    const url = `movie/${movieId}/quote`;
    return await getData(token, url, options);
}


/**
 * Characters
 */

/**
 * Get all characters, or information on just one character.
 * 
 * @param token secret token needed for api requests
 * @param charId (optional) id of a particular character
 * @param options (optional) object with user-specified options filled out
 * @returns an ICharacter object on success, or undefined on failure
 */
export async function getCharacters(token: IToken, charId?: string, options?: IOptions): Promise<ICharacter | undefined> {
    const url = charId ? `character/${charId}` : `character`;
    return await getData(token, url, options);
}

/**
 * Get quotes for just one character.
 * @param token secret token needed for api requests
 * @param charId (optional) id of a particular character
 * @param options (optional) object with user-specified options filled out
 * @returns an IQuote object on success, or undefined on failure
 */
export async function getCharacterQuotes(token: IToken, charId: string, options?: IOptions): Promise<IQuote | undefined> {
    const url = `character/${charId}/quote`;
    return await getData(token, url, options);
}


/**
 * Quotes
 */

/**
 * Get all quotes, or just information on one quote.
 * 
 * @param token secret token needed for api requests
 * @param quoteId (optional) id of a particular quote
 * @param options (optional) object with user-specified options filled out
 * @returns an IQuote object on success, or undefined on failure
 */
export async function getQuotes(token: IToken, quoteId?: string, options?: IOptions): Promise<IQuote | undefined> {
    const url = quoteId ? `movie/${quoteId}` : `movie`;
    return await getData(token, url, options);
}


/**
 * Chapters
 */

/**
 * Get all chapters, or information on just one chapter.
 * 
 * @param token 
 * @param chapterId 
 * @param options 
 * @returns an IChapterName object on success, or undefined on failure
 */
export async function getChapters(token: IToken, chapterId?: string, options?: IOptions): Promise<IChapterName | undefined> {
    const url = chapterId ? `chapter/${chapterId}` : `chapter`;
    return await getData(token, url, options);
}

// Helper function to fetch the data. Also parses the options to construct the URL.
async function getData(token: IToken, url: string, options?: IOptions): Promise<any | undefined> {
    try {
        const req: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(token as IToken).token}`
            },
            method: "GET",
        };
        let optsString = "";
        let delimiter = "?";

        if (options) {
            if ("pagination" in options) {
                if ("limit" in options.pagination && options.pagination.limit > 0) {
                    optsString += `${delimiter}limit=` + options.pagination.limit;
                    delimiter = "&";
                }
                if ("page" in options.pagination && options.pagination.page > 0) {
                    optsString += `${delimiter}page=` + options.pagination.page;
                    delimiter = "&";
                }
                if ("offset" in options.pagination && options.pagination.offset > 0) {
                    optsString += `${delimiter}offset=` + options.pagination.offset;
                    delimiter = "&";
                }
            }
            if ("sort" in options) {
                if (options.sort.direction === Direction.Ascending || options.sort.direction === Direction.Descending) {
                    if ("field" in options.sort) {
                        const dir = options.sort.direction === Direction.Ascending ? "asc" : "desc";
                        optsString += `${delimiter}sort=${options.sort.field}:` + dir;
                        delimiter = "&";
                    }
                }
            }
            if ("filters" in options) {
                for (const item of options.filters) {
                    const regex: boolean = item.value?.startsWith("/") || false;  // primitive, could use more checks
                    const negate: string = item.negate ? "!" : "";
                    const multipleItems: boolean = item.value?.includes(",") || false; // ditto
                    const comparison: boolean = item.operator !== undefined || false;
                    const match: boolean = item.value !== undefined && item.field !== undefined && !multipleItems;

                    if (regex || match || multipleItems) {
                        optsString += `${delimiter}${item.field}${negate}=${item.value}`;
                        delimiter = "&";
                    } else if (comparison) {
                        optsString += `${delimiter}${item.field}${item.operator}${item.comparisonValue}`;
                        delimiter = "&";
                    } else if (!item.value) {
                        optsString += `${delimiter}${item.field}`;
                        delimiter = "&";
                    }
                }
            }
        }

        const opts = optsString ? `${optsString}` : "";
        const finalUrl = `${baseUrl}/${url}${opts}`;

        const rsp = await fetch(finalUrl, req);
        if (rsp.status === 200) {
            const result = await rsp.json();
            return result;
        }
    } catch (err: unknown) {
        const errMsg = (err as Error)?.message;
        console.log(`SDK - EXCEPTION - err=${errMsg}`);
    }
    return undefined;

}
