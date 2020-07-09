import {Paging} from "../utils/paging";

class Search{
    static search(word){
        return new Paging({
            url: `/search?q=${word}`
        })
    }
}

export {
    Search
}