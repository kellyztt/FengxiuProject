import { Joiner } from "./joiner.js";
const parseSpecValue = function(specs){
    if (!specs){
        return null;
    }
    const joiner = new Joiner(";");
    specs.forEach(item=>joiner.join(item.value));
    return joiner.getStr();
}

export {
    parseSpecValue
}
