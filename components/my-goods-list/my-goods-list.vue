<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<image class="goods-list-left-image" :src="goods.goods_small_logo || defaultImage"></image>
			</view>
			<view class="goods-list-right">
				<view class="goods-list-right-name">{{goods.goods_name}}</view>
				<view class="goods-list-right-info">
					<view class="goods-list-right-price">￥{{goods.goods_price | tofixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods-list",
		// 定义 props 属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			goods: {
				type: Object,
				defaul: {},
			},
		},
		data() {
			return {
				//默认图片
				defaultImage:"https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png"
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list{
		display: flex;
		padding: 10px 5px;
		border: 1px solid #f0f0f0;
		.goods-list-left{
			margin-right:5px;
			.goods-list-left-image{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-list-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-list-right-name{
				font-size: 24rpx;
			} 
			.goods-list-right-price{
				font-size: 24rpx;
				color: #c00000;
			}
		}
	}
</style>