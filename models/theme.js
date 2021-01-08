import { Http } from "../utils/http.js";
class Theme {
    static locationAName = "t-1";
    static locationEName = "t-2";
    static locationFName = "t-3";
    static locationHName = "t-4";

    themes = [];
    async getThemes(){
        const names = `${Theme.locationAName},${Theme.locationEName},${Theme.locationFName},${Theme.locationHName}`;
        this.themes = await Http.request({
            url: `theme/by/names`,
            method: "GET",
            data: {
                names
            }
        });
    }

    getHomeThemeLocationA(){
        return this.themes.find(t => t.name === Theme.locationAName);
    }

    getHomeThemeLocationE(){
        return this.themes.find(t => t.name === Theme.locationEName);
    }

    getHomeThemeLocationF(){
        return this.themes.find(t => t.name === Theme.locationFName);
    }

    getHomeThemeLocationH(){
        return this.themes.find(t => t.name === Theme.locationHName);
    }

    static getThemeESpuList(){
        return Theme.getThemeSpuByName(Theme.locationEName);
    }

    static getThemeSpuByName(name){
        return Http.request({
            url: `theme/name/${name}/with_spu`
        });
    }
}

export { Theme }