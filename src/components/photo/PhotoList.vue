<template>
    <div class="tmpl">
        <!-- 引入返回导航 -->
        <nav-bar title="图文分享"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;">{{category.title}}</a>
                </li>
                
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li>
                    <a>
                        <img src="">
                        <p>
                            <span>图片标题</span>
                            <br>
                            <span>图片摘要</span>
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            categorys:[],//图片分类，{id:1,title:'家居生活'}
        }
    },
    created(){
        //获取所有的分类信息
        this.$ajax.get('getimgcategory')
        .then(res=>{
            this.categorys = res.data.message;
            //进行追加 {id:0,title:'全部'}
            this.categorys.unshift({
                id:0,title:'全部'
            })
        })
        .catch(err=>{
            console.log('获取图片分类失败',err);
        })
    }
}


</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}



</style>
