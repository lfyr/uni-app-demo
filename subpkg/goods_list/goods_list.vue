<template>
	<view class="">
		<view @click="gotoDetail(item)" v-for="(item,i) in goodsList" :key="i">
			<my-goods-list :goods="item"></my-goods-list>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				//请求的参数对象
				queryObj:{
					//关键词
					query:"",
					//分类id
					cid:"",
					//页码值
					pagenum:1,
					//每页条数
					pagesize:10,
				},
				
				//总页数
				total:0,
				//商品列表数据
				goodsList: [],
				//节流阀
				isloading: false,
				
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ""
			this.queryObj.cid = options.cid || ""
			this.getGoodsList()
		},
		methods:{
			//请求商品列表数据
			async getGoodsList(cb){
				this.isloading=true
				const {data: res}= await uni.$http.get("/api/public/v1/goods/search",this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				
				//请求返回重置节流阀
				this.isloading=false
				
				//按需调用停止下拉
				cb&&cb()
				
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
				
			},
			//触底事件
			onReachBottom(){
				//如果数据加载完毕则直接返回
				if (this.queryObj.pagesize*this.queryObj.pagenum >=this.total ) return uni.$showMsg('数据加载完毕!')
				
				// 判断是否正在请求其它数据，如果是，则不发起额外的请求
				if (this.isloading) return
				
				//页码自增
				this.queryObj.pagenum += 1
				//重新获取数据
				this.getGoodsList()
			},
			//下拉刷新
			onPullDownRefresh(){
				//重置参数
				this.queryObj.pagenum=1
				this.total=0
				this.isloading=false
				this.goodsList=[]
				
				//重新发起请求
				this.getGoodsList(()=>uni.stopPullDownRefresh())
			},
			//跳转商品详情
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
