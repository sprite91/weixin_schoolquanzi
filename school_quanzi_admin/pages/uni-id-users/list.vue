<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title"></view>
        <view class="uni-sub-title"></view>
      </view>
      <view class="uni-group">
        <input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
        <button class="uni-button" type="default" size="mini" @click="search">搜索</button>
        <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
        <button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length" @click="delTable">批量删除</button>
        <download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData" :type="exportExcel.type" :name="exportExcel.filename">
          <button class="uni-button" type="primary" size="mini">导出 Excel</button>
        </download-excel>
      </view>
    </view>
    <view class="uni-container">
      <unicloud-db ref="udb" :collection="collectionList" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'avatar')" sortable @sort-change="sortChange($event, 'avatar')">头像地址</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'avatar_file')">头像文件</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'comment')" sortable @sort-change="sortChange($event, 'comment')">备注</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'dcloud_appid')">dcloud_appid</uni-th>
            <uni-th align="center" filter-type="timestamp" @filter-change="filterChange($event, 'last_login_date')" sortable @sort-change="sortChange($event, 'last_login_date')">last_login_date</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'last_login_ip')" sortable @sort-change="sortChange($event, 'last_login_ip')">last_login_ip</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'mobile')" sortable @sort-change="sortChange($event, 'mobile')">手机号码</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.mobile_confirmed_localdata" @filter-change="filterChange($event, 'mobile_confirmed')">手机号验证状态</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'nickname')" sortable @sort-change="sortChange($event, 'nickname')">昵称</uni-th>
            <uni-th align="center">角色</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'tags')">标签</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'score')" sortable @sort-change="sortChange($event, 'score')">score</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.status_localdata" @filter-change="filterChange($event, 'status')">用户状态</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'token')">token</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'username')" sortable @sort-change="sortChange($event, 'username')">用户名</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'wx_unionid')" sortable @sort-change="sortChange($event, 'wx_unionid')">wx_unionid</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'qq_unionid')" sortable @sort-change="sortChange($event, 'qq_unionid')">qq_unionid</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'identities')">identities</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">{{item.avatar}}</uni-td>
            <uni-td align="center">
              <uni-file-picker v-if="item.avatar_file && item.avatar_file.fileType == 'image'" :value="item.avatar_file" :file-mediatype="item.avatar_file && item.avatar_file.fileType" return-type="object" :imageStyles="imageStyles" readonly></uni-file-picker>
              <uni-link v-else :href="item.avatar_file && item.avatar_file.url" :text="item.avatar_file && item.avatar_file.url"></uni-link>
            </uni-td>
            <uni-td align="center">{{item.comment}}</uni-td>
            <uni-td align="center">{{item.dcloud_appid}}</uni-td>
            <uni-td align="center">
              <uni-dateformat :threshold="[0, 0]" :date="item.last_login_date"></uni-dateformat>
            </uni-td>
            <uni-td align="center">{{item.last_login_ip}}</uni-td>
            <uni-td align="center">{{item.mobile}}</uni-td>
            <uni-td align="center">{{options.mobile_confirmed_valuetotext[item.mobile_confirmed]}}</uni-td>
            <uni-td align="center">{{item.nickname}}</uni-td>
            <uni-td align="center">{{item.role && item.role[0] && item.role[0].text}}</uni-td>
            <uni-td align="center">{{item.tags}}</uni-td>
            <uni-td align="center">{{item.score}}</uni-td>
            <uni-td align="center">{{options.status_valuetotext[item.status]}}</uni-td>
            <uni-td align="center">{{item.token}}</uni-td>
            <uni-td align="center">{{item.username}}</uni-td>
            <uni-td align="center">{{item.wx_unionid}}</uni-td>
            <uni-td align="center">{{item.qq_unionid}}</uni-td>
            <uni-td align="center">{{item.identities}}</uni-td>
            <uni-td align="center">
              <view class="uni-group">
                <button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
                <button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count" @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script>
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/uni-id-users.js';

  const db = uniCloud.database()
  // 表查询配置
  const dbOrderBy = '' // 排序字段
  const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表。联表查询格式: 主表字段名.副表字段名，例如用户表关联角色表 role.role_name
  // 分页配置
  const pageSize = 20
  const pageCurrent = 1

  const orderByMapping = {
    "ascending": "asc",
    "descending": "desc"
  }

  export default {
    data() {
      return {
        collectionList: [ db.collection('uni-id-users').field('avatar,avatar_file,comment,dcloud_appid,last_login_date,last_login_ip,mobile,mobile_confirmed,nickname,role,tags,score,status,token,username,wx_unionid,qq_unionid,identities').getTemp(),db.collection('uni-id-roles').field('role_id, role_name as text').getTemp() ],
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {
            "mobile_confirmed_localdata": [
              {
                "text": "未验证",
                "value": 0
              },
              {
                "text": "已验证",
                "value": 1
              }
            ],
            "status_localdata": [
              {
                "text": "正常",
                "value": 0
              },
              {
                "text": "禁用",
                "value": 1
              },
              {
                "text": "审核中",
                "value": 2
              },
              {
                "text": "审核拒绝",
                "value": 3
              }
            ]
          },
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "uni-id-users.xls",
          "type": "xls",
          "fields": {
            "头像地址": "avatar",
            "头像文件": "avatar_file",
            "备注": "comment",
            "dcloud_appid": "dcloud_appid",
            "last_login_date": "last_login_date",
            "last_login_ip": "last_login_ip",
            "手机号码": "mobile",
            "手机号验证状态": "mobile_confirmed",
            "昵称": "nickname",
            "角色": "role",
            "标签": "tags",
            "score": "score",
            "用户状态": "status",
            "token": "token",
            "用户名": "username",
            "wx_unionid": "wx_unionid",
            "qq_unionid": "qq_unionid",
            "identities": "identities"
          }
        },
        exportExcelData: []
      }
    },
    onLoad() {
      this._filter = {}
    },
    onReady() {
      this.$refs.udb.loadData()
    },
    methods: {
      onqueryload(data) {
        this.exportExcelData = data
      },
      getWhere() {
        const query = this.query.trim()
        if (!query) {
          return ''
        }
        const queryRe = new RegExp(query, 'i')
        return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
      },
      search() {
        const newWhere = this.getWhere()
        this.where = newWhere
        this.$nextTick(() => {
          this.loadData()
        })
      },
      loadData(clear = true) {
        this.$refs.udb.loadData({
          clear
        })
      },
      onPageChanged(e) {
        this.selectedIndexs.length = 0
        this.$refs.table.clearSelection()
        this.$refs.udb.loadData({
          current: e.current
        })
      },
      navigateTo(url, clear) {
        // clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
        uni.navigateTo({
          url,
          events: {
            refreshData: () => {
              this.loadData(clear)
            }
          }
        })
      },
      // 多选处理
      selectedItems() {
        var dataList = this.$refs.udb.dataList
        return this.selectedIndexs.map(i => dataList[i]._id)
      },
      // 批量删除
      delTable() {
        this.$refs.udb.remove(this.selectedItems(), {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      // 多选
      selectionChange(e) {
        this.selectedIndexs = e.detail.index
      },
      confirmDelete(id) {
        this.$refs.udb.remove(id, {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      sortChange(e, name) {
        this.orderByFieldName = name;
        if (e.order) {
          this.orderby = name + ' ' + orderByMapping[e.order]
        } else {
          this.orderby = ''
        }
        this.$refs.table.clearSelection()
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      },
      filterChange(e, name) {
        this._filter[name] = {
          type: e.filterType,
          value: e.filter
        }
        let newWhere = filterToWhere(this._filter, db.command)
        if (Object.keys(newWhere).length) {
          this.where = newWhere
        } else {
          this.where = ''
        }
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      }
    }
  }
</script>

<style>
</style>
