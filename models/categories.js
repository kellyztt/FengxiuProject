import {Http} from "../utils/httpUtils";

class Categories{
    roots = [];
    subs = []
    async getAll() {
        const data = await Http.request({
            url: '/category/all'
        });
        this.roots = data.roots;
        this.subs = data.subs;
    }

    getRoots(){
        return this.roots;
    }

    getSubs(rootId){
        //TODO: item.id??
        return this.subs.find(item=>item.parent_id = rootId);
    }
}

export {
    Categories
}