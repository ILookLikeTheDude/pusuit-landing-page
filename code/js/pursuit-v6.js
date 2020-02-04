$(function () {
//remove char forced by CKEditor
    $('#play-circle').empty();

//layer fade timing
    let fadeOutMed = {
        'z-index': 0,
        opacity: 0,
        transition: 'opacity 0.5s linear'
    };
    let fadeInMed = {
        'z-index': 1,
        opacity: 1,
        transition: 'opacity 0.5s linear'
    };
    let fadeInSlow = {
        'z-index': 1,
        opacity: 1,
        transition: 'opacity 1.0s ease-in',
        transitionDelay: '1.0s'
    };
    let fadeOutFast = {
        'z-index': 0,
        opacity: 0,
        transition: 'opacity 0.3s ease-out'
    };

    //let allSceneElements = document.getElementsByClassName('scene');
    let $scene = $('.scene');
    const TOTAL_SCENES = $scene.length;
    let count = 0;


    let $allSceneElements = $scene.length;

    //progress bar display and functionality
    function changeProgressBar(c) {
        let barWidth = (100 / (TOTAL_SCENES - 1)) * c;
        $('#progress-bar').animate({width: barWidth + '%'});
    }

    function getScene(count) {
        let $currentScene = $($scene[count]);
        return $currentScene;
    }

    function getLinks(count) {
        let $content = $($scene[count]).find('.content-block').find('a');
        return $content;
    }

    function loadNextBackground(count) {
        let $nextScene= $($scene[count + 1]);
        let $hasClassBackground = ($nextScene.hasClass('load-next-background'));
        if ( ! $hasClassBackground ) {
            $nextScene.addClass('load-next-background');
        }
    }

    //set arrow visibility based on page number
    let arrowDisplay = function(pageNumber) {
        if (pageNumber === TOTAL_SCENES - 1) {
            $('#pursuit-right-arrow').css('visibility', 'hidden');
            $('#pursuit-left-arrow').css('visibility', 'visible');
        } else if (pageNumber === 0) {
            $('#pursuit-right-arrow').css('visibility', 'hidden');
            $('#pursuit-left-arrow').css('visibility', 'hidden');
        } else {
            $('#pursuit-right-arrow').css('visibility', 'visible');
            $('#pursuit-left-arrow').css('visibility', 'visible');
        }
    };



    //begin button
    $('#btn-begin').on('click', function() {
        loadNextBackground(count);
        if (count < 1) {
            $($scene[count]).find('.content-block').css(fadeOutFast);
            $($scene[count]).css(fadeOutMed);
            $($scene[count + 1]).css(fadeInMed);
            $($scene[count + 1]).find('.content-block').css(fadeInSlow);
            count++;
            changeProgressBar(count);
            arrowDisplay(count);
            getScene(count).focus();
        }
        return count;
    });



    //onscreen ui arrow event handlers - cross fades
    $('#pursuit-left-arrow').on('click', function () {
        if (count > 0) {
            $($scene[count]).find('.content-block').css(fadeOutFast);
            $($scene[count]).css(fadeOutMed);
            $($scene[count - 1]).css(fadeInMed);
            $($scene[count - 1]).find('.content-block').css(fadeInSlow);
            count--;
            changeProgressBar(count);
            arrowDisplay(count);
            getScene(count).focus();
        }
        return count;
    });

    $('#pursuit-right-arrow').on('click', function() {
        loadNextBackground(count);
        if (count < TOTAL_SCENES - 1) {
            $($scene[count]).find('.content-block').css(fadeOutFast);
            $($scene[count]).css(fadeOutMed);
            $($scene[count + 1]).css(fadeInMed);
            $($scene[count + 1]).find('.content-block').css(fadeInSlow);
            count++;
            changeProgressBar(count);
            arrowDisplay(count);
            getScene(count).focus();
        }
        return count;
    });



    //keyboard arrow event handlers (keyboard arrows trigger right/left nav) (combine all into function with switch
    // block)
    $(document).on('keydown', function(e) {
        if(e.which === 39) {
            loadNextBackground(count);
            if (count < TOTAL_SCENES - 1) {
                $($scene[count]).find('.content-block').css(fadeOutFast);
                $($scene[count]).css(fadeOutMed);
                $($scene[count + 1]).css(fadeInMed);
                $($scene[count + 1]).find('.content-block').css(fadeInSlow);
                count++;
                changeProgressBar(count);
                arrowDisplay(count);
                getScene(count).focus();
            }
            e.preventDefault();
            return count;

        } else if (e.which === 37) {
            if (count > 0) {
                $($scene[count]).find('.content-block').css(fadeOutFast);
                $($scene[count]).css(fadeOutMed);
                $($scene[count - 1]).css(fadeInMed);
                $($scene[count - 1]).find('.content-block').css(fadeInSlow);
                count--;
                changeProgressBar(count);
                arrowDisplay(count);
                getScene(count).focus();
            }
            e.preventDefault();
            return count;
        }
    });



    //arrow button focus controls (return / space)
    $('#pursuit-right-arrow').on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) {
            loadNextBackground(count);
            if (count < TOTAL_SCENES - 1) {
                $($scene[count]).find('.content-block').css(fadeOutFast);
                $($scene[count]).css(fadeOutMed);
                $($scene[count + 1]).css(fadeInMed);
                $($scene[count + 1]).find('.content-block').css(fadeInSlow);
                count++;
                changeProgressBar(count);
                arrowDisplay(count);
                getScene(count).focus();
            }
            e.preventDefault();
            return count;
        }
    });

    $('#pursuit-left-arrow').on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) {
            if (count > 0) {
                $($scene[count]).find('.content-block').css(fadeOutFast);
                $($scene[count]).css(fadeOutMed);
                $($scene[count - 1]).css(fadeInMed);
                $($scene[count - 1]).find('.content-block').css(fadeInSlow);
                count--;
                changeProgressBar(count);
                arrowDisplay(count);
                getScene(count).focus();

            }
            e.preventDefault();
            return count;
        }
    });



    //remove user agent focus and hover styling
    $('#vid-close-btn').on('click', function() {
/*        $('#vidLinkBtn').css({
            'color' : 'white',
            'outline' : 'none'
        });*/
        $('#vidLinkBtn').css({'color' : 'white',}).focusout();
        //stop video playback when close icon clicked
        let vidContainer = $('#video-player');
        let video = vidContainer.attr('src');
        vidContainer.attr('src','');
        vidContainer.attr('src',video);
    });
});