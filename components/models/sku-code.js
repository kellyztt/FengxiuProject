import { combination } from "../../utils/utils.js";
class SkuCode{

    code;
    spuId;
    totalSegments = [];
    constructor(code){
        this.code = code;
        this._splitToSegments();
    }

    _splitToSegments(){
        //2$1-42#3-10#4-15
        const spuAndSpec = this.code.split("$");
        this.spuId = spuAndSpec[0];
        const specCodeArray = spuAndSpec[1].split("#");
        for (let i = 1; i <= specCodeArray.length; i++){
            const combinations = combination(specCodeArray, i);
            const segments = combinations.map(c=>{
                return c.join("#");
            });
            this.totalSegments = this.totalSegments.concat(segments);
        }   
    }
}

export {
    SkuCode
}