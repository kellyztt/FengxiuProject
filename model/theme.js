//业务对象
import {Http} from "../utils/httpUtils";

class Theme{
    //TODO: Why static?
    static locationA = 't-1';
    static locationE = 't-2';
    static locationF = 't-3';
    static locationH = 't-4';
    themes = [];

    async getThemes(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`;
        this.themes = await Http.request({
            url: '/theme/by/names',
            data: {
                names
            }
        })
    }

    getHomeLocationA(){
        return this.themes.find(item => item.name === Theme.locationA);
    }

    getHomeLocationE(){
        return this.themes.find(item => item.name === Theme.locationE);
    }

    getHomeLocationESpu
    async getThemeSpu(name){
        return await Http.request({
            url: `/theme/${name}/{name}/with_spu`
        })
    }


}
export {
    Theme
}
