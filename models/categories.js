import { Http } from "../utils/http.js";
class Categories{
    roots = [];
    subs = []
    async getAll(){
        const data = await Http.request({
            url: "category/all"
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

    getSubs(parentId){
        return this.subs.filter(item => item.parent_id == parentId);
    }
}
export {
    Categories
}