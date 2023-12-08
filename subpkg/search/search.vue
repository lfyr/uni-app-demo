<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar  placeholder="请输入搜索内容"  @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="sugg-list" v-if="searchResults.length!=0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<view class="histroy-list">
				<uni-tag :inverted="true" :text="item" type="success" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:0,
				kw:'',
				// 搜索结果列表
				searchResults: [],
				historyList:[]
			};
		},
		onLoad() {
			//先从本地取出记录 没有就返回空数组
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			//input输入事件处理
			input(e) {
				// 清除 timer 对应的延时器
				clearTimeout(this.timer)
				// 重新启动一个延时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.kw = e
					// 根据关键词，查询搜索建议列表
					this.getSearchList()
				}, 500)
			},
			
			// 根据搜索关键词，搜索商品建议列表
			async getSearchList() {
				// 判断关键词是否为空
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const { data: res } = await
				uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				//保存搜索关键词
				this.saveSearchHistory()
			},
			//保存搜索关键词
			saveSearchHistory(){
				//this.historyList.push(this.kw)
				//定义个集合为了去重
				const set = new Set(this.historyList)
				
				//从集合汇总删除该关键字
				set.delete(this.kw)
				
				//添加该关键字
				set.add(this.kw)
				
				//最后将集合转换数组
				this.historyList=Array.from(set)
				
				//持久化到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			
			//跳转商品详情
			gotoDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			//清空历史记录
			cleanHistory(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			
			//跳转商品列表页
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + kw
				})
			},
		},
		computed:{
			//将数组收尾反转
			historys(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		background-color: #000000;
		position: sticky;
		top:0;
		z-index: 999;
	}
	.sugg-list{
		padding-left:5px;
		padding-right:5px;
		.sugg-item{
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 13px 0;
			align-items: center;
			border-bottom: 1px solid #efefef;
		}
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
	.history-box{
		padding-left: 5px;
		padding-right: 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 24rpx;
			border-bottom: 1px solid #efefef;
		}
		.histroy-list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
