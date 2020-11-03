/*

作者：侯帆
日期：2020/08/28
参考：掘金 深入 MutationObserver
地址：https://juejin.im/entry/6844903444411580430
实现功能：1.添加和销毁水印
         2.监听页面元素变化无法直接通过删除页面元素或修改样式隐藏或者删除水印
         3.在vue和HTML页面的项目中都可以使用，react应该也可以，暂未测试

vue中使用方式：
import  __canvasWM from "./assets/wm.js";
打开：
 __canvasWM({ content: new Date().getTime() }, true);
关闭：
__canvasWM({}, false);   

html中使用
<script src="wm.js" type="text/javascript" charset="utf-8"></script>
打开：
 __canvasWM({ content: "name" }, true);
关闭：
__canvasWM({}, false);   

参数配置项
canvas 配置
        width 
        height 
        textAlign
        textBaseline 
        font
        rotate 
        fillStyle 
        content 
水印当前层数配置  
        zIndex

*/

(function() {
    //检查是否兼容 MutationObserver
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    //添加水印节点处
    const container = document.body;
    //创建监听事件变量
    let observer

    // canvas 实现 watermark
    function __canvasWM(isShow = false, {
        // 默认参数
        width = '400px',
        height = '300px',
        textAlign = 'center',
        textBaseline = 'middle',
        font = "20px Microsoft Yahei",
        fillStyle = 'rgba(184, 184, 184, 0.6)',
        content = 'test',
        rotate = '30',
        zIndex = 1000
    } = {}) {
        //获取配置项
        const args = arguments[1];
        const canvas = document.createElement('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        const ctx = canvas.getContext("2d");

        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.rotate(Math.PI / 180 * rotate);
        ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 5);
        //生成base64图片作为背景传入div
        const base64Url = canvas.toDataURL();


        //查询是否有该标签
        const __wm = document.querySelector('#__wm');
        const watermarkDiv = __wm || document.createElement("div");
        // style样式
        const styleStr =
            `
				position:fixed;
                top:0;
                bottom:0;
                left:0;
                right:0;
                z-index:${zIndex};
                pointer-events:none;
                background-repeat:repeat;
                background-image:url('${base64Url}')
			`;
        //添加style样式和id
        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.setAttribute('id', '__wm');
        // 如果没有则添加该div
        if (!__wm) {
            container.insertBefore(watermarkDiv, container.firstChild);
        }

        //显示数据更新
        if (observer && isShow) {
            observer.disconnect();
            observer = null;
            observer = new MutationObserver(function() {
                const __wm = document.querySelector('.__wm');
                // 只在__wm元素变动才重新调用 __canvasWM
                if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                    // 避免一直触发
                    observer.disconnect();
                    observer = null;
                    __canvasWM(JSON.parse(JSON.stringify(args)), isShow);
                }
            });
        }

        //添加监听事件防止开发者模式删除或者取消style节点
        if (!observer) {
            observer = new MutationObserver(function() {
                const __wm = document.querySelector('.__wm');
                // 只在__wm元素变动才重新调用 __canvasWM
                if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                    // 避免一直触发
                    observer.disconnect();
                    observer = null;
                    __canvasWM(JSON.parse(JSON.stringify(args)), isShow);
                }
            });
        }


        if (isShow) {
            //显示时监听元素不被删除
            observer.observe(container, {
                attributes: true,
                subtree: true,
                childList: true
            })
        } else {
            //关闭时停止监听
            observer.disconnect();
            //删除元素节点
            container.removeChild(document.getElementById('__wm'))
        }
    }

    if (typeof module != 'undefined' && module.exports) { //CMD
        module.exports = __canvasWM;
        // eslint-disable-next-line no-undef
    } else if (typeof define == 'function' && define.amd) { // AMD
        // eslint-disable-next-line no-undef
        define(function() {
            return __canvasWM;
        });
    } else {
        window.__canvasWM = __canvasWM;
    }

})();