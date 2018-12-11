<template>

    <div class="lunbo">
        <mt-swipe class="center" :auto="3000">
            <mt-swipe-item v-for="item in lunbo" :key='item.url'>
                <img class="images" :src="item.img">
            </mt-swipe-item>
        </mt-swipe> 
    </div>
       
</template>
<script >
    export default{
    props:['lunbo'],
       data(){
            return{
           
        }
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
 
       .lunbo{
           height:220px;
           .center{
               text-align: center;
                .images{
                height: 102%;
                // width: 100%;
                
                }   

           }
           
       }
       
        // .mui-grid-9{
        //     background-color: #fff;
        //     .mui-col-sm-3{
        //         border: none;
        //        .mui-media-body{
        //            font-size: 14px;
        //        }
        //        img{
        //            width:50%;
        //        }
        //     }
           
        // }      

</style>    