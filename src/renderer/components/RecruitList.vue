<template>
    <div id="wrapper">
        <main>
            <md-button @click="getList"  class="md-raised md-primary">리푸레쉬</md-button>
            <div>
                <md-table md-sort="wdate" @sort="reOrder">
                    <md-table-header>
                        <md-table-row>
                            <md-table-head>img</md-table-head>
                            <md-table-head>title</md-table-head>
                            <md-table-head>company</md-table-head>
                            <md-table-head md-sort-by="duedate">duedate</md-table-head>
                            <md-table-head>location</md-table-head>
                            <md-table-head>position</md-table-head>
                            <md-table-head md-sort-by="wdate">wdate</md-table-head>
                        </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="row in orderedItems" :key="row.id">
                        <md-table-cell><md-tooltip>{{row.text}}</md-tooltip><img :src="row.img" width="120"></md-table-cell>
                        <md-table-cell><button @click="open(row.url)">{{row.title}}</button></md-table-cell>
                        <md-table-cell>{{row.company}}</md-table-cell>
                        <md-table-cell>{{row.duedate}}</md-table-cell>
                        <md-table-cell>{{row.location}}</md-table-cell>
                        <md-table-cell>{{row.position}}</md-table-cell>
                        <md-table-cell>{{row.wdate}}</md-table-cell>
                        <md-table-cell>
                            <md-dialog-alert
                                :md-content="row.text" ref="row.id"></md-dialog-alert>
                        </md-table-cell>
                        <md-button @click="openDialog(row.id)">info</md-button>
                    </md-table-row>
                </md-table-body>
                </md-table>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        name : 'RecruitList',
        data : function() {
            return {
                list : [],
                orderField : "wdate",
                direction : "desc",
                apikey : "" // api-key. 소스상에는 우선 가려둠
            };
        },
        computed: {
            orderedItems () {
                // vue material 버그로 정렬이 제대로 안동작해서 다르게 처리함. 이거도 default아이콘등과 연동이 안되서 문제임
                return _.orderBy(this.list, this.orderField, this.direction)
            }
        },
        methods : {
            /**
             * 리스트를 가지고온다.
             */
            getList () {
                let _self = this;
                axios.get('https://y0qji6ydsk.execute-api.ap-northeast-2.amazonaws.com/dev/micro_test', {
                    method: 'get',
                    headers : {'Access-Control-Allow-Origin': '*', 'x-api-key': _self.apikey}
                }).then(function(response){
                    _self.list = response.data.Items;
                });
            },
            /**
             * 외부 링크 오픈
             * @param link
             */
            open (link) {
                require('electron').shell.openExternal(link)
            },
            openDialog (ref) {
                this.$refs[ref].open()
            },
            /**
             * 정렬버튼 클릭시 이벤트 함수
             * @param object
             */
            reOrder (object) {
                this.orderField = object.name;
                this.direction = object.type;
            }
        }
    }
</script>

<style>
    /* vue material icon css */
    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(https://fonts.gstatic.com/s/materialicons/v29/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }

</style>