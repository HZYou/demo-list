function route(handle, pathname, response, request) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request)
    } else {
        response.writeHead(400, { 'Content-type': 'text/html' })
        response.write('404 Not Found')
        response.end()
    }
}

exports.route = route;