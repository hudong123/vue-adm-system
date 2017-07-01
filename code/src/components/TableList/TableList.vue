<template>
	<div class="table-block">
		<i-table stripe :columns="columns1" :data="tableinfo"></i-table>
		<div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="556" :current="parseInt($route.params.page)" @on-change="changePage" show-elevator></Page>
	        </div>
	    </div>
	</div>
</template>

<script>
export default {

  name: 'TableLists',
  data () {
    return {
    	isShowTable: false,
      tableinfo: this.mockTableData1(),
      types: {
        ask: '问答',
        job: '招聘',
        share: '分享'
      },
    	columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
    		{
    			title: '发帖标题',
    			key: 'title',
          render(row) {
            return `<em><a @click="jumpArticle(row.id)" class="tableTitle">${row.title}</a></em>`
          }
    		},
        {
          title: '发布人',
          key: 'name',
          render(row) {
            return `<em><a @click="jumpUser(row.name)">${row.name}</a></em>`
          },
        },
        {
          title: '类别',
          key: 'tab',
          render(row) {
            switch(row.tab)
            {
              case 'share':
                return `<b>分享</b>`;
              case 'ask':
                return `<b>问答</b>`;
              case 'job':
                return `<b>招聘</b>`;  
              default:
                return '';
            }
          },
        },
        {
          title: '操作',
          key: 'action',
          render(row, column, index) {
            // return `<i-button type="warning" size="small" @click="delete(${index})">删除</i-button>`;
            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button><i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
          }
        }
    	],
    	tableLength: '' 
    };
  },
  computed: {
  	isLoading() {
  		return this.$store.state.isLoading;
  	}
  },

  created() {
  	this.$store.commit('showAsideMenu', false);
  },

  methods: {
  	mockTableData1() {
  		this.$store.commit('changeTab', {type: 'all', articleList: [], isLoading: true});
  		let tabledata = [];
  		this.axios.get(`https://cnodejs.org/api/v1/topics?page=${this.$route.params.page}`)
  		.then(response => {
  			for(let i = 0, ilength = response.data.data.length; i < ilength; i++){
	  			tabledata.push({
	  				name: response.data.data[i].author.loginname,
	  				author_id: response.data.data[i].author_id,
	  				title: response.data.data[i].title,
            id: response.data.data[i].id,
            tab: response.data.data[i].tab,
            time: this.changeTime(response.data.data[i].create_at),
            visit_count: response.data.data[i].visit_count,
            last_reply_at: this.changeTime(response.data.data[i].last_reply_at)
	  			})
	  		};
  		})
  		.then(() => this.$store.commit('viewArcticle', false))
  		return tabledata;
  	},
  	changePage(page) {
  		this.$router.push({ path: `/tablelist/${page}`});
      this.tableinfo = this.mockTableData1();
  	},
  	jumpUser(user) {
  		this.$router.push({ path: `/user/${user}`})
  	},
    jumpArticle(Article) {
      this.$router.push({ path: `/article/${Article}`})
    },
    show (index) {
      this.$Modal.info({
        title: '详细信息',
        content: `主题: <h3>${this.tableinfo[index].title}</h3><br>
                  帖子ID: ${this.tableinfo[index].id}<br>
                  发布人：<b>${this.tableinfo[index].name}</b><br>
                  发布人ID: ${this.tableinfo[index].author_id}<br>
                  类型：${this.types[this.tableinfo[index].tab]}<br>
                  发帖时间：${this.tableinfo[index].time}<br>
                  浏览数：${this.tableinfo[index].visit_count}<br>
                  最后回帖时间: ${this.tableinfo[index].last_reply_at}`
      });
    },
    remove (index) {
      this.tableinfo.splice(index, 1);
      this.$Message.success('删除成功');
    }
  }
};
</script>

<style lang="scss">
.tableTitle{
  color: #1E90FF
}
</style>