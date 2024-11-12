/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      collections/tickets.js
 * generated:     2014/11/27 14:50
 */

/*var imageStore = new FS.Store.GridFS('images');

images = new FS.Collection('images', {
    stores: [imageStore]
});

images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
});*/

images = new FS.Collection("images", {
    stores: [
//        new FS.Store.FileSystem("images", {path: "~/meteor/fratello/server/public/uploads"})
        
        new FS.Store.FileSystem("images", {path: "/srv/uploads/fratello"})
    ]/*,
    filter: {
        allow: {
            contentTypes: ['image/!*'] //allow only images in this FS.Collection
        }
    }*/
});

images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});