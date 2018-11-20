
let Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {

    attach: function (listener) {
        this._listeners.push(listener);
    },

    notify: function (args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    }

};

/*
var toot = function(sender, args){
    console.log("toot");
    console.log(args);
}

var eventDispatcherFileRead = new Event(this);
eventDispatcherFileRead.attach(toot);
eventDispatcherFileRead.notify("3aw3aw");
*/


