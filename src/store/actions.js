// test
import * as storage from './localStorage'
// eslint-disable-next-line
/* eslint-disable */
export const SET_sxhdwID = ({
  commit
}, val) => {
  storage.set_Storage('sxhdwID', JSON.stringify(val))
  commit('SET_sxhdwID', val)
}

// 简历模块是否保存
// export const getKeySFBC = ({commit},val) => {
//     var s,key
//     console.log(val)
//     for(var key in state.addJlbcsj){
//         if(!state.addJlbcsj[key]){
//             s = false
//             break
//         }
//     }
//     return s
// }
