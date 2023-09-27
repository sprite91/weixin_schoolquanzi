// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "_title": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "标题",
    "label": "标题"
  },
  "state": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "状态",
    "defaultValue": true,
    "label": "状态"
  },
  "navid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "分类",
    "label": "分类"
  },
  "orderid": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "排序",
    "label": "排序"
  },
  "content": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "文章内容",
    "title": "文章内容"
  },
  "author": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "作者",
    "title": "作者"
  },
  "article_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      }
    ],
    "title": "文章状态",
    "defaultValue": 0,
    "label": "文章状态"
  },
  "view_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "阅读数量",
    "defaultValue": 666,
    "label": "阅读数量"
  },
  "avatar": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "label": "封面大图",
    "title": "封面大图"
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "发表时间"
  },
  "is_essence": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "阅读加精",
    "label": "阅读加精"
  }
}

const enumConverter = {
  "article_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
