define([
    'jquery', 'js/common_helpers/template_helpers', 'js/edxnotes/collections/tabs',
    'js/edxnotes/views/tabs_list', 'js/edxnotes/views/subview',
    'js/edxnotes/views/tab_view', 'jasmine-jquery'
], function(
    $, TemplateHelpers, TabsCollection, TabsListView, SubView, TabView
) {
    'use strict';
    describe('EdxNotes TabView', function() {
        var TestSubView = SubView.extend({
                id: 'edx-notes-page-test-subview',
                content: '<p>test view content</p>',
                render: function () {
                    this.$el.html(this.content);
                    return this;
                }
            }),
            TestView = TabView.extend({
                SubViewConstructor: TestSubView,
                tabInfo: {
                    name: 'Test View Tab',
                    is_closable: true
                }
            }), getView;

        getView = function (tabsCollection, options) {
            var view;
            options = _.defaults(options || {}, {
                el: $('.edx-notes-page-wrapper'),
                collection: [],
                tabsCollection: tabsCollection
            });
            view = new TestView(options);

            if (tabsCollection.length) {
                tabsCollection.at(0).activate();
            }

            return view;
        };

        beforeEach(function () {
            this.addMatchers({
                toContainText: function (text) {
                    var trimmedText = $.trim($(this.actual).text());

                    if (text && $.isFunction(text.test)) {
                      return text.test(trimmedText);
                    } else {
                      return trimmedText.indexOf(text) !== -1;
                    }
                },
                toHaveLength: function (number) {
                    return $(this.actual).length === number;
                }
            });
            loadFixtures('js/fixtures/edxnotes/edxnotes.html');
            TemplateHelpers.installTemplates([
                'templates/edxnotes/recent-activity-item', 'templates/edxnotes/tab-item'
            ]);
            this.tabsCollection = new TabsCollection();
            this.tabsList = new TabsListView({collection: this.tabsCollection}).render();
            this.tabsList.$el.appendTo($('.edx-notes-page-wrapper'));
        });

        it('can create a tab and content on initialization', function () {
            var view = getView(this.tabsCollection);
            expect(this.tabsCollection).toHaveLength(1);
            expect(view.$('.tab-item')).toExist();
            expect(view.$('.course-info')).toContainHtml('<p>test view content</p>');
        });

        it('can do not create a tab on initialization', function () {
            var view = getView(this.tabsCollection, {
                createTabOnInitialization: false
            });
            expect(this.tabsCollection).toHaveLength(0);
            expect(view.$('.tab-item')).not.toExist();
            expect(view.$('.course-info')).not.toContainHtml('<p>test view content</p>');
        });

        it('can remove the content if tab becomes inactive', function () {
            var view = getView(this.tabsCollection);
            this.tabsCollection.add({'class_name': 'second-tab'});
            view.$('.tab-item.second-tab').click();
            expect(view.$('.tab-item')).toHaveLength(2);
            expect(view.$('.course-info')).not.toContainHtml('<p>test view content</p>');
            expect(view.contentView).toBeNull();
        });

        it('can remove the content if tab is closed', function () {
            var view = getView(this.tabsCollection);
            view.onClose =  jasmine.createSpy();
            view.$('.tab-item .btn-close').click();
            expect(view.$('.tab-item')).toHaveLength(0);
            expect(view.$('.course-info')).not.toContainHtml('<p>test view content</p>');
            expect(view.contentView).toBeNull();
            expect(view.tabModel).toBeNull();
            expect(view.onClose).toHaveBeenCalled();
        });

        it('can correctly update the content of active tab', function () {
            var view = getView(this.tabsCollection);
            TestSubView.prototype.content = '<p>New content</p>';
            view.renderContent();
            expect(view.$('.course-info')).toContainHtml('<p>New content</p>');
            expect(view.$('.course-info')).not.toContainHtml('<p>test view content</p>');
        });

        it('can show/hide error messages', function () {
            var view = getView(this.tabsCollection);
            view.showErrorMessage('<p>error message is here</p>');
            expect(view.$('.inline-error')).not.toHaveClass('is-hidden');
            expect(view.$('.inline-error')).toContainText('<p>error message is here</p>');

            view.hideErrorMessage();
            expect(view.$('.inline-error')).toHaveClass('is-hidden');
            expect(view.$('.inline-error')).toBeEmpty();
        });
    });
});
