import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';

var CustomerView = Backbone.View.extend({
    initialize: function(params){
        this.template = params.template;
        this.$el.val(this.get('id'));
    },

    render: function(){
        var compiledTemplate = this.template({ customer: this.model.toJSON() });
        this.$el.html(compiledTemplate);
        return this;
    }
});

export default CustomerView;
