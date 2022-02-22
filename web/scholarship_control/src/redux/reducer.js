// 设置全局 user 变量的 reducer
export function userReducer(state, action) {
  switch (action.type) {
    case 'set':
      return action.user
    case 'remove':
      return {
        user: null
      }
      default:
        break;
  }
}