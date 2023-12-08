<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<view class="my-search-box" @click="searchBoxHandler" :style="{'border-radius':radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			// 背景颜色
			bgcolor: {
				type: String,
				default: '#000000'
			},
			// 圆角尺寸
			radius: {
				type: Number,
				// 单位是 px
				default: 18
			}
		},
		data() {
			return {
							
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		padding: 10px;
		display: flex;
		align-items: center;
	}
	.my-search-box{
		width: 100%;
		height: 36px;
		background-color: #ffffff;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>