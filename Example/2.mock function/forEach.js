function forEach(target, callback) {
    for(let i=0;i<target.length;i++){
        callback(target[i])
    }
}

module.exports=forEach