import Backbone from 'backbone';
import Rental from '../models/customer.js';

var RentalList = Backbone.Collection.extend({
    model: Rental,
    url: 'http://localhost:3000/rentals'
});

export default RentalList;
