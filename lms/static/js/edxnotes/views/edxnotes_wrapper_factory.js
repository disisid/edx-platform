;(function (define, undefined) {
    'use strict';
    define(['jquery', 'underscore', 'js/edxnotes/views/notes'], function($, _, Notes) {
        return function (elementId, params, visibility) {
            var element = document.getElementById(elementId);

            if (Notes.visibility === null) {
                Notes.visibility = visibility;
            }

            if (Notes.visibility) {
                // Destroy all instances except those found on page being loaded
                destroyAllInstancesExcept(getIds());
                createAnnotator();
            }

            function createAnnotator() {
                console.time(element);
                Notes.factory(element, params);
                console.timeEnd(element);
            }

            function getIds() {
                var ids = [];
                $('.edx-notes-wrapper').each(function(){
                    ids.push($(this).attr('id'));
                });
                return ids;
            }

            function destroyAllInstancesExcept(ids) {
                var len;
                if (Annotator) {
                    len = Annotator._instances.length;
                    while (len--) {
                        if (!_.contains(ids, Annotator._instances[len].element.attr('id'))) {
                            Annotator._instances[len].destroy();
                        }
                    }
                }
            }
        };
    });
}).call(this, define || RequireJS.define);
