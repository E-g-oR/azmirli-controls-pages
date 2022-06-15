import {lit, end, Route, parse, format} from "fp-ts-routing/es6";
import {zero} from "fp-ts-routing";

export interface Cities {
    readonly _tag: "Cities"
}

interface Flavors {
    readonly _tag: "Flavors"
}

interface Addresses {
    readonly _tag: "Addresses"
}

interface Structures {
    readonly _tag: "Structures"
}

interface NotFound {
    readonly _tag: 'NotFound'
}

export type Location_ = Cities | Addresses | Structures | Flavors | NotFound

const home: Location_ = {_tag: "Cities"}
const cities: Location_ = home
const flavors: Location_ = {_tag: "Flavors"}
const addresses: Location_ = {_tag: "Addresses"}
const structures: Location_ = {_tag: "Structures"}
const notFound: Location_ = {_tag: "NotFound"}

// matches
const defaults = end
const homeMatch = lit("home").then(end)
const citiesMatch = lit("cities").then(end)
const flavorsMatch = lit("flavors").then(end)
const addressesMatch = lit("addresses").then(end)
const structuresMatch = lit("structures").then(end)
const notFoundMatch = lit("notFound").then(end)

const router = zero<Location_>()
    .alt(defaults.parser.map(() => home))
    .alt(homeMatch.parser.map(() => home))
    .alt(citiesMatch.parser.map(() => cities))
    .alt(flavorsMatch.parser.map(() => flavors))
    .alt(addressesMatch.parser.map(() => addresses))
    .alt(structuresMatch.parser.map(() => structures))
    .alt(notFoundMatch.parser.map(() => notFound))

// helper
export const parseLocation = (s: string): Location_ => parse(router, Route.parse(s), notFound)

interface Routes {
    home: string,
    cities: string,
    flavors: string,
    addresses: string,
    structures: string,
    notFound: string,
}

export const ROUTES: Routes = {
    home: format(homeMatch.formatter, {}),
    cities: format(citiesMatch.formatter, {}),
    flavors: format(flavorsMatch.formatter, {}),
    addresses: format(addressesMatch.formatter, {}),
    structures: format(structuresMatch.formatter, {}),
    notFound: format(notFoundMatch.formatter, {}),
}