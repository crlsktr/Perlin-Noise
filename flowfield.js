var gui;

var inc = 0.1;
var scl = 10;

var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var active_sketch = false;

function setup() {
    createCanvas(windowWidth, windowHeight);


    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');
    bg = color('rgba(0, 0, 0, 1)');
    colors = ["rgba(216, 226, 220, 1)","rgba(255, 229, 217, 1)","rgba(255, 202, 212, 1)","rgba(244, 172, 183, 1)","rgba(157, 129, 137, 1)"]

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle(colors[Math.floor(Math.random() * 5)]);
    }
    background(bg);
    button = createButton("Son...")
    button.position(width/2, height/2);
    button.mousePressed(() => { active_sketch = true; button.hide(); })
};

function draw() {
    if (active_sketch) {
        
        var yoff = 0;
        for (var y = 0; y < rows; y++) {
            var xoff = 0;
            for (var x = 0; x < cols; x++) {
                var index = x + y * cols;
                var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                flowfield[index] = v;
                xoff += inc;
    
            }
            yoff += inc;
            zoff += 0.0001;
        }
    
        for (var i = 0; i < particles.length; i++) {
            particles[i].follow(flowfield);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }
        textSize(width/4); fill(255,255,255); textAlign((width/2)-200,height/2); text("Niñas");
        fr.html('FPS:' + floor(frameRate()));
    
    }
};
