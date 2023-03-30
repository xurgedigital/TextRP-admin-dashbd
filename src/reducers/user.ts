export const user: any = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, user: action.payload }
    case 'LOGGED_IN_USER_TOKEN':
      return { ...state, token: action.payload }
    default:
      return state
  }
}
