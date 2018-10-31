const baseurl = (state, action) => {
    let basePath = "";
    if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') {
        basePath = 'http://pan82641058.vicp.io:36681/';
    } else {
        if (window["context"] == undefined) {
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
        }
        basePath = window.location.origin + "/con/";
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