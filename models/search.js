import { Paging } from "../utils/paging.js";
class Search{
    static search(keyword){
        return new Paging({url: `search?q=${keyword}`});
    }
}

export { Search }