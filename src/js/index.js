//默认webpack只支持部分的es6语法,高级语法则不支持,需要安装对应的loader才能处理

class Person{
    static info ={
        name:'张三',
        age:18
    }
}
//类名.静态属性
console.log(new Person);
console.log(Person.info);
