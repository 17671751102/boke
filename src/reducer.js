const baseurl = (state, action) => {
    let basePath = "";
    if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') {
        basePath = 'http://39.106.137.129:8080/';
    }
    if (!state) return {
        baseurl: basePath,
        listreload: 0,
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, listreload: action.listreload }
        default:
            return state
    }
}
export default baseurl