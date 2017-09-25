/**
 * Created by admin on 2016/5/23.
 */
var StringBuffer = function(){
    this.array = new Array();
};

StringBuffer.prototype.append = function(val){
    this.array.push(val);
}

StringBuffer.prototype.toString = function(){
    return this.array.join("");
}