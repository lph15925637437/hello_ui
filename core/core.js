import Const from './js/const'
import Util from './js/util'
import Api from './js/api'
import Data from './js/data'

function Core () {
    return{
        Const:Const,
        Util:Util,
        Api:Api,
        Data:Data
    }
}

export default new Core()
