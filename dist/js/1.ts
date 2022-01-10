var z = function(x: number, y: string) : string {
    return `Chao bạn ${y}, có phải bạn ${x} tuổi không?`;
}
console.log(z(46, "Trịnh Văn Minh"));


var g:(x:number, y: number) => number = function(x, y)  {
    return x + y;
}

console.log(g(15,15));


var h = ()  {
    console.log("gọi hàm dfsfdh");
    return 100;
}

h();

