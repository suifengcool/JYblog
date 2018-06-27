<template>
	<div class="home">
		<!-- 轮播图 -->
		<div class="carousel-contain">
			<Carousel height="350px">
		    	<CarouselItem v-for="item in carouselList" :key="item.url">
		        	<img :src="item.url" alt="">
		        </CarouselItem>
		    </Carousel>
		</div>

		<!-- 内容区域 -->
		<div class="content-contain">
			<div class="content w-1200">
				<ul class="tag-box">
					<li 
						v-for="(item,index) in tagList" 
						:key="item.name" 
						:class="{'active':activeNum == index}"
						@click="changeTag(index)"
					>
						{{item.name}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { Button, Carousel, CarouselItem } from 'element-ui';
export default {
    name: 'home',

    components: {
		Button,
		CarouselItem,
		Carousel
    },

    data () {
		return {
			activeNum: 0,
			carouselList: [{
				url: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/197e354a94fab46e2a2abbd396145e7286649f2ae08775558b764a0e887be7b82c775b939c3c2f2f598fa5d753a55645?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=slider1.jpeg&size=1024',
				id: 1
			},{
				url: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/3760369602463e0dd86234e3bbd3a54194e2211202d76c93e069fab1df48a9e490b116658f2d18997187ec0055b06e7f?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=slider2.jpeg&size=1024',
				id: 2
			},{
				url: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/83db25101d1eea374ff92be71ab46c79cb57de85b7c7897304cf3437d36adb08cbed602a9d878b9c158374bd38e4d0dc?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=slider3.jpeg&size=1024',
				id: 3
			},{
				url: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/02ec96816223e765e20f2d7533a89fda2782af718589ec4da548ab7e81fb15fd4ebb0fed8f42c417264ec5b84b705558?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=slider4.jpeg&size=1024',
				id: 4
			}],
			tagList: [{
				name: '全部',
				id: 0
			},{
				name: 'Vue',
				id: 1
			},{
				name: 'React',
				id: 2
			},{
				name: 'NodeJs',
				id: 3
			},{
				name: '小程序',
				id: 4
			},{
				name: 'Webpack',
				id: 5
			},{
				name: '随笔',
				id: 6
			},{
				name: '开发工具',
				id: 7
			}]
		}
    },

    computed:{
	    ...vm.mapGetters({
			todoCount:"todoCount"      //映射Getter
	    })
	},
	
	created(){
		console.log('todoCount:',this.todoCount)
	},

    methods: {
    	changeTag(index){
    		this.activeNum = index
    	}
    }
}
</script>
<style lang="sass" scoped>
.tag-box
	display: flex
	padding: 10px
	li 
		cursor: pointer
		text-align: center
		line-height: 30px
		margin: 10px 10px 10px 0
		font-size: 16px
		width: 70px
		height: 30px
	.active
		color: #fff
		background: #6190e8
</style>
