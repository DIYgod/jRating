function JRating (ele, value, editable) {
    this.ele = ele;
    this.value = value;
    this.editable = editable;
    this.star = this.ele.getElementsByClassName('jRating-star');
    this.isValueDirty = false;
    this.originalValue = value;
    this.init();
}

// 初始化
JRating.prototype.init = function () {
    this.repaint();
    var _self = this;
    if (this.editable) {
        this.ele.addEventListener('mouseleave', function (e) {
            _self.resetRating.call(_self, e);
        });
        this.ele.addEventListener('click', function (e) {
            _self.submitRating.call(_self, e);
        });
        this.ele.addEventListener('mousemove', function (e) {
            _self.setRating.call(_self, e);
        });
    }
};

// value改变后的重绘
JRating.prototype.repaint = function () {
    for (var i = 0; i < this.star.length; i++) {
        var delta = this.value - (i + 1);
        if (- 1 / 3 <= delta) {
            this.star[i].className = 'jRating-star full';
        } else if (- 2 / 3 <= delta && delta <= - 1 / 3) {
            this.star[i].className = 'jRating-star half';
        } else {
            this.star[i].className = 'jRating-star empty';
        }
    }
};

// 移出鼠标将value改回原始值
JRating.prototype.resetRating = function () {
    if (this.isValueDirty) {
        this.value = this.originalValue;
        this.isValueDirty = false;
        this.repaint();
    }
};

// 点击鼠标修改value的原始值
JRating.prototype.submitRating = function () {
    this.isValueDirty = false;
    this.originalValue = this.value;
};

// 跟随鼠标修改value
JRating.prototype.setRating = function (e) {
    if(e.target && e.target.classList.contains('jRating-star')) {
        this.isValueDirty = true;
        if (event.offsetX < event.target.clientWidth / 2) {
            this.value = parseInt(e.target.getAttribute('index')) + 0.5;
        }
        else {
            this.value = parseInt(e.target.getAttribute('index')) + 1;
        }
        this.repaint();
    }
};