function handlePresentationClick(e) {
    let current = document.querySelector('hp-slide.active'),
        next = current.nextElementSibling;

    while (next && next.tagName != 'HP-SLIDE') {
        next.nextElementSibling;
    }

    if(next) {
        current.classList.remove('active');
        next.classList.add('active');

        next.querySelectorAll('.match').forEach(el => {
            setTimeout(() => el.classList.remove('match'), 0);
        });

        let aa = parseInt(next.getAttribute('data-autoadvance'));

        if(!isNaN(aa)) {
            setTimeout(function (e) {
                handlePresentationClick(e)
            }, aa)
        }

        let osa = next.getAttribute('data-onshow');
        if(osa) {
            window[osa]();
        }

    }
}

function startLearning(delay) {
    showLearning();
    setTimeout(() => {
        if(delay > 1.1) {
            delay = Math.pow(delay, 1/1.05);
            startLearning(delay);
        }
    }, delay);
}

function runLearningSequence() {
    startLearning(1500);
}

function setLearnImage(imageName) {
    let img = document.querySelector('hp-slide.active hp-learn img');

    if(img)
        img.src = 'images/' + imageName + '.svg';
}

let shapes = ['circle', 'diamond', 'square', 'triangle'];
function showLearning() {
    let ii = Math.floor(Math.random() * shapes.length);
    setLearnImage(shapes[ii]);

    let slide = document.querySelector('hp-slide.active');
    slide.classList.remove('learn-yes');
    slide.classList.remove('learn-no');
    slide.classList.add( ii ? 'learn-no' : 'learn-yes');
}

function handleAnimationEnd(e) {
    let slide = e.target.closest('hp-slide'),
        aa = slide.getAttribute('data-autoadvance');

    if (aa == 'animationend' && slide.classList.contains('active')) {
        handlePresentationClick(e);
    }
}

function animateSVG() {
    if(animateSVGStep()) {
        setTimeout(animateSVG, 30);
    }
}

function animateSVGStep() {
    let slide = document.querySelector('hp-slide.active'),
        svgs = slide.querySelectorAll('svg');

    if(svgs[0].children.length > 0) {
        let el = svgs[0].children[0];

        if(el) {
            svgs[1].appendChild(el.parentNode.removeChild(el));
        }
        return true;
    }

    return false;
}

/*
 *  global site scripts
 */
window.addEventListener('DOMContentLoaded', function(e) {
    let presentation = document.querySelector('hp-presentation');

    presentation.onclick = handlePresentationClick;
    presentation.addEventListener('animationend', handleAnimationEnd, false);
});
