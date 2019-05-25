function main(wids, heit, speed) { //三个参数 游戏界面的宽度 高度 还有🐍的速度 
	window.direction = 1;
    document.onkeydown = function(e) {
	switch (e.keyCode) {//选择判断防止调头
		case 37:
			direction = direction == 1 ? 1 : -1;
			break;
		case 38: //向上键
			direction = direction == wid ? wid : -wid;
			break;
		case 39: //右键
			direction = direction == -1 ? -1 : 1;
			break;
		case 40: //向下键
			direction = direction == -wid ? -wid : wid;
			break;
	}
}
	window.wid = wids;
	window.hei = heit; 
    //默认 一行30个 一列20个 宽高最小 15 速度提供1-5的选择 小数或超出 会判断
	window.speed = Math.floor(window.speed = speed ? speed : 3) > 5 ? 5 : speed < 1 ? 1 : speed;
	total = (wid = (wid = wid || 30) < 15 ? 15 : wid) * (hei = (hei = hei || 20) < 15 ? 15 : hei); //保证最低为15*15
	window.positions = 2 * wid + 10;
	window.markPosition = [2 * wid + 5, 2 * wid + 4]; //初始两个方块 在第三行 第5个第6个
	$('#contain').height(20 * hei).width(20 * wid).children('.snakebody').eq(0).css({//设置基础位置
		top: '40px',
		left: '100px',
		backgroundColor: 'skyblue'
	}).next().css({
		top: '40px',
		left: '80px'
	});
	snake.move();
};
snake = {
	toTop: function(pos) {
		return Math.floor(pos / wid) * 20 + 'px'
	},
	toLeft: function(pos) {
		return pos % wid * 20 + 'px'
	},
	move: function() {
		timeId = setInterval(function() {
			if (game.crashWall() || game.eatItselt()) {
				clearInterval(timeId);
				alert('游戏结束了');
				return;
			}
			game.eatFood();
			var record = JSON.parse(JSON.stringify(markPosition)); //深拷贝数组
			markPosition[0] += direction; //方向会改变
			$('.snakebody').eq(0).css({
				top: snake.toTop(markPosition[0]),
				left: snake.toLeft(markPosition[0])
			})
			for (let i = 1; i < markPosition.length; i++) {
				markPosition[i] = record[i - 1];
				$('.snakebody').eq(i).css({
					top: snake.toTop(markPosition[i]),
					left: snake.toLeft(markPosition[i])
				})
			}
		}, (6 - speed) * 50)
	},
}
game = {
	crashWall: function() {
		switch (direction) { //即将撞墙且没有改变撞墙的方向 返回ture
			case 1:
				if (markPosition[0] % wid == wid - 1) return true;
				break;
			case -1:
				if (markPosition[0] % wid == 0) return true;
				break;
			case wid:
				if (Math.floor(markPosition[0] / wid) == hei - 1) return true;
				break;
			case -wid:
				if (Math.floor(markPosition[0] / wid) == 0) return true;
				break;
		}
	},
	eatItselt: function() {//判断身体是否与头部位置相等
		if (markPosition.indexOf(markPosition[0], 1) != -1) return true;
	},
	eatFood: function() {
	//判断头部是否与食物位置相等 true 则数组增加一个数 增加一个蛇节
	//并重新生成一个食物
		if (markPosition[0] == positions) { //创建增加数组末尾一个数据等待在move
			markPosition[markPosition.length] = null;
			$('#contain').append('<div class="snakebody"></div>')
			while (markPosition.indexOf(positions = Math.floor(Math.random() * total)) != -1); //防止食物与🐍重叠
			$('#food').css({
				top: snake.toTop(positions),
				left: snake.toLeft(positions),
				backgroundColor: ('rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math
					.floor(
						Math.random() * 255) + ')')
			})
			//食物的位置就是除和取余 背景颜色就是随机rgb ;
		}
	}


}
