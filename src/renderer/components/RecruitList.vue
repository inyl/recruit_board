<template>
    <div id="wrapper">
        <main>
            <md-button @click="getList"  class="md-raised md-primary">리푸레쉬</md-button>
            <span>count : {{orderedItems.length}}</span>
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
                            <md-table-head md-sort-by="wdate">수정일</md-table-head>
                            <md-table-head md-sort-by="rdate">등록일</md-table-head>
                        </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="row in orderedItems" :key="row.id">
                        <md-table-cell><img :src="row.img" width="120"/></md-table-cell>
                        <md-table-cell @click="open(row.url)" style="cursor: pointer" class="has-ripple">
                            <md-ink-ripple /><span @click="open(row.url)">{{row.title}}</span>
                        </md-table-cell>
                        <md-table-cell>{{row.company}}</md-table-cell>
                        <md-table-cell>{{row.duedate}}</md-table-cell>
                        <md-table-cell>{{row.location}}</md-table-cell>
                        <md-table-cell>{{row.position}}</md-table-cell>
                        <md-table-cell>{{row.wdate}} <span v-if="isDiffDays(row.wdate)">(current)</span></md-table-cell>
                        <md-table-cell>{{row.rdate}} </md-table-cell>
                        <md-table-cell>
                            <div><md-button @click="openDialog(row.text)" class="md-icon-button md-raised md-primary" md-theme="teal"><md-icon>message</md-icon></md-button></div>
                        </md-table-cell>
                    </md-table-row>
                </md-table-body>
                </md-table>
            </div>
        </main>
    </div>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    export default {
        name : 'RecruitList',
        created : function () {
            this.getList();
        },
        data : () => ({
            list : [],
            orderField : "wdate",
            direction : "desc"
        }),
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
                this.$http.get('https://y0qji6ydsk.execute-api.ap-northeast-2.amazonaws.com/dev/micro_test', {
                    method: 'get',
                    headers : {'Access-Control-Allow-Origin': '*', 'x-api-key': this.$apiKey}
                }).then(function(response){
                    _self.list = response.data.Items;
                });
            },
            /**
             * 외부 링크 오픈
             * @param link
             */
            open (link) {
                require('electron').shell.openExternal(link);
            },
            openDialog (text) {
                try {
                    const {dialog} = require('electron').remote;
                    dialog.showMessageBox({message : text});
                } catch (ex) {
                    alert(ex);
                }

            },
            closeDialog (ref) {
                this.$refs[ref].close()
            },
            /**
             * 날짜가 현재날자랑 같은지 비교한다
             */
            isDiffDays (day) {
                const diffDay = moment(day);
                const now = moment();
                return !now.diff(diffDay, 'days');
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