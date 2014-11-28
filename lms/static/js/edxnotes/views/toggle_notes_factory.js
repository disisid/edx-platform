;(function (define, undefined) {
    'use strict';
    define(['jquery', 'underscore', 'js/edxnotes/views/notes'], function($, _, Notes) {
        return function (visibility, visibilityUrl) {
            var checkbox = $('a.action-toggle-notes'),
                checkboxIcon = checkbox.children('i');

            checkbox.on('click', function(event) {
                visibility = !visibility;
                Notes.visibility = visibility;
                toggleCheckbox();

                $.ajax({
                    type: 'PUT',
                    url: window.location.origin + visibilityUrl,
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({'visibility': visibility}),
                    success: function(response) {
                        console.log('PUT Success.');
                        toggleAnnotator();
                    },
                    error: function(response) {console.log('PUT Error.');}
                });
                event.preventDefault();
            });

            function toggleCheckbox() {
                checkboxIcon.removeClass('icon-check icon-check-empty');
                checkboxIcon.addClass(visibility ? 'icon-check' : 'icon-check-empty');
            }

            function toggleAnnotator() {
                if (visibility) {
                    createAnnotator();
                } else {
                    destroyAllInstances();
                }
            }

            function createAnnotator() {
                $('.edx-notes-wrapper').each(function(){
                    Notes.factory(this);
                });
            }

            function destroyAllInstances() {
                var len;
                if (Annotator) {
                    len = Annotator._instances.length;
                    while (len--) {
                        Annotator._instances[len].destroy();
                    }
                }
            }
        };
    });
}).call(this, define || RequireJS.define);
