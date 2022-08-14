import {lit, end, Route, parse, format} from "fp-ts-routing/es6";
import {zero} from "fp-ts-routing";

export type Tag = "Root" | "Cities" | "Flavors" | "Stores" | "Structures" | 'NotFound'

type DefaultLocation = {
    readonly _tag: Tag
}

export interface Root extends DefaultLocation {
    readonly _tag: "Root"
}

export interface Cities extends DefaultLocation {
    readonly _tag: "Cities"
}

interface Flavors extends DefaultLocation {
    readonly _tag: "Flavors"
}

interface Stores extends DefaultLocation {
    readonly _tag: "Stores"
}

interface Structures extends DefaultLocation {
    readonly _tag: "Structures"
}

interface NotFound extends DefaultLocation {
    readonly _tag: 'NotFound'
}

export type Location_ = Root | Cities | Stores | Structures | Flavors | NotFound

const root: Location_ = {_tag: "Root"}
const home: Location_ = {_tag: "Cities"}
const cities: Location_ = home
const flavors: Location_ = {_tag: "Flavors"}
const stores: Location_ = {_tag: "Stores"}
const structures: Location_ = {_tag: "Structures"}
const notFound: Location_ = {_tag: "NotFound"}

// matches
const defaults = end
const homeMatch = lit("home").then(end)
const citiesMatch = lit("cities").then(end)
const flavorsMatch = lit("flavors").then(end)
const storesMatch = lit("stores").then(end)
const structuresMatch = lit("structures").then(end)
const notFoundMatch = lit("notFound").then(end)

const router = zero<Location_>()
    .alt(defaults.parser.map(() => root))
    .alt(homeMatch.parser.map(() => home))
    .alt(citiesMatch.parser.map(() => cities))
    .alt(flavorsMatch.parser.map(() => flavors))
    .alt(storesMatch.parser.map(() => stores))
    .alt(structuresMatch.parser.map(() => structures))
    .alt(notFoundMatch.parser.map(() => notFound))

// helper
export const parseLocation = (s: string): Location_ => parse(router, Route.parse(s), notFound)

interface Routes {
    root: string,
    home: string,
    cities: string,
    flavors: string,
    stores: string,
    structures: string,
    notFound: string,
}

export const ROUTES: Routes = {
    root: format(defaults.formatter, {}),
    home: format(homeMatch.formatter, {}),
    cities: format(citiesMatch.formatter, {}),
    flavors: format(flavorsMatch.formatter, {}),
    stores: format(storesMatch.formatter, {}),
    structures: format(structuresMatch.formatter, {}),
    notFound: format(notFoundMatch.formatter, {}),
}