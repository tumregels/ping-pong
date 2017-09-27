$(document).ready(game);

function menu() {
    $('<div/>').attr("id", "menu").appendTo("body")
    $('<img/>').attr("id", "img").attr("src", "images/menu.png").appendTo("#menu")
    $('<button/>').text("Start").attr("id", "start").css({
        "position": "absolute",
        "top": "60%",
        "left": "50%",
        "font-size": "25px",
        "background-color": "#00cc00",
        "border": "none",
        "border-radius": "8px",
        "padding": "12px 28px",
    }).appendTo("#menu")
    $('<p1/>').text("WORLD TABLE TENNIS CHAMPIONSHIP").attr("id","menutext").appendTo("#menu")

    $("#start").click(function () {
        $("#menu").empty()
        game();
    });
}

