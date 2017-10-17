/**
 * Created by chenqi on 2016/6/22.
 */
var StringBuffer = function(){
    this.array = new Array();
}

StringBuffer.prototype.append = function(val){
    this.array.push(val);
    return this;
}

StringBuffer.prototype.toString = function(){
    return this.array.join("");
}
