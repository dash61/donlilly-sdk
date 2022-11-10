# Design Overview

## SDK Functions

Common interfaces are in interfaces.ts.
SDK functions are in sdk.ts.

I grouped some similar routes to make the SDK shorter and (I hope) easier to use.

A common function, getData, is used to do the work of fetching the data.
It also handles the options (pagination, sorting, and filtering). There is probably a better way
to handle the delimiter ("?" vs. "&") but I used a simple technique here for speed of development.

The user's security token needs to be passed into each SDK function. The SDK keeps no
state and so this is necessary. This could be changed to make an 'auth' function
that takes the token and validates things, then remembers and injects this into the
header during fetches. That's an idea, but here, things were kept simple.

## Types

The getData function needs a better return type than `<any | undefined>`.
I need to do more experimentation to get the Typescript types correct to avoid this.

## Documentation

I added JSDoc definitions for the SDK functions so that an auto-doc tool can pull that out.



