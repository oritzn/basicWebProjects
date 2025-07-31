function playAudio(type) {
    if(type == "1") {
        var audio = new Audio("/sounds/50.mp3");
    }else if(type == "2") {
        var audio = new Audio("/sounds/smart.mp3");
    }else if(type == "3") {
        var audio = new Audio("/sounds/fired.mp3");
    }else if(type == "4") {
        var audio = new Audio("/sounds/fake.mp3");
    }else if(type == "5") {
        var audio = new Audio("/sounds/china.mp3");
    }else if(type == "6") {
        var audio = new Audio("/sounds/racist.mp3");
    }else if(type == "7") {
        var audio = new Audio("/sounds/obama.mp3");
    }else if(type == "8") {
        var audio = new Audio("/sounds/happy.mp3");
    }else if(type == "9") {
        var audio = new Audio("/sounds/dollars.mp3");
    }else {

    }
   
    audio.loop = false;
    audio.play();
}