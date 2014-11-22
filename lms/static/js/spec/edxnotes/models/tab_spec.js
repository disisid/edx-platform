define([
    'js/edxnotes/collections/tabs'
], function(TabsCollection) {
    'use strict';
    describe('EdxNotes TabModel', function() {
        beforeEach(function () {
            this.collection = new TabsCollection([{}, {}, {}]);
        });

        it('when activate current model, all other models are inactivated', function () {
            this.collection.at(1).activate();
            expect(this.collection.at(1).get('is_active')).toBeTruthy();
            expect(this.collection.at(0).get('is_active')).toBeFalsy();
            expect(this.collection.at(2).get('is_active')).toBeFalsy();
        });

        it('can inactivate current model', function () {
            this.collection.at(0).activate();
            expect(this.collection.at(0).get('is_active')).toBeTruthy();
            this.collection.at(0).inactivate();
            expect(this.collection.at(0).get('is_active')).toBeFalsy();
        });

        it('can see correct activity status via isActive', function () {
            this.collection.at(0).activate();
            expect(this.collection.at(0).isActive()).toBeTruthy();
            this.collection.at(0).inactivate();
            expect(this.collection.at(0).isActive()).toBeFalsy();
        });
    });
});
