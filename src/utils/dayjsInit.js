import {extend} from 'dayjs'

import 'dayjs/locale/zh-cn'
import localeData from 'dayjs/plugin/localeData'
import badMutable from 'dayjs/plugin/badMutable'

extend(localeData)
extend(badMutable)
