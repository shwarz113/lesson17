//TABS
(function($) {
$(function() {

  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });

});
})(jQuery);

//SLIDER
$(document).ready(function(){
  $('.sliders').slick({
    autoplay: true,
    centerMode: true,
    dots: true,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 2000
  });
});

//GAME
const game = document.querySelector('.game');
var arrFactory = [];
var arrTree = [];
var newFactory;
var interval = 800;
//var counter = 1;

function createGame() {
    for (let i = 0; i < 30; i++) {
        let a = document.querySelector('.game');
        let b = document.createElement('div');
        b.classList.add('box');
        b.setAttribute('data-value', i);
        a.appendChild(b);   
    }
    
}

function replay() {
    var replay = document.querySelector('.replay');
    replay.addEventListener('click', function() {
        box.forEach(function(box) {
            box.classList.remove('green');
            box.classList.remove('tree');

        });
        //counter += 1;
        //document.querySelector('.counter').innerHTML = 'Level: ' + counter;
        document.querySelector('.hidden').classList.add('levelUp')
        let bang = document.querySelector('.won');
        newFactory = setInterval(randomFactory, 600);
        bang.style.animation = 'start .6s ease-in-out';
        bang.style.top = '100%';
    });
}

function addTree(e) {
    let c = e.target;
    
    if(arrTree.indexOf(c.dataset.value) == -1) {
        arrTree.push(c.dataset.value);
        if(arrTree.length == 30) {
            clearInterval(newFactory);
            
            document.querySelector('.hidden').classList.remove('levelUp');
            let bang = document.querySelector('.won');
            bang.style.animation = 'won .6s ease-in-out';
            bang.style.top = '30%';
            replay();
        }
    } 
    

    if(arrFactory.indexOf(c.dataset.value) != -1) {
        arrFactory.splice(arrFactory.indexOf(c.dataset.value) ,1);
    }
    c.classList.remove('red');
    c.classList.remove('factory');
    c.classList.add('green');
    c.classList.add('tree');
    console.log(arrTree);
}

function randomFactory() {
    let e = Math.random() * 30;
    let g = Math.floor(e);
    
    if(arrFactory.indexOf(box[g].dataset.value) == -1) {
        arrFactory.push(box[g].dataset.value);
        box[g].classList.add('red');
        box[g].classList.remove('green');
        box[g].classList.add('factory');
        if(arrFactory.length == 30) {
            clearInterval(newFactory);
        }
    } 
    
    if(arrTree.indexOf(box[g].dataset.value) != -1) {
        arrTree.splice(arrTree.indexOf(box[g].dataset.value), 1);
    }
    console.log(arrFactory);
}

var yol = document.querySelector('.yolo');

createGame();

var box = document.querySelectorAll('.box');
// console.log(box);
var start = document.querySelector('.floating');
start.addEventListener('click', function() {
    let init = document.querySelector('.init');
    init.style.animation = 'start .5s ease-in';
    init.style.top = '100%';
    newFactory = setInterval(randomFactory, interval);
});

box.forEach(function(box) {
    box.addEventListener('click', addTree, false);
}, false);

function fire(e) {
    console.log(e.target);
    let trg = e.target;
    
    const itemDim = this.getBoundingClientRect(),
    itemSize = {
      x: itemDim.right - itemDim.left,
      y: itemDim.bottom - itemDim.top,
    };
    
    let burst = new mojs.Burst({
        left: itemDim.left + (itemSize.x/2),
        top: itemDim.top + (itemSize.y/1.7),
        count: 9,
        radius: {50 : 90},
    });
    burst.play();
};


box.forEach(function(box) {
    box.addEventListener('click', fire);
});

//calc
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ButtonsList=["7;8;9;/[;C[","4;5;6;*[;<[","1;2;3;+[;=|[","0;00;.;-["];
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function create(tagName, clasName, childs = []) {
    let elem = document.createElement(tagName);
    elem.className = clasName;
    return elem;
}
exports.create = create;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buttons_1 = require("./lib/buttons");
const element_1 = require("./lib/element");
class Calc {
    static get variable() {
        let i = parseInt(this._v);
        if (!isNaN(i) && i === 0)
            this._v = '';
        return this._v;
    }
    static set variable(v) {
        if (!v.length)
            v = '0';
        this._v = v;
        this.view.innerHTML = v;
    }
    static init() {
        let keyboard = element_1.create('table', 'keyboard');
        let keyOn = (v) => {
            return () => {
                let vs = this.variable;
                if (/[0-9]/.test(v))
                    this.variable += v;
                if (/[\.\-\/\*\+]/.test(v) && !/[\.\-\/\*\+]/.test(vs[vs.length - 1]))
                    this.variable += v;
                if (v === '=')
                    this.variable = eval(this.variable).toString();
                if (v === 'C') {
                    this.hystory = [];
                    this.variable = '';
                }
                if (v === '<') {
                    try {
                        this.variable = this.hystory.pop();
                    }
                    catch (e) {
                        this.variable = '';
                    }
                }
                else if (vs !== this.variable)
                    this.hystory.push(vs);
            };
        };
        window.addEventListener('keydown', (e) => {
            let v = e.key;
            if (v === 'Enter')
                v = '=';
            if (v === 'Backspace')
                v = '<';
            if (v === 'Escape')
                v = 'C';
            keyOn(v)();
        });
        for (let keyString of buttons_1.ButtonsList) {
            let tr = element_1.create('tr', 'keyboard-row');
            let buttons = keyString.split(';');
            for (let button of buttons) {
                let td = element_1.create('td', 'keyboard-key');
                let v = td.innerText = button.replace(/[\[\|]/g, '');
                td.onclick = keyOn(v);
                if (button.indexOf('|') !== -1)
                    td.setAttribute('rowspan', '2');
                if (button.indexOf('[') !== -1)
                    td.classList.add('soft');
                tr.appendChild(td);
            }
            keyboard.appendChild(tr);
        }
        document.querySelector('.container').appendChild(keyboard);
    }
}
Calc.view = document.querySelector('.view');
Calc._v = '0';
Calc.hystory = [];
Calc.init();
},{"./lib/buttons":1,"./lib/element":2}]},{},[3])
