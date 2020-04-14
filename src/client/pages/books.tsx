import React,{ useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const booksGql = gql`
  {
  books{
    title
  }
}
`;
const heatmapGql = gql`
    mutation{
        addHeatMap(heatMap:{

            viewport_position:"2322",
            viewport_height:"2222",
            viewport_width:"2222",
            url:"2222",
            title:"2222",
            url_path:"2222",
            event_duration:"2222",
        })
    }
`


export default  function(){
    const { loading, error, data ={books:[]} } = useQuery(booksGql);
    const { books = []} =data;
    useEffect(()=>{
        x();
    });

    return (<div style="height:1000px;background-color:red;">
        {
            books.map((v:any)=>{
            return <span>{v.title}</span>;
            })
        }
    </div>)
}

function x() {
    var scroll_delay_time = 4000;
    var scroll_event_duration = 18000;
    function init() {
        var interDelay = function(param) {
            var interDelay:any = {};
            interDelay.timeout = param.timeout || 1000;
            interDelay.func = param.func;
            interDelay.hasInit = false;
            interDelay.inter = null;
            interDelay.main = function(para, isClose) {
                this.func(para, isClose);
                this.inter = null;
            };
            interDelay.go = function(isNoDelay) {
                var me = this;
                var para:any = {};
                if (!this.inter) {
                    para.$viewport_position = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
                    para.$viewport_position = Math.round(para.$viewport_position) || 0;
                    para.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
                    para.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
                    if (isNoDelay) {
                        interDelay.main(para, true);
                    } else {

                        this.inter = setTimeout(function() {
                            interDelay.main(para);
                        }, this.timeout);

                    }
                }
            };
            return interDelay;
        };
        var delayTime = interDelay({
            timeout: 1000,
            func: function(para, isClose) {
                var offsetTop = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
                var current_time:any = new Date();
                var delay_time:any = current_time - this.current_time;
                if ((delay_time > scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
                    para.$url = location.href;
                    para.$title = document.title;
                    para.$url_path = location.pathname;
                    para.event_duration = Math.min(scroll_event_duration, parseInt(delay_time) / 1000);
                    post('$WebStay', para);
                }
                this.current_time = current_time;
            }
        });

        delayTime.current_time = new Date();

        window.addEventListener('scroll',function(){
            delayTime.go();
        })
        window.addEventListener('upload',function(){
            delayTime.go('notime');
        });
    }

    function post(type,data){
        console.log("________post_______",type, data);
    }

    function isNaN(v) {
        return typeof v == 'undefined'|| v == null
    }
    var heatEvent = {
        na: function() {
            var a = document.documentElement.scrollLeft || window.pageXOffset;
            return parseInt(`${isNaN(a) ? 0 : a}`, 10);
        },
        i: function() {
            var a:any = 0;
            try {
                a = document.documentElement && document.documentElement.scrollTop || window.pageYOffset,
                    a = isNaN(a) ? 0 : a;
            } catch (b) {
                a = 0;
            }
            return parseInt(a, 10);
        },
        getBrowserWidth: function() {
            var a:any = window.innerWidth || document.body.clientWidth;
            return isNaN(a) ? 0 : parseInt(a, 10);
        },
        getBrowserHeight: function() {
            var a:any = window.innerHeight || document.body.clientHeight;
            return isNaN(a) ? 0 : parseInt(a, 10);
        },
        getScrollWidth: function() {
            var a = parseInt(`${document.body.scrollWidth}`, 10);
            return isNaN(a) ? 0 : a;
        },
        W: function(a) {
            var b = parseInt(`${+a.clientX + +this.na()}`, 10);
            var a:any = parseInt(`${+a.clientY + +this.i()}`, 10);
            return {
                x: isNaN(b) ? 0 : b,
                y: isNaN(a) ? 0 : a
            }
        },
    }

    init();
}
