function setup()
{
    canvas = createCanvas(280, 280)
    background("white");
    canvas.position(500, 200);
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas()
{
    background("white")
}

function draw()
{
    strokeweight(13);
    stroke(0);
    if (mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label:' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

