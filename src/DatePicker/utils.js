export const SINGLE_SELECTION_MODE = 'single'
export const RANGE_SELECTION_MODE = 'range'
const today = new Date();
export const MINDATE = today.setDate(today.getDate() - 1)
export const MAXDATE = today.setDate(today.getDate() + 30)
export const LANG_FR = 'fr'
export const LANG_EN = 'en'