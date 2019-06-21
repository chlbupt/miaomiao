<template>
    <div class="city_body">
        
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller ref="city_list" v-else>
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.id, item.nm)">{{item.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="line in item.list" :key="line.id" @tap="handleToCity(line.id, line.nm)">{{line.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in cityList" :key="item.index" @touchstart="handleIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'city',
    data(){
        return {
            cityList: [],
            hotList: [],
            isLoading: true
        };
    },
    created(){
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');
        if(cityList && hotList){
            this.isLoading = false;
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
        }else{
            this.axios
            .get('/api/citylist')
            .then((res) => {
                var msg = res.data.msg;
                if(msg === 'ok'){
                    this.isLoading = false;
                    var cities = res.data.data.cities;
                    var {cityList, hotList} = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    window.localStorage.setItem('cityList', JSON.stringify(cityList));
                    window.localStorage.setItem('hotList', JSON.stringify(hotList));
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    methods:{
        handleIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
        },
        handleToCity(id, nm){
            this.$store.commit('city/CITY_INFO', {id, nm});
            window.localStorage.setItem('nowId', id);
            window.localStorage.setItem('nowNm', nm);
            this.$router.push('/movie/nowPlaying');
        },
        formatCityList(cities){
            var cityList = [], hotList = [];
            cities.forEach((v, i) => {
                var firstLetter = v.py.substring(0,1).toUpperCase();
                var index = inArray(firstLetter);
                if(index  !== false){
                    cityList[index].list.push({'nm': v.nm, 'id': v.id});
                }else{
                    cityList.push({'index': firstLetter, list: [{'nm': v.nm, 'id': v.id}]});
                }
                if(v.isHot === 1){
                    hotList.push(v);
                }
            });
            cityList.sort((n, m) => {
                if(n.index > m.index){
                    return 1;
                }else if(n.index < m.index){
                    return -1;
                }else{
                    return 0;
                }
            });
            // console.log(cityList, hotList);
            function inArray(firstLetter){
                for(var i=0,len=cityList.length;i<len;i++){
                    if(firstLetter === cityList[i].index){
                        return i;
                    }
                }
                return false;
            }
            return {
                cityList,
                hotList
            };
        }
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
/* .city_body .city_sort{} */
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
