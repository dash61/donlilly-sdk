# The Lord of the Rings SDK

## Installation

Place the two files `sdk.ts` and `interfaces.ts` in their own directory.
Reference the files as needed from your application.

## Usage

Go to this site:  [the-one-api](https://the-one-api.dev/) and register for an API key.
Put this in a file named `secrets.json` (or equivalent) and import that into your application:

    import token from "./secrets.json";

Add this file to .gitignore so it is not checked-in.

Then call the various SDK functions as in this example:

    const handleOneBook = async () => {
        return await getBooks(token, bookId || "", {} as IOptions);
    }

You can handle and display the results as you wish.

See the documentation on [this page](https://the-one-api.dev/documentation) for information on pagination, sorting, and filtering the output. In general, you will have to fill out parts of the `IOptions` interface. You don't have to fill out the entire IOptions object, you can do something like this instead:

    const handleCharacters = async () => {
        const opts = { pagination: { limit: 5 }, sort: { direction: Direction.Descending, field: "name" }}
        const result = await getCharacters(token, characterId || "", opts as IOptions);
        console.log("characters=", result);
    }


## Testing

Create a small typescript GUI application or use a tool such as jest to exercise the various endpoints of the SDK. 

