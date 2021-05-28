let canvas = document.querySelector('#canvas')
const btn = document.querySelectorAll('.btn')
canvas.setAttribute('width', canvas.offsetWidth)
canvas.setAttribute('height', canvas.offsetHeight)

const pen = document.querySelector('.pen')
pen.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    pen.classList.add('active')
}
const color = document.querySelector('.color')
color.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    color.classList.add('active')
}
const clear = document.querySelector('.clear')
clear.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    clear.classList.add('active')
}
const restore = document.querySelector('.restore')
restore.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    restore.classList.add('active')
}
const eraser = document.querySelector('.eraser')
eraser.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    eraser.classList.add('active')
}
const preserve = document.querySelector('.preserve')
preserve.onclick = function () {
    for(i = 0; i < btn.length; i++){
        btn[i].classList.remove('active')
    }
    preserve.classList.add('active')
}

var drawingBoard = {
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    ul_node: document.getElementsByTagName('ul')[0],
    colorBoard: document.getElementById('color'),
    lineRuler: document.getElementById('lineRuler'),
    imgArr: [],//存放图片
    init: function () {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.drawing();//开始画画
    this.btnsFnAll();
},
drawing: function () {
    var self = this;
    var left = this.canvas.offsetLeft;
    this.canvas.onmousedown = function (e) {
    var e_x = e.pageX;//鼠标在画布上的x点
    var e_y = e.pageY;
    self.ctx.beginPath();//开始绘制
    self.ctx.moveTo(e_x - left, e_y - left);//落笔点，开始点
    console.log(e_x,e_y)
    var imgData = self.ctx.getImageData(0, 0, self.canvas.scrollWidth, self.canvas.scrollHeight);
    self.imgArr.push(imgData)
    document.onmousemove = function (e) {
        self.ctx.lineTo(e.pageX - left, e.pageY - left);//落笔点，开始点
        self.ctx.stroke();
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        self.ctx.closePath();//闭合当前的路径 结束绘制
    }
    this.onpointerleave = function () {
        document.onmousemove = null;
    }
    }
},
btnsFnAll: function () {
    var self = this;
    this.ul_node.addEventListener('click', function (e) {
    switch (e.target.id) {
        case 'cleanBoard'://清屏
        self.ctx.clearRect(0, 0, self.canvas.offsetWidth, self.canvas.offsetHeight)
        break;
        case 'eraser'://橡皮
        self.ctx.strokeStyle = "#ffffff";
        break;
        case 'save'://保存
        let url = self.canvas.toDataURL('image/jpg');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = '草稿纸';
        a.target = '_blank';
        a.click()
        break;
        case 'rescind'://撤销
        console.log(self.imgArr)
        if (self.imgArr.length > 0) {
            self.ctx.putImageData(self.imgArr.pop(), 0, 0)
        }
        break;
    }
    });
    this.colorBoard.onchange = function () {
    self.ctx.strokeStyle = this.value;
    };
    this.lineRuler.onchange = function () {
    self.ctx.lineWidth = this.value
    }
}
}
drawingBoard.init();