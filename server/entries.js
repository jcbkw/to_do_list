/* global __dirname */

var api = {
        
    GET: function (request, response, storage) {
        
        storage.read(function (data) {
            
            var id = get('id', null);
            
            // get unique by ID
            if (id) {
                
                if (data.hasOwnProperty(id)) {
                    
                    response.status(200).json(data[id]);
                    
                }
                else {
                    
                    response.status(404).json(id);
                    
                }
                
                return;
                
            }
            
            // get list
            var result = [],
                contains = get('contains', null);
            
            // (optional) only if contains
            if (contains) {
                
                contains = contains.trim().toLowerCase();
                
            }
            
            Object.keys(data).forEach(function (key) {
                
                var todo = data[key];
                
                if (!contains || todo.message.toLowerCase().indexOf(contains) !== -1) {
                    
                    result.push(todo);
                    
                }
                
            });
            
            // (optional) sort
            switch (get('sort', null)) {
                
                case 'asc' : result.sort(function(a, b){return a.lastModified - b.lastModified;}); break;
                case 'desc': result.sort(function(a, b){return b.lastModified - a.lastModified;}); break;
                
            }
            
            response.status(200).json(result);
                        
        });

    },
    
    POST: function (request, response, storage) {
        
        storage.read(function (data) {
            
            var id = (Math.round(Math.random() * 9999) + Date.now()).toString(16);
            
            data[id] =  {
                lastModified: Date.now(),
                message: get('message'),
                id: id
            };
            
            storage.write(function () {
                
                response.status(/*201*/200).json(data[id]);
                
            });
            
        });

    },
    
    PUT: function (request, response, storage) {
        
        storage.read(function (data) {
            
            var id = get('id');

            if (data.hasOwnProperty(id)) {

                data[id].message = get('message');
                
                // (optional) silent = don't update last modified 
                if (!JSON.parse(String(get('silent', false)))) {
                    
                    data[id].lastModified = Date.now();
                    
                }

                storage.write(function () {

                    response.status(200).json(data[id]);

                });

            }
            else {

                response.status(404).json(id);

            }
             
        });

    },
    
    DELETE: function (request, response, storage) {
        
        storage.read(function (data) {
            
            var id = get('id');

            if (data.hasOwnProperty(id)) {

                var cache = data[id];

                delete data[id];

                storage.write(function () {

                    response.status(/*200*/200).json(cache);

                });

            }
            else {

                response.status(404).json(id);

            }
                
        });

    }

};
    
module.exports = function (request, response) {
    
    get = createParameterGetter(request);
    
    call(response, api[request.method],
        request,
        response, 
        storage(require('path').join(__dirname, 'data.json'), response)
    );
    
};

var get;

function call (response, callback) {
    
    try {
        
        callback.apply(this, Array.prototype.slice.call(arguments, 2));
        
    }
    catch (e) {
        
        response.status(e instanceof ClientError ? 406 : 500).json(e.message || e + '');
        
    }
    
}

function createParameterGetter (request) {
    
    return function (name, defaultValue) {
        
        if (request.query && Object.prototype.hasOwnProperty.call(request.query, name)) {
            
            return request.query[name];
            
        }
        else if (request.body && Object.prototype.hasOwnProperty.call(request.body, name)) {
            
            return request.body[name];
            
        }
        else if (arguments.length > 1) {
            
            return defaultValue;
            
        }
        else {
            
            throw new ClientError('The parameter "' + name + '" is required!');
            
        }
        
    };
    
}

function storage (path, response) {
        
    var data,
        file = require('fs');
    
    return {

        read: function (callback) {

            if (data) {

                call(response, callback, data);

            }
            else if (file.existsSync(path)) {

                file.readFile(path, 'utf8', function (error, source) {

                    if (!error) {

                        try {

                            data = JSON.parse(source);

                        }
                        catch (e) {

                            error = e;

                        }

                    }

                    if (error) {

                        return response.status(500).json(error);

                    }

                    call(response, callback, data);

                });

            }
            else {

               call(response, callback, data = {});

            }

            return this;

        },

        write: function (callback) {

            file.writeFile(path, JSON.stringify(data || {}, null, 4), 'utf8', function (error) {

                if (error) {

                    return response.status(500).json(error);

                }

                call(response, callback);

            });

        }

    };

}

function ClientError (message) {
    
    this.name = 'ClientError';
    this.message = message;
    this.stack = (new Error).stack;
    
}