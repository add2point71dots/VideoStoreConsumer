import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Customer from '../models/customer.js';
import CustomerList from '../collections/customer_list.js';
import CustomerView from '../views/customer_view.js';

var CustomerListView = Backbone.View.extend({
    initialize: function(params) {
        this.template = params.template;
    },
    render: function() {
        var that = this;
        console.log("CUSTOMER LIST VIEW MODEL ", this.model);
        this.model.each(function(customer) {
            var myCustomerView = new CustomerView({
                model: customer,
                template: that.template,
                tagName: 'option'
            });
            that.$('#customer-menu').append(myCustomerView.render().el);
        });
        return this;
    }
});

export default CustomerListView;
