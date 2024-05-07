objects = [];

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
}

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video, 0, 0, 600, 500);
    if(check == true){
        objectdetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status = Objects Detected!";
            document.getElementById("no").innerHTML = "Number of objects detected is " + objects.length;
            r = random(255);
            g = random(255);
            b = random(255);
            console.log("r " + r + " g " + g + " b " + b);
            fill(r, g, b);
            text(objects[i].label + " " + floor(objects[i].confidence * 100) + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function play(){
    objectdetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

check = "";

function modelLoaded(){
    console.log("Model Loaded");
    check = true;
    video.loop();
    video.speed(3);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}