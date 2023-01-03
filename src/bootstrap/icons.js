/**
 * https://ant-design.gitee.io/components/icon-cn/
 * https://ant.design/components/icon-cn/
 */
import * as Icons from '@ant-design/icons-vue/es'

export const filterIcons = ['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor']

export default (app) => {
  Object.keys(Icons)
    .filter(k => !filterIcons.includes(k))
    .forEach((k) => {
      app.component(Icons[k].displayName, Icons[k])
    })
}
