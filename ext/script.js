// Jasper Charlinski

const canvas = document.getElementById(`backgroundCanvas`);
const border = document.getElementById(`border`);

const ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --------------------------------------------------------------

function playPauseButton () {

    const playPauseButton = document.getElementById(`playPauseBackground`);

    if (playPauseButton.innerHTML == `<img src="img/playButton.png" alt="playPauseBackground">`)
    {
        playPauseButton.innerHTML = `<img src="img/pauseButton.png" alt="playPauseBackground">`; 
        playVisualizer(true);
    }
    else
    {
        playPauseButton.innerHTML = `<img src="img/playButton.png" alt="playPauseBackground">`; 
        playVisualizer(false);
    }

}

function playVisualizer(play) {

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const audio = new Audio(`ext/song.mp3`);
    const audioSource = audioCtx.createMediaElementSource(audio);
    audioSource.connect(analyser);

    let stop;

    if (play)
    {
        audio.play();
        stop = false;
    }
    else
    {
        audio.pause();
        stop = true;
    }

    //An unsigned integer, representing the window size of the FFT, given in number of samples. 
    //A higher value will result in more details in the frequency domain but fewer details in the time domain.
    // Must be a power of 2 (up to 2^15)
    analyser.fftSize = 1024;

    //Bin count is always half of the fft size and is the number of canvas elements that are to be drawn.
    const bufferLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLen);

    function animateFullRainbowBar() {

        if (stop)
        {
            cancelAnimationFrame(animateFullRainbowBar);
            window.location.reload();
            return;
        }

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i] * 2;

            const hue = i * 10;
            
            ctx.fillStyle = `hsl(` + hue + `,100%, 50%)`;

            // let red = 100;
            // let blue = barHeight + 30;
            // let green = barHeight + 50;

            border.style.border = `3px solid hsl(` + barHeight + `,100%, 50%)`;
            // border.style.border = `3px solid rgb(` + red + `, ` + blue + `, ` + green + `)`;

            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            ctx.save();
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);   
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            ctx.restore();

            x += barWidth + 5;

            if (x > canvas.width/2)
            {
                x = 0;
                break;
            }
        }
        
        requestAnimationFrame(animateFullRainbowBar);
    }

    animateFullRainbowBar(stop);

}
