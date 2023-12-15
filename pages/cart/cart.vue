<template>
	<view class="cart-container">
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<uni-icons  type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品区域 -->
		<uni-swipe-action>
			<view v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
					<my-goods-list :goods="goods"  :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods-list>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js'
	// 按需导入 mapState 这个辅助函数
	import { mapState,mapMutations} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
		// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
		...mapState('m_cart', ['cart']),
		},
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		methods:{
			...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById']),
			// 商品的勾选状态发生了变化
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			// 商品数量发送了变化
			numberChangeHandler(e){
				this.updateGoodsCount(e)
				this.setBadge()
			},
			//删除商品
			swipeActionClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
				this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title{
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart-title-text{
			margin-left: 10px;
		}
	}
</style>