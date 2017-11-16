# h5-game
h5 小游戏

基于 (Phaser.js)[http://phaser.io/]

preload、create、update、render 这四个方法至少要存在一个
![](http://upload-images.jianshu.io/upload_images/2906565-20448270ef24f7c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
init()           一些场景的初始化代码可以写在这个方法里
preload()         用来加载游戏资源
create()             创建游戏显示对象或注册事件等
update()   在游戏的每一帧都会调用，用来书写需要在每一帧都执行的代码
render()    在游戏的每一个渲染周期都会调用，用来做一些自定义的渲染工作
```

```
var game = new Phaser.Game(400, 400);

var mainState = {
    init: function(){};
    preload: function(){};
    create: function(){};
    update: function(){};
    render: function(){};
}

game.state.add('main', state); //添加场景
game.state.start('main'); //启动场景

```
