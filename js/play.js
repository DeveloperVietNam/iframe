function getValue(key) {
    var url_string = window.location.href
    var url = new URL(url_string);
    return url.searchParams.get(key);
}

//set up jw player
function setupPlayer(url) {
    jwplayer.key = "W7zSm81+mmIsg7F+fyHRKhF3ggLkTqtGMhvI92kbqf/ysE99";

    var playerInstance = jwplayer("player");
    playerInstance.setup({
        playlist: [{
            sources: [{
                "default": false,
                "type": "hls",
                file: url,
                "label": "0"
            }]
        }],
        primary: "html5",
        hlshtml: true,
        width: "100%",
        height: "100vh",
    });

    playerInstance.on("ready", function () {
        setTimeout(() => {
            playerInstance.play()
        }, 2000);
        playerInstance.addButton("/settings.svg", "Server", function () {
            
        }, "Server");
    });
}

function init() {
    let id = getValue("id")
    if (id) {
        setupPlayer("https://m3u8.1proxy.xyz/low/" + id + "_playlist.m3u8")
    } else {
        //không có id trong dữ liệu thì về 404
        document.location.href = "https://public.gostream.video/404.html"
    }
}

const url = (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;

// if (url) {
//     //nếu chạy link trực tiếp thì sẽ về 404. đổi
//     document.location.href = "https://public.gostream.video/404.html"
// } else {
    init()
// }
