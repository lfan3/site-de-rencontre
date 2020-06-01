function arrayDiff(a, b) {
    for(let i=0; i<b.length; i++){
        let k=0
        while(k<a.length){
            if(a[k] == b){
                a.splice(k, 1)
                k--
            }
            k++
        }
    }
    return a
}

function arrayDiffb(a, b) {
    b.forEach((each)=>{
        while(1){
            let f = a.indexOf(each)
            if(f != -1)
                a.splice(f,1)
            else
                break
        }
    })
    return a
}
let c = arrayDiffb([1,2,8,2], [])
console.log(c)