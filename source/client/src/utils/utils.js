const utils = {}

const KpiDefinitionState = {
    UNDEFINED: 0,
    PARTIALLY_DEFINED: 1,
    DEFINED: 2
};
utils.KpiDefinitionState = KpiDefinitionState

function trimStringToFit(str){
    return str.length<=15?str:str.substring(0,15)+'...'
}
utils.trimStringToFit = trimStringToFit

export default utils;