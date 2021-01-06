const combination = function(arr, size){
    let result = [];
    //temp array, array, length
    function _(temp, a, n){
        if (n === 0){
            result.push(temp);
            return;
        }
        for (let i = 0, l = a.length - n; i <= l; i++){
            var b = temp.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return result;
}

export {
    combination
}