export default {
	namespaced:true,
	state:()=>({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count,goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	// 模块的 mutations 方法
	mutations:{
		addToCart(state, goods){
			//查找是否存在
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (!findResult){
				//不存在添加
				state.cart.push(goods)
			}else{
				//存在数量加一
				findResult.goods_count ++
			}
			
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车中的数据持久化存储到本地
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 有对应的商品信息对象
			if (findResult) {
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车中商品的勾选状态
		updateGoodsCount(state, goods) {
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 有对应的商品信息对象
			if (findResult) {
				// 更新商品数量
				findResult.goods_count = goods.goods_count
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state,goods_id) {
			// 调用数组的 filter 方法进行过滤
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}
	},
	// 模块的 getters 属性
	getters:{
		// 统计购物车中商品的总数量
		total(state){
			let c=0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		}
	}
}