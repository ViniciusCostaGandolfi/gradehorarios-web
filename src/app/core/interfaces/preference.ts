export enum Preference {
    UNPREFERABLE = 'UNPREFERABLE',
    IRRELEVANT = 'IRRELEVANT',
    PREFERABLE = 'PREFERABLE'
}

export const preferenceToText = {
    [Preference.UNPREFERABLE]: 'Indisponível',
    [Preference.IRRELEVANT]: 'Disponível',
    [Preference.PREFERABLE]: 'Preferrível',

}