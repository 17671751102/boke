const baseurl = (state, action) => {
    let basePath = "";
    if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') {
        basePath = 'http://39.106.137.129/';
    }
    if (!state) return {
        baseurl: basePath,
        listreload: 0,
        search:[],
        wztitle:'',
        LoadMore:false
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, listreload: action.listreload }
        case 'CHANGE_TITLE':
            return{...state, wztitle: action.wztitle}
        case 'CHANGE_LIST':
            return{...state, LoadMore:action.LoadMore}
        default:
            return state
    }
}
export default baseurl