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

    getRoot(rootId){
        return this.roots.find(item => item.id == rootId);
    }

    getSubs(rootId){
        return this.subs.filter(item=>item.parent_id == rootId);
    }
}

export {
    Categories
}