<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<radio :checked="goods.goods_state"  color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image class="goods-list-left-image" :src="goods.goods_small_logo || defaultImage"></image>
			</view>
			<view class="goods-list-right">
				<view class="goods-list-right-name">{{goods.goods_name}}</view>
				<view class="goods-list-right-info">
					<view class="goods-list-right-price">￥{{goods.goods_price | tofixed}}</view>
					<!-- 商品数量 -->
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler" ></uni-number-box>
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
			// 是否展示图片左侧的 radio
			showRadio:{
				type:Boolean,
				// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
				default:false,
			},
			// 是否展示价格右侧的 NumberBox 组件
			showNum:{
				type:Boolean,
				// 如果外界没有指定 show-num 属性的值，则默认不展示 NumberBox 组件
				default:false,
			}
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
		},
		methods:{
			// radio 组件的点击事件处理函数
			radioClickHandler(){
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					// 商品的 Id
					goods_id:this.goods.goods_id,
					// 商品最新的勾选状态
					goods_state:!this.goods.goods_state
				})
			},
			// num 组件的点击事件处理函数
			numChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:+val,
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list{
		// 让 goods-list 项占满整个屏幕的宽度
		width: 750rpx;
		// 设置盒模型为 border-box
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border: 1px solid #f0f0f0;
		.goods-list-left{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right:5px;
			.goods-list-left-image{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-list-right{
			display: flex;
			flex:1;
			flex-direction: column;
			justify-content: space-between;
			.goods-list-right-name{
				font-size: 24rpx;
			} 
			.goods-list-right-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-list-right-price{
					font-size: 24rpx;
					color: #c00000;
				}
			}
			
		}
	}
</style>