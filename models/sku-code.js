import {combination, combination1} from "../utils/util";

class SkuCode {

    code;
    spuID;
    //dictionary generated from one code
    totalSegments = [];
    constructor(code){
        this.code = code;
        this._splitToSegment();
    }

    _splitToSegment(){
        const spuAndSpecs = this.code.split("$");
        this.spuID = spuAndSpecs[0];
        const specCodeArray = spuAndSpecs[1].split("#");
        const length = specCodeArray.length;
        for (let i = 1; i <= length; i++){
            const segments = combination(specCodeArray, i);

            const newSegments = segments.map(seg => {
                return seg.join('#');
            });
            this.totalSegments = this.totalSegments.concat(newSegments);
        }
    }
}

export {
    SkuCode
}