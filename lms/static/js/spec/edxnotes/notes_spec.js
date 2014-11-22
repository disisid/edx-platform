define(['jquery', 'js/edxnotes/views/notes_factory', 'jasmine-jquery'],
    function($, Notes) {
        'use strict';

        describe('EdxNotes Notes', function() {
            var wrapper;

            beforeEach(function() {
                loadFixtures('js/fixtures/edxnotes/edxnotes_wrapper.html');
                wrapper = $('div#edx-notes-wrapper-123');
            });

            it('Tests that annotator is initialized with options correctly', function() {
                var annotator, internalOptions;

                internalOptions = {
                    user: 'a user',
                    usage_id : 'an usage',
                    course_id: 'a course'
                };

                annotator = Notes.factory(wrapper[0], {
                    endpoint: 'a prefix',
                    user: 'a user',
                    usageId : 'an usage',
                    courseId: 'a course'
                });

                expect(annotator.options.store.prefix).toBe('a prefix');
                expect(annotator.options.store.annotationData).toEqual(internalOptions);
                expect(annotator.options.store.loadFromSearch).toEqual(internalOptions);
            });
        });
    }
);
