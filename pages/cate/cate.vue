<template>
	<view class="">
		<my-search @click="gotoSearch" :bgcolor="'#000000'" :radius="'18'"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
						{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height:wh+'px'}" :scrollTop="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				wh: 0,
				active: 0,
				scrollTop: 0,
				cateList: [],
				cateLevel2: [],
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			//请求分类数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/categories")
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},

			//点击选择样式
			activeChanged(i) {
				this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop ? 0 : 1
			},

			//跳转商品列表页
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			//跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}

	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}

		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 24rpx;

			&.active {
				background-color: #ffffff;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

		.cate-lv2-title {
			font-size: 24rpx;
			text-align: center;
			font-weight: bold;
			padding-top: 15px;
			padding-bottom: 15px;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 10px;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 24rpx;
				}

			}
		}
	}
</style>