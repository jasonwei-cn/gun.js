# gun.js

a fullpage scroll plugin for Zepto &amp; jQuery

短小轻快的fullpage滚动插件，适用于zepto和jquery，依赖css3，支持拥有滚轮、上下方向键、及触摸事件，兼容pc端和移动端

## usage
    1. 引入zepto或者jquery

    2. html template
```html
<div class="gun-wrap">
    <div class="gun-content">
        <div class="gun-page on"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
    </div>
</div>
<!--包裹层必须使用gun.wrap和gun-content作为class，需要多少页面就写多少个div.gun-page，可以设置多个class来自定义每页的css-->
```
          
    3. 引入gun.js,引入或复制gun.css进你的main.css
```css
/* gun.css */
html,
body,
.gun-wrap,
.gun-content,
.gun-page {
    width: 100%;
    height: 100%;
}

.gun-wrap,
.gun-page {
    overflow: hidden;
}
```

    4. 执行下面的一行代码就能愉快的gun了
                        
```js
$('.gun-page').gun();
```

    5. 个性化设置，给gun()传入option参数;

```js
// option参数为对象，默认值如下:
    {
        time: 500, // 滚动动画的时间，单位ms，默认为500
        nav: ''  // 默认没有导航菜单，如需设置，传入导航的className,如：'gun-li'，将导航写在div.gun-wrap中，自定义导航css
    }
```

```html
<div class="gun-wrap">
    <div class="gun-content">
        <div class="gun-page on"></div>
        <div class="gun-page"></div>
        <div class="gun-page"></div>
    </div>
    <!--nav example-->
    <ul class="gun-nav">
      <li class="gun-li">1</li>
      <li class="gun-li">2</li>
      <li class="gun-li">3</li>
      <li class="gun-li">4</li>
      <li class="gun-li">5</li>
    </ul>
</div>
```